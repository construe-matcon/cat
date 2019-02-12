<template>
	<div class="tables-basic">
		<h2 class="page-title">Catálogo - <span class="fw-semi-bold">Produtos</span></h2>
		<template v-if="nomeCategoria.length > 0">
			<h5 class="page-title">Categoria: <span class="fw-semi-bold">{{nomeCategoria}}</span></h5>
		</template>
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
								<tr v-for="row in tableStyles" :key="row.id" @click="ir(row.id)">
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
	</div>
</template>

<script>
	// import $ from 'jquery';
	import Vue from 'vue';
	import $ from 'jquery';
	import Widget from '@/components/Widget/Widget';
	import gfn from '@/core/globalFunctions';
	import 'imports-loader?jQuery=jquery,this=>window!jquery-sparkline'; // eslint-disable-line

	export default {
		name: 'Catalogo',
		components: { Widget },
		data() {
			return {
				tableStyles: [],
				totalProdutos: 0,
				tamanho: 1,
				paginaAtual: 0,
				ultimaPagina: true,
				categoriaId: (this.$route.params.id ? this.$route.params.id : ''),
				nomeCategoria: '',
				industriaId: '',
			};
		},
		methods: {
			parseDate(date) {
				const dateSet = date.toDateString().split(' ');
				return `${date.toLocaleString('en-us', { month: 'short' })} ${dateSet[2]}, ${dateSet[3]}`;
			},
			checkAll(ev, checkbox) {
				const checkboxArr = (new Array(this[checkbox].length)).fill(ev.target.checked);
				Vue.set(this, checkbox, checkboxArr);
			},
			changeCheck(ev, checkbox, id) {
				this[checkbox][id] = ev.target.checked;
				if (!ev.target.checked) {
					this[checkbox][0] = false;
				}
			},
			getRandomData() {
				const result = [];

				for (let i = 0; i <= 8; i += 1) {
					result.push(Math.floor(Math.random() * 20) + 1);
				}


				return result;
			},
			fetchUrl(obj){
				this.nomeCategoria = ($('.router-link-exact-active').hasClass('level0') ? '' : $('.router-link-exact-active').text().trim())
				this.tableStyles = obj.data;
				this.totalProdutos = obj.total_data_size;
				this.tamanho = obj.size;
				this.paginaAtual = obj.number;
				this.ultimaPagina = obj.last_page;
			},
			ir(id){
				this.$router.push({
					path: "/produto/"+id,
					params: {
						row: id
					}
				});
			},
			mudaPagina(page) {
				gfn.fApi({url:"https://api.construe.cf/produtos?tamanho_pagina=20&pagina="+(page - 1), options: {method: 'GET'}}, this.fetchUrl);
			},
			async loadCategorias(paramId) {
				let urlList = `
					https://api.construe.cf/produtos?tamanho_pagina=20
					${(paramId ? (paramId.length > 0) ? (!this.categoriaId ? '' : `&id_categoria=${this.categoriaId}`) : `` : ``)}
				`

				await gfn.fApi({url:urlList.replace(/\n|\r|\t/g, ""), options: {method: 'GET'}}, this.fetchUrl);
			}
		},
		async mounted() {
			this.loadCategorias(this.categoriaId)
		},
		watch: {
			'$route' () {
				this.categoriaId = (this.$route.params.id ? this.$route.params.id : '');
				this.loadCategorias(this.categoriaId)
			}
		}
	};
</script>

<style src="./Basic.scss" lang="scss" scoped />





