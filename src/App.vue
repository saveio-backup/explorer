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
	font-family: "SF Pro SC", "HanHei SC", "SF Pro Text", "Myriad Set Pro",
		"SF Pro Icons", "PingFang SC", "Helvetica Neue", "Helvetica", "Arial",
		sans-serif;
}
</style>
