<template>
	<div class="map-component">
		<div
			class="map"
			id="map"
		></div>
		<ul
			class="map-menu"
			v-if="mapLoading"
		>
			<li
				v-for="item in nodeTypes"
				@click.stop="toggle(item)"
				:key="item.type"
			>
				<div
					:style="item.isShow ? `background:${item.color};box-shadow: ${item.boxShadow};` : 'background: rgba(80, 80, 80, 1);box-shadow: rgba(80, 80, 80, 0.4)'"
					class="map-icon"
				></div>
				<span :style="!item.isShow ? 'color:rgba(80, 80, 80, 1);' : ''">
					{{ item.label }}
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
	props: {
		mapNodes: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			map: null,
			mapLoading: false,
			nodeTypes: [
				{
					type: "fs",
					label: "FS节点",
					color: "rgba(205, 220, 57, 1)",
					boxShadow: "rgba(205, 220, 57, 0.4)",
					iconImage: "fs-point",
					id: "fsPoints",
					isShow: true
				},
				{
					type: "dns",
					label: "DNS节点",
					color: "rgba(255, 100, 100, 1)",
					boxShadow: "rgba(255, 100, 100, 0.4)",
					iconImage: "dns-point",
					id: "dnsPoints",
					isShow: true
				}
			],
			clusterObj: {
				colors: ["rgba(255, 100, 100, 1)", "rgba(205, 220, 57, 1)"],
				markers: {},
				markersOnScreen: {},
				popup: new mapboxgl.Popup({
					closeButton: false,
					closeOnClick: false
				})
			}
		};
	},
	watch: {
		mapNodes(val) {
			if (!this.mapLoading) return;
			this.addLayer3();
		}
	},
	methods: {
		init() {
			this.initMap();
		},
		getPulsingDot({ size = 100, color = "rgba(255, 255, 255, 1)" }) {
			const vm = this;
			return {
				width: size,
				height: size,
				data: new Uint8Array(size * size * 4),

				onAdd: function() {
					var canvas = document.createElement("canvas");
					canvas.width = this.width;
					canvas.height = this.height;
					this.context = canvas.getContext("2d");
				},
				render: function() {
					var duration = 1000;
					var t = (performance.now() % duration) / duration;

					var radius = (size / 2) * 0.4;
					var outerRadius = (size / 2) * 0.6 * t + radius;
					var context = this.context;

					// draw outer circle
					context.clearRect(0, 0, this.width, this.height);
					context.beginPath();
					context.arc(
						this.width / 2,
						this.height / 2,
						outerRadius,
						0,
						Math.PI * 2
					);
					context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
					context.fill();

					// draw inner circle
					context.beginPath();
					context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
					context.fillStyle = color;
					context.strokeStyle = "white";
					context.lineWidth = 2 + 4 * (1 - t);
					context.fill();
					context.stroke();

					// update this image's data with data from the canvas
					this.data = context.getImageData(0, 0, this.width, this.height).data;

					// keep the map repainting
					vm.map.triggerRepaint();

					// return `true` to let the map know that the image was updated
					return true;
				}
			};
		},
		initMap() {
			const vm = this;
			mapboxgl.accessToken =
				"pk.eyJ1IjoibGlueGluY2hlbmciLCJhIjoiY2syMndzZjNrMGowMTNsb3gzcG9jbWx1OCJ9.lhDlDLOTjC9Yx2hBhJspcw";
			this.map = new mapboxgl.Map({
				container: "map",
				style: "mapbox://styles/mapbox/dark-v10",
				center: [30, 20], // starting position
        zoom: 1.2, // starting zoom
        minZoom: 1.2,
        maxBounds: [
          [-180, -85], // Southwest coordinates
          [180, 85]
        ]
        // pitch: 35
      });
			this.map.on("load", () => {
        vm.map.addControl(new mapboxgl.FullscreenControl());
				for (let value of vm.nodeTypes) {
					let dot = this.getPulsingDot({ size: 60, color: value.color });
					vm.map.addImage(value.iconImage, dot, {
						pixelRatio: 2
					});
				}

				vm.addLayer3();
				vm.mapLoading = true;
			});
		},
		getData() {
      let arr = [];
      let showArr = [];
      for(let value of this.nodeTypes) {
        if(value.isShow) {
          showArr.push(value.type);
        }
      }
			for (let value of this.mapNodes) {
        if(showArr.indexOf(value.type) === -1) continue; 
				arr.push({
					type: "Feature",
					properties: value,
					geometry: {
						type: "Point",
						coordinates: [value.lng, value.lat]
					}
				});
			}
			return {
				type: "FeatureCollection",
				features: arr
			};
		},
		addLayer3() {
			const vm = this;
			var layers = [[150, "#f28cb1"], [20, "#f1f075"], [0, "#51bbd6"]];
			let data = vm.getData();
			vm.map.addSource("earthquakes", {
				type: "geojson",
				// Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
				// from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
				data: data /* 指向GEOJSON文件的url路径 */,
				cluster: true /* 如果数据是一系列特征的点的集合，将cluster属性设置为true可以根据半径将点聚集成组 */,
        clusterMaxZoom: 14, // Max zoom to cluster points on
				clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
			});

			// Use the earthquakes source to create five layers:
			// One for unclustered points, three for each cluster category,
			// and one for cluster labels.
			vm.map.addLayer({
				id: "unclustered-points",
				type: "symbol",
				source: "earthquakes",
				filter: [
					"!has",
					"point_count"
				] /* ["!has", key] 表示feature[key] does not exist，filter属性表示只有满足条件的特征才会显示出来*/,
				layout: {
					"icon-image": [
						"case",
						["==", ["get", "type"], "dns"],
						"dns-point",
						"fs-point"
					]
				}
			});

			vm.map.addLayer({
				id: "clusters",
				type: "circle",
				source: "earthquakes",
				filter: ["has", "point_count"],
				paint: {
					// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
					// with three steps to implement three types of circles:
					//   * Blue, 20px circles when point count is less than 100
					//   * Yellow, 30px circles when point count is between 100 and 750
					//   * Pink, 40px circles when point count is greater than or equal to 750
					"circle-color": [
						"step",
						["get", "point_count"],
						"#51bbd6",
						100,
						"#f1f075",
						750,
						"#f28cb1"
					],
					"circle-radius": [
						"step",
						["get", "point_count"],
						20,
						100,
						30,
						750,
						40
					]
				}
			});

			// Add a layer for the clusters' count labels
			vm.map.addLayer({
				id: "cluster-count",
				type: "symbol" /* symbol类型Layer */,
				source: "earthquakes",
				layout: {
					"text-field": "{point_count}" /* 该属性表示文本label种使用到的值 */,
					"text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
					"text-size": 12 /* 该属性表示字体大小 */
				}
      });
      
      // add event
			vm.map.on("click", "clusters", function(e) {
				var features = vm.map.queryRenderedFeatures(e.point, {
					layers: ["clusters"]
				});
				var clusterId = features[0].properties.cluster_id;
				vm.map
					.getSource("earthquakes")
					.getClusterExpansionZoom(clusterId, function(err, zoom) {
						if (err) return;

						vm.map.easeTo({
							center: features[0].geometry.coordinates,
							zoom: zoom
						});
					});
			});
			vm.map.on("mouseenter", "clusters", function() {
				vm.map.getCanvas().style.cursor = "pointer";
			});
			vm.map.on("mouseleave", "clusters", function() {
				vm.map.getCanvas().style.cursor = "";
			});
			vm.map.on("mouseenter", "unclustered-points", vm.mouseenterMarker);
			vm.map.on("mouseleave", "unclustered-points", vm.mouseleaveupdateMarker);
    },
    mouseenterMarker(e) {
			const vm = this;
			this.map.getCanvas().style.cursor = "pointer";
			let coordinates = e.features[0].geometry.coordinates.slice();
			let description = "";
			if (e.features[0].properties.type === "dns") {
				description = `<strong>${e.features[0].properties.Alias}</strong>
        <p>IP: ${e.features[0].properties.IP}</p>
        <p>Region: ${e.features[0].properties.Region}</p>
        <p>Stake: ${e.features[0].properties.Stake} SAVE</p>`;
			} else {
				description = `<strong>${e.features[0].properties.Alias}</strong>
        <p>Address: ${e.features[0].properties.Address}</p>
        <p>Region: ${e.features[0].properties.Region}</p>
        <p>Profit: ${e.features[0].properties.ProfitFormat} SAVE</p>`;
			}
			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			}
			this.clusterObj.popup
				.setLngLat(coordinates)
				.setHTML(description)
				.addTo(vm.map);
		},
		mouseleaveupdateMarker() {
			this.map.getCanvas().style.cursor = "";
			this.clusterObj.popup.remove();
		},
		addLayer() {
			let obj = {};
			for (let value of this.mapNodes) {
				if (!obj[value.type]) obj[value.type] = [];
				obj[value.type].push({
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [value.lng, value.lat]
					}
				});
			}
			for (let nodeType of this.nodeTypes) {
				if (!obj[nodeType.type]) continue;
				this.map.addLayer({
					id: nodeType.id,
					type: "symbol",
					cluster: true,
					source: {
						type: "geojson",
						data: {
							type: "FeatureCollection",
							features: obj[nodeType.type]
						}
					},
					layout: {
						"icon-image": nodeType.iconImage
					}
				});
			}
		},
		toggle(item) {
			// let visibility = this.map.getLayoutProperty(item.id, "visibility");
			item.isShow = !item.isShow;
      let data = this.getData();
      this.map.getSource('earthquakes').setData(data);
		},
		addLayer2() {
			const vm = this;
			let data = this.getData();

			// filters for classifying earthquakes into five categories based on magnitude
			var mag1 = ["==", ["get", "type"], "dns"];
			var mag2 = ["==", ["get", "type"], "fs"];

			// colors to use for the categories
			vm.map.addSource("earthquakes", {
				type: "geojson",
				data: data,
				cluster: true,
				clusterRadius: 80,
				clusterProperties: {
					// keep separate counts for each magnitude category in a cluster
					mag1: ["+", ["case", mag1, 1, 0]],
					mag2: ["+", ["case", mag2, 1, 0]]
				}
			});
			// circle and symbol layers for rendering individual earthquakes (unclustered points)
			vm.map.addLayer({
				id: "earthquake_circle",
				type: "symbol",
				cluster: true,
				source: "earthquakes",
				filter: ["!=", "cluster", true],
				layout: {
					"icon-image": [
						"case",
						["==", ["get", "type"], "dns"],
						"dns-point",
						"fs-point"
					]
				}
			});
			vm.map.addLayer({
				id: "earthquake_label",
				type: "symbol",
				source: "earthquakes",
				filter: ["!=", "cluster", true],
				layout: {
					"text-field": [
						"number-format",
						["get", "mag"],
						{ "min-fraction-digits": 1, "max-fraction-digits": 1 }
					],
					"text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
					"text-size": 12
				},
				paint: {
					"text-color": ["case", ["<", ["get", "mag"], 3], "black", "white"]
				}
			});

			// after the GeoJSON data is loaded, update markers on the screen and do so on every map move/moveend
			vm.map.on("data", function(e) {
				if (e.sourceId !== "earthquakes" || !e.isSourceLoaded) return;
				vm.map.on("move", vm.updateMarkers);
				vm.map.on("moveend", vm.updateMarkers);
				vm.map.on("mouseenter", "earthquake_circle", vm.mouseenterMarker);
				vm.map.on("mouseleave", "earthquake_circle", vm.mouseleaveupdateMarker);
				vm.updateMarkers();
			});
		},
		updateMarkers() {
			const vm = this;
			var newMarkers = {};
			var features = vm.map.querySourceFeatures("earthquakes");
			// for every cluster on the screen, create an HTML marker for it (if we didn't yet),
			// and add it to the map if it's not there already
			for (var i = 0; i < features.length; i++) {
				var coords = features[i].geometry.coordinates;
				var props = features[i].properties;
				if (!props.cluster) continue;
				var id = props.cluster_id;

				var marker = vm.clusterObj.markers[id];
				if (!marker) {
					var el = vm.createDonutChart(props);
					marker = vm.clusterObj.markers[id] = new mapboxgl.Marker({
						element: el
					}).setLngLat(coords);
				}
				newMarkers[id] = marker;

				if (!vm.clusterObj.markersOnScreen[id]) marker.addTo(vm.map);
			}
			// for every marker we've added previously, remove those that are no longer visible
			for (id in vm.clusterObj.markersOnScreen) {
				if (!newMarkers[id]) vm.clusterObj.markersOnScreen[id].remove();
			}
			vm.clusterObj.markersOnScreen = newMarkers;
		},
		createDonutChart(props) {
			const vm = this;
			var offsets = [];
			var counts = [props.mag1, props.mag2];
			var total = 0;
			for (var i = 0; i < counts.length; i++) {
				offsets.push(total);
				total += counts[i];
			}
			var fontSize =
				total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
			var r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
			var r0 = Math.round(r * 0.8);
			var w = r * 2;
			let html = `<svg width="${w}" height="${w}" viewbox="0 0 ${w} ${w}" text-anchor="middle" style="font: ${fontSize}px sans-serif;cursor: pointer;">`;
			for (i = 0; i < counts.length; i++) {
				html += vm.donutSegment(
					offsets[i] / total,
					(offsets[i] + counts[i]) / total,
					r,
					r0,
					vm.clusterObj.colors[i]
				);
			}
			html += `<circle cx="${r}" cy="${r}" r="${r0}" fill="rgba(0,0,0,0)"/>
          <text fill="#ffffff" dominant-baseline="central" transform="translate(${r},${r})">
            ${total.toLocaleString()}
          </text>
        </svg>`;
			var el = document.createElement("div");
			el.innerHTML = html;
			return el.firstChild;
		},
		donutSegment(start, end, r, r0, color) {
			const vm = this;
			if (end - start === 1) end -= 0.00001;
			var a0 = 2 * Math.PI * (start - 0.25);
			var a1 = 2 * Math.PI * (end - 0.25);
			var x0 = Math.cos(a0),
				y0 = Math.sin(a0);
			var x1 = Math.cos(a1),
				y1 = Math.sin(a1);
			var largeArc = end - start > 0.5 ? 1 : 0;
			return `<path d="M ${r + r0 * x0} ${r + r0 * y0} L ${r + r * x0} ${r +
				r * y0} A ${r} ${r} 0 ${largeArc} 1
      ${r + r * x1} ${r + r * y1} L ${r + r0 * x1} ${r +
				r0 * y1} A ${r0} ${r0} 0 ${largeArc} 0 ${r + r0 * x0} ${r +
				r0 * y0}" fill="${color}" />`;
		}
	},
	mounted() {
		this.init();
	}
};
</script>

<style lang="scss" scoped>
.map-component {
	width: 100%;
	height: 100%;
	position: relative;

	.map {
		width: 100%;
		height: 100%;
	}

	.map-menu {
		height: auto;
		width: auto;
		position: absolute;
		bottom: 0;
		color: white;
		font-size: 14px;

		li {
			position: relative;
			text-indent: 24px;
			line-height: 28px;
			cursor: pointer;
			user-select: none;
			margin-left: 5px;

			.map-icon {
				position: absolute;
				left: 5px;
				top: 8px;
				width: 12px;
				height: 12px;
				border-radius: 6px;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 0px 4px 0px rgba(255, 255, 255, 0.4);
			}

			&:active {
				opacity: 0.7;
			}
		}
	}
}
</style>
<style lang="scss">
.mapboxgl-popup {
	max-width: 400px!important;
	font: 14px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
.mapboxgl-ctrl-logo,.mapboxgl-ctrl-attrib-inner {
  display: none !important;
}
</style>