<template>
	<div id="app">
		<div></div>
		<header-component></header-component>
		<router-view />
		<footer-component></footer-component>
	</div>
</template>

<script>
import headerComponent from "./../src/components/HeaderComponent";
import footerComponent from "./../src/components/footerComponent";
export default {
	name: "App",
	components: {
		headerComponent,
		footerComponent
	},
	mounted() {
		// let loader = this.$loading.show({
		// 	// Optional parameters
		// 	container: this.$refs.aaa,
		// 	opacity: 0.5,
		// 	backgroundColor: 'rgba(0,0,0,0)',
		// 	loader: 'dots',
		// 	color: '#ffffff'
		// });
		// loader.hide()
	}
};
</script>

<style lang="scss">
@import "./assets/css/style.scss";
#app {
	width: 100%;
	height: auto;
	min-height: 100%;
	background: rgba(32, 32, 32, 1);
}
</style>
