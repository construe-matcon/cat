<template>
	<div v-if="idCatalogo">
		<template v-if="listProdConstrue.length > 0">
			<h1 class="page-title">Produtos Construe - <span class="fw-semi-bold">{{listProdConstrue[0].industria}}</span></h1>
			<!-- <h5 class="page-title"><small>Última atualização: <span class='fw-semi-bold'>{{date}}</span></small></h5> -->
			<b-row>
				<b-col>
					<Widget>
						<div class="table-resposive table-hover">
							<table class="table">
								<thead>
									<tr>
										<th class="hidden-sm-down">Nome</th>
										<th class="hidden-sm-down">Quantidade de SKUs</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="row in listProdConstrue" :key="row.id" @click="goToProdConstrue(row.id)">
										<td><h5>{{row.nome}}</h5></td>
										<td><h5>{{row.qtd_produtos}}</h5></td>
									</tr>
								</tbody>
							</table>
						</div>
					</Widget>
				</b-col>
			</b-row>
		</template>
		<template v-else-if="listCatalogo.length > 0">
			<h1 class="page-title">Catálogo - <span class="fw-semi-bold">{{listCatalogo[0].industria}}</span></h1>
			<h5 class="page-title"><small>Produto Construe: <span class='fw-semi-bold'>{{listCatalogo[0].categoria}}</span></small></h5>
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
									<tr v-for="row in listCatalogo" :key="row.id" @click="goToProduct(row.id)">
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
							v-model="currentPage"
							:limit="10"
							:hide-goto-end-buttons="true"
							:total-rows="totalProdutos"
							:per-page="tamanho"
							@input="loadCatalogo"
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
			<b-col col xs="12" lg="2" align-v="center" v-for="cat in listCatalogos" :key="`cat-${cat.id}`" class="holder-catalogo d-flex align-items-center" @click="goToCat(cat.id)">
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
				currentPage: 1,
				totalProdutos: 0,
				tamanho: 1,
				paginaAtual: 0,
				ultimaPagina: true,
				listCatalogo: false,
				listCatalogos: false,
				idCatalogo: this.$route.params.id,
				idProdCons: this.$route.params.idc,
				listImgCatalogo: {},
				listProdConstrue: false,
				listCatProd: false,
				idCategoria: 277,
			};
		},
		methods: {
			async loadCat(obj) {
				this.listProdConstrue = ""
				this.listCatalogo = (obj.data.length > 0 ? obj.data : false)
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
			openProdConstrue(obj){
				this.listCatProd = (obj.data.length > 0 ? obj.data : false)

			},
			async loadCatalogo() {
				await gfn.fApi({url:"https://api.construe.cf/produtos?id_industria="+this.idCatalogo+"&id_categoria="+this.idProdCons+"&tamanho_pagina=20&pagina="+(this.currentPage - 1), options: {method: 'GET'}}, this.loadCat);
			},
			async loadCatalogos() {
				let obj = await gfn.fApi({url:"https://api.construe.cf/industrias?tamanho_pagina=200", options: {method: 'GET'}}, this.loadFullCat)
			},
			async loadFullCat(obj) {
				this.listCatalogos = obj.data;
				this.listCatalogos.forEach(cat => {
					try {
						this.listImgCatalogo[cat.id] = require(`../../assets/img/logos/logo-${cat.nome.toLowerCase()}.png`)
					} catch(error) {
						this.listImgCatalogo[cat.id] = require(`../../assets/img/logos/logo-default.png`)
					}
				})
			},
			async loadProdConstrue() {
				let obj = await gfn.fApi({url:"https://api.construe.cf/categorias/industria/"+this.idCatalogo+"?tamanho_pagina=200", options: {method: 'GET'}}, this.fullProd);
			},
			async fullProd(obj) {
				this.listProdConstrue = (obj.data.length > 0 ? obj.data : false)
			},
			async loadProdByCategory(id,idc) {
				this.currentPage = 1;
				await gfn.fApi({url:'https://api.construe.cf/produtos?tamanho_pagina=20&id_categoria='+idc+'&id_industria='+id, options: {method: 'GET'}}, this.loadCat);
			},
			goToProdConstrue(idc) {
				this.$router.push({
					path: "/catalogo/"+this.idCatalogo+"/"+idc,
					params: {
						row: idc
					}
				});
			},
			goToProduct(id){
				this.$router.push({
					path: "/produto/"+id,
					params: {
						row: id
					}
				});
			},
		},
		async mounted() {
			this.idCatalogo = (this.$route.params.id ? this.$route.params.id : '');
			this.idProdCons = (this.$route.params.idc ? this.$route.params.idc : '');

			if (this.idProdCons.length > 0) {
				this.loadProdByCategory(this.idCatalogo,this.idProdCons)
			} else if (this.idCatalogo.length > 0) {
				this.loadProdConstrue(this.idCatalogo)
			} else {
				this.listProdConstrue = ""
				this.listCatalogo = ""
				this.loadCatalogos()
			}
		},
		created() {
		},
		watch: {
			'$route' () {
				this.idCatalogo = (this.$route.params.id ? this.$route.params.id : '');
				this.idProdCons = (this.$route.params.idc ? this.$route.params.idc : '');

				if (this.idProdCons.length > 0) {
					this.loadProdByCategory(this.idCatalogo,this.idProdCons)
				} else if (this.idCatalogo.length > 0) {
					this.loadProdConstrue(this.idCatalogo)
				} else {
					this.listProdConstrue = ""
					this.listCatalogo = ""
					this.loadCatalogos()
				}
			}
		}
	};
</script>

<style src="./Catalogo.scss" lang="scss" scoped />
