<template>
  <div class="map" id="map">
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null
    }
  },
  methods: {
    init() {
      this.map = new BMap.Map("map",{
        minZoom : 1,
        maxZoom : 18
      }); // new map  
      let point = new BMap.Point(116.404, 39.915);  // create point  
      this.map.centerAndZoom(point, -1); // center zomm
      this.map.enableScrollWheelZoom(true);
      this.map.setMapStyleV2({     
        styleId: 'f6e1eede072274dcafee88404f906476'
      });
    }
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
  .map {
    width: 100%;
    height: 100%;
  }
</style>