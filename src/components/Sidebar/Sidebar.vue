<template>
	<nav class="sidebar">
		<header class="logo">
			<router-link to="/"><img :src="icon.picture" width="50%" alt="Construe" class="icon-title"></router-link>
		</header>
		<ul class="nav">
			<NavLink
			nome="Dashboard"
			link="/dashboard"
			iconName="fa fa-bar-chart"
			index="dashboard"
			isHeader
			/>
			<NavLink
			:activeItem="activeItem"
			nome="Catálogo"
			link="/catalogo"
			parentLink="/catalogo"
			iconName="fi flaticon-list-1"
			index="catalogo"
			:childrenLinks="catNavItens"
			:deep="0"
			/>
			<NavLink
			:activeItem="activeItem"
			nome="Categorias"
			link="/categorias"
			parentLink="/categorias"
			iconName="fi flaticon-list"
			index="categorias"
			:childrenLinks="navItens"
			:deep="0"
			/>
			<NavLink
			:activeItem="activeItem"
			nome="Importar"
			link="/upload"
			parentLink="/upload"
			iconName="fa fa-upload"
			index="categorias"
			isHeader
			/>
			<NavLink
			:activeItem="activeItem"
			nome="Associações"
			link="/associacoes"
			parentLink="/associacoes"
			iconName="fa fa-archive"
			index="associacoes"
			isHeader
			/>
			<NavLink
			:activeItem="activeItem"
			nome="Lojas"
			link="/lojas"
			parentLink="/lojas"
			iconName="fa fa-industry"
			index="lojas"
			isHeader
			/>
		</ul>
		<div class="bottom">
			<small :title="'Leitura de Sellout: '+percent.sell" v-if="percent.sell">Leitura de Sellout: <span class='fw-semi-bold'>{{percent.sell}}</span></small>
			<br>
			<small :title="'Produtos de Sellout Associados: '+percent.prod" v-if="percent.prod">Prod. de Sellout Assoc: <span class='fw-semi-bold'>{{percent.prod}}</span></small>
			<br>
			<small :title="'Porcentagem de Associação: '+percent.total" v-if="percent.total">% de Associação: <span class='fw-semi-bold'>{{percent.total.toLocaleString("pt-br")}}%</span></small>
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
				catNavItens: [],
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
			fetchCat(obj){
				this.catNavItens = obj.data;
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
			await gfn.fApi({url:"https://api.construe.cf/categorias?tamanho_pagina=20", options: {method: 'GET'}}, this.fetchUrl);
			await gfn.fApi({url:"https://api.construe.cf/industrias?tamanho_pagina=200", options: {method: 'GET'}}, this.fetchCat);
			await gfn.fApi({url:"https://api.construe.cf/dashboard", options: {method: 'GET'}}, this.fetchStats);
		}
	};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
