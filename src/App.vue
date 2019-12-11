<template>
	<div id="app">
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
}
</style>
