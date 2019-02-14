<template>
	<div v-if="idCatalogo">
		<template v-if="listCatalogo.length > 0">
			<h1 class="page-title">Catálogo - {{listCatalogo[0].industria}}</h1>
			<h5 class="page-title"><small>Última atualização: <span class='fw-semi-bold'>{{idCatalogo}}</span></small></h5>
			<b-row>
				<b-col>
					<Widget>
						<div class="table-resposive table-hover">
							<table class="table">
								<thead>
									<tr>
										<th class="hidden-sm-down">ID</th>
										<th class="hidden-sm-down">Códigos</th>
										<th>Imagem</th>
										<th>Nome</th>
										<th class="hidden-sm-down">Linha</th>
										<th class="hidden-sm-down">Marca</th>
										<th class="hidden-sm-down">Categoria</th>
										<th class="hidden-sm-down">Tags</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="row in listCatalogo" :key="row.id" @click="ir(row.id)">
										<td>{{row.id}}</td>
										<td>
											<p class="mb-0">
												<small>
													<span class="fw-semi-bold">EAN:</span>
													<span class="text-muted">&nbsp; {{row.ean}}</span>
												</small>
											</p>
											<p>
												<small>
													<span class="fw-semi-bold">NCM:</span>
													<span class="text-muted">&nbsp; {{row.ncm}}</span>
												</small>
											</p>
										</td>
										<td>
											<img class="img-rounded imgCat" :src="'https://images.construe.cf/'+row.industria+'/'+row.ean+'.jpg'" alt="" />
										</td>
										<td>
											{{row.descricao}}
											<div v-if="row.label">
												<b-badge :variant="row.label.colorClass">{{row.label.text}}</b-badge>
											</div>
										</td>
										<td class="text-semi-muted">
											{{row.linha}}
										</td>
										<td class="text-semi-muted">
											{{row.marca}}
										</td>
										<td class="text-semi-muted">
											{{row.categoria}}
										</td>
										<td class="width-150">
											<template v-if="row.tags">
												<template v-if="row.tags.length > 0">
													<span v-for="(tags, i) in row.tags" :key="i">
														{{tags}}<br>
													</span>
												</template>
											</template>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<b-pagination v-if="tamanho <= totalProdutos"
							align="right"
							size="md"
							next-text="Proximo"
							prev-text="Anterior"
							:limit="10"
							:hide-goto-end-buttons="true"
							:total-rows="totalProdutos"
							:per-page="tamanho"
							@input="mudaPagina"
						/>
					</Widget>
				</b-col>
			</b-row>
		</template>
		<template v-else>
			Dados não encontrados
		</template>
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
				totalProdutos: 0,
				tamanho: 1,
				paginaAtual: 0,
				ultimaPagina: true,
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
				this.totalProdutos = obj.total_data_size;
				this.tamanho = obj.size;
				this.paginaAtual = obj.number;
				this.ultimaPagina = obj.last_page;
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
