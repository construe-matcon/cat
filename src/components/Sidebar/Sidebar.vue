<template>
	<nav
	:class="{sidebar: true, sidebarStatic, sidebarOpened}"
	@mouseenter="sidebarMouseEnter"
	@mouseleave="sidebarMouseLeave"
	>
	<header class="logo">
		<router-link to="/"><img :src="icon.picture" width="50%" alt="Construe" class="icon-title"></router-link>
	</header>
	<ul class="nav">
		<NavLink
		nome="Catálogo"
		link="/"
		iconName="flaticon-equal-1"
		index="catalogo"
		isHeader
		/>
		<NavLink
		:activeItem="activeItem"
		nome="Categorias"
		link="/Categorias"
		iconName="flaticon-list"
		index="catalogo"
		:childrenLinks="navItens"
		/>
	</ul>
</nav>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import isScreen from '@/core/screenHelper';
	import NavLink from './NavLink/NavLink';
	import gfn from '@/core/globalFunctions';

	export default {
		name: 'Sidebar',
		components: { NavLink },
		data() {
			return {
				alerts: [],
				icon: {
					picture: require('../../assets/img/construe.png'), // eslint-disable-line global-require
				},
				navItens: [],
			};
		},
		methods: {
			...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
			setActiveByRoute() {
				const paths = this.$route.fullPath.split('/');
				paths.pop();
				this.changeSidebarActive(paths.join('/'));
			},
			sidebarMouseEnter() {
				if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
					this.switchSidebar(false);
					this.setActiveByRoute();
				}
			},
			sidebarMouseLeave() {
				if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
					this.switchSidebar(true);
					this.changeSidebarActive(null);
				}
			},
			fetchUrl(obj){
				this.navItens = obj.data;
			},
		},
		created() {
		},
		computed: {
			...mapState('layout', {
				sidebarStatic: state => state.sidebarStatic,
				sidebarOpened: state => !state.sidebarClose,
				activeItem: state => state.sidebarActiveElement,
			}),
		},
		async mounted() {
			await gfn.fApi({url:"https://api.construe.cf/categorias?pagina=0&tamanho_pagina=20", options: {method: 'GET'}}, this.fetchUrl);
		}
	};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
