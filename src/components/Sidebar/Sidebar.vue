<template>
	<nav class="sidebar">
		<header class="logo">
			<router-link to="/"><img :src="icon.picture" width="50%" alt="Construe" class="icon-title"></router-link>
		</header>
		<ul class="nav">
			<NavLink
			nome="Catálogo"
			link="/catalogo"
			iconName="flaticon-list-1"
			index="catalogo"
			isHeader
			/>
			<NavLink
			:activeItem="activeItem"
			nome="Categorias"
			link="/categorias"
			parentLink="/categorias"
			iconName="flaticon-list"
			index="categorias"
			:childrenLinks="navItens"
			:deep="0"
			/>
		</ul>
		<div class="bottom">
			<small :title="'Leitura de Sellout: '+percent.sell">Leitura de Sellout: <span class='fw-semi-bold'>{{percent.sell}}</span></small>
			<br>
			<small :title="'Produtos de Sellout Associados: '+percent.prod">Prod. de Sellout Assoc: <span class='fw-semi-bold'>{{percent.prod}}</span></small>
			<br>
			<small :title="'Porcentagem de Associação: '+percent.total">% de Associação: <span class='fw-semi-bold'>{{percent.total.toLocaleString("pt-br")}}%</span></small>
			<br>
			<b-progress
				:value="(percent.total ? percent.total : 0)"
				:variant="(percent.total > 75 ? 'success' : (percent.total >= 50 && percent.total <= 75 ? 'warning' : 'danger'))"
				class="w-75"
				:title="percent.total+'%'"
			/>
		</div>
	</nav>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
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
				percent: {},
			};
		},
		methods: {
			...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
			setActiveByRoute() {
				const paths = this.$route.fullPath.split('/');
				paths.pop();
				this.changeSidebarActive(paths.join('/'));
			},
			fetchUrl(obj){
				this.navItens = obj.data;
			},
			fetchStats(obj){
				var prod  = obj.qtd_produto_sellout_associado_catalogo.toLocaleString("pt-br")
				,	sell  = obj.qtd_total_produto_sellout.toLocaleString("pt-br")
				, 	total = Math.round(prod/sell*10000)/100

				this.percent = {
					sell,
					prod,
					total
				}

				console.log(obj)
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
			await gfn.fApi({url:"https://api.construe.cf/dashboard", options: {method: 'GET'}}, this.fetchStats);
		}
	};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
