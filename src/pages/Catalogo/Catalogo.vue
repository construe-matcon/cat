<template>
	<div v-if="idCatalogo">
		<h1 class="page-title">Catálogo - {{listCatalogo[0].industria}}</h1>
		<h5 class="page-title"><small>Última atualização: <span class='fw-semi-bold'>{{idCatalogo}}</span></small></h5>

		<b-row>
			<b-col class="min">
				<div class="pb-xlg h-100">
					<Widget class="h-100 mb-0" title="Produtos Sem Categoria">
						<b-row>
							<canvas id="piechart0" height="350"></canvas>
						</b-row>
					</Widget>
				</div>
			</b-col>
			<b-col class="min">
				<div class="pb-xlg h-100">
					<Widget class="h-100 mb-0" title="Produtos Sem Tags">
						<b-row>
							<canvas id="piechart1" height="350"></canvas>
						</b-row>
					</Widget>
				</div>
			</b-col>
			<b-col class="min">
				<div class="pb-xlg h-100">
					<Widget class="h-100 mb-0" title="Produtos Sem EAN">
						<b-row>
							<canvas id="piechart2" height="350"></canvas>
						</b-row>
					</Widget>
				</div>
			</b-col>
		</b-row>
	</div>
	<div v-else>
		<h1 class="page-title">Catálogos</h1>
		<b-row>
			<b-col col xs="12" lg="2" align-v="center" v-for="cat in listCatalogo" :key="`cat-${cat.id}`" class="holder-catalogo d-flex align-items-center" @click="goToCat(cat.id)">
				<div>
					<img :src="listImgCatalogo[cat.id]" width="50%" :alt="cat.nome.toLowerCase()">
					<br>
					<span>{{cat.nome}}</span>
				</div>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	/* eslint-disable */
	import $ from 'jquery';
	import 'imports-loader?jQuery=jquery,this=>window!flot';
	import 'imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie';
	/* eslint-enable */
	import Widget from '@/components/Widget/Widget';

	import gfn from '@/core/globalFunctions';


	export default {
		name: 'Dashboard',
		components: { Widget },
		data() {
			return {
				listCatalogo: [],
				idCatalogo: this.$route.params.id,
				listImgCatalogo: {},
			};
		},
		methods: {
			fetchUrl(obj){
				this.listCatalogo = obj.data
				obj.data.forEach(cat => {
					try {
						this.listImgCatalogo[cat.id] = require(`../../assets/img/logos/logo-${cat.nome.toLowerCase()}.png`)
					} catch(error) {
						this.listImgCatalogo[cat.id] = require(`../../assets/img/logos/logo-default.png`)
					}
				})
			},
			loadCat(obj) {
				this.listCatalogo = obj.data
				console.log(obj.data)
			},
			goToCat(id) {
				this.$router.push({
					path: "/catalogo/"+id,
					params: {
						row: id
					}
				});
			},
			async loadCatalogo(id) {
				await gfn.fApi({url:"https://api.construe.cf/produtos?id_industria="+id, options: {method: 'GET'}}, this.loadCat);
			},
			async loadCatalogos() {
				await gfn.fApi({url:"https://api.construe.cf/industrias?tamanho_pagina=200", options: {method: 'GET'}}, this.fetchUrl);
			}
		},
		async mounted() {
			this.idCatalogo = (this.$route.params.id ? this.$route.params.id : '');
			if (this.idCatalogo.length > 0) {
				this.loadCatalogo(this.idCatalogo)
			} else {
				this.loadCatalogos()
			}
		},
		created() {
		},
		watch: {
			'$route' () {
				this.idCatalogo = (this.$route.params.id ? this.$route.params.id : '');
				if (this.idCatalogo.length > 0) {
					this.loadCatalogo(this.idCatalogo)
				} else {
					this.loadCatalogos()
				}
			}
		}
	};
</script>

<style src="./Catalogo.scss" lang="scss" scoped />
