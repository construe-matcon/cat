<template>
	<div v-if="loja">
		<h1 class="page-title" v-if="dashLineData.loja">Loja: <span class="fw-semi-bold">{{dashLineData.loja.razao_social}}</span></h1>
		<span class="small" v-if="dashLineData.loja">cnpj: <span class="fw-semi-bold">{{fCNPJ(dashLineData.loja.cnpj)}}</span></span>
		<hr>
		<b-row>
			<b-col lg="12">
				<Widget
					title="<h4>Últimos 30 dias - <span class='fw-semi-bold'>Sell Out</span></h4>"
					bodyClass="widget-table-overflow"
					customHeader>
					<div class="table-responsive">
						<canvas id="linechart1" height="80"></canvas>
					</div>
				</Widget>
			</b-col>
		</b-row>
	</div>
	<!-- Lista de lojas -->
	<div v-else>
		<h1 class="page-title">Lojas</h1>
		<b-row class="filterLojas">
			<b-col lg="4">
				<b-form @submit.prevent="filter">
					<b-form-group
					id="form"
					label-for="buscaInd"
					description="Filtre em branco para listar Todas"
					>
						<b-form-input
						id="buscaInd"
						type="text"
						v-model="razaoSocial"
						placeholder="Digite aqui o nome da Loja"
						/>
					</b-form-group>
				</b-form>
			</b-col>
			<b-col lg="6">
				<b-button @click="filter" variant="primary">Filtrar</b-button>
			</b-col>
		</b-row>
		<b-modal
			ref="modalLoading"
			id="modal-center-info"
			:title="'Listando lojas'"
			:header-bg-variant="'success'"
			:header-text-variant="'light'"
			centered
			hide-footer
			>
			<h5>Carregando</h5>
		</b-modal>
		<template v-if="storeInfos.length > 0">
			<b-row>
				<b-col>
					<Widget>
						<div class="table-resposive table-hover">
							<table class="table">
								<thead>
									<tr>
										<th class="hidden-sm-down">Razão Social</th>
										<th class="hidden-sm-down">Prod Assc.</th>
										<th class="hidden-sm-down">Prod Sem Assc.<br></th>
										<th class="hidden-sm-down">Total</th>
									</tr>
								</thead>
								<tbody>
									<template v-for="(row, index) in storeInfos">
										<tr :key="'listas'+index">
											<!-- @click="goToDash(row)" -->
											<td class="cpointer"><router-link :to="'/loja/'+row.id"><h5>{{row.razao_social}}</h5><span class="small">Ultima atualização: {{(row.data_leitura != null ? fDate(row.data_leitura) : 'Sem dados')}}</span></router-link></td>
											<td><h5>{{(row.qtd_match_catalogo != null ? row.qtd_match_catalogo : '-')}}</h5></td>
											<td class="cpointer" @click="goToAssoc(row.cnpj)"><h5>{{(row.qtd_total_produtos ? row.qtd_total_produtos - row.qtd_match_catalogo : '-')}}</h5></td>
											<td><h5>{{(row.qtd_total_produtos != null ? row.qtd_total_produtos : '-')}}</h5></td>
										</tr>
										<!-- <tr class="ultima-atualizacao text-right">
											<td class="small" colspan="4">Ultima atualização: {{(row.data_leitura != null ? fDate(row.data_leitura) : 'Sem dados')}}</td>
										</tr> -->
									</template>
								</tbody>
							</table>
							<b-pagination v-if="lojas <= totalLojas"
							align="right"
							size="md"
							next-text="Proximo"
							prev-text="Anterior"
							v-model="currentPage"
							:limit="10"
							:hide-goto-end-buttons="true"
							:total-rows="totalLojas"
							:per-page="lojas"
							@input="pages"
							/>
						</div>
					</Widget>
				</b-col>
			</b-row>
		</template>
		<template v-else>
			<b-row>
				<b-col>
					<Widget>
						<div class="table-resposive table-hover">
							{{msgErro}}
						</div>
					</Widget>
				</b-col>
			</b-row>
		</template>
	</div>
</template>

<script>
	/* eslint-disable */
	import $ from 'jquery';
	import 'imports-loader?jQuery=jquery,this=>window!flot';
	import 'imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie';
	/* eslint-enable */
	import Widget from '@/components/Widget/Widget';
	/* ChartJS */
	import Chart from 'chart.js';

	import gfn from '@/core/globalFunctions';


	export default {
		name: 'Lojas',
		components: { Widget },
		data() {
			return {
				lojas: 20,
				totalLojas: 0,
				currentPage: 1,
				storeInfos: '',
				razaoSocial: '',
				msgErro: 'Nenhuma loja encontrada',
				loja: this.$route.params.id,
				lojaInd: '',
				dashLineData: [],
				dashBarData: [],
			};
		},
		methods: {
			// startCharts(type, idEl, label, datax,displayLegend=true) {
			startCharts(type, idEl) {
				var dates 		= this.dashLineData.datas
				, 	total 		= this.dashLineData.valores_totais
				, 	totalCat 	= this.dashLineData.valores_totais_produtos_catalogo

				var el = document.getElementById(idEl).getContext('2d')


				new Chart (el, {
					type: type,
					data: {
						labels: dates,
						datasets: [{
							label: 'Total de vendas',
							backgroundColor: '#A02B13',
							borderColor: '#A02B13',
							fill: false,
							data: total,
						}, {
							label: 'Total de vendas com associação',
							backgroundColor: '#FBC14B',
							borderColor: '#FBC14B',
							fill: false,
							data: totalCat,
						}]
					},
					options: {
						responsive: true,
						scales: {
							xAxes: [{
								display: true,
							}],
							yAxes: [{
							}]
						}
					}
				});

				// var graph;

				// if (type == 'line') {
				// 	graph = {
				// 		type: type,
				// 		data:datax,
				// 		options: {
				// 			responsive: true,
				// 			scales: {
				// 				xAxes: [{
				// 					display: true,
				// 				}],
				// 				yAxes: [{
				// 				}]
				// 			}
				// 		}
				// 	}
				// }

				// return new Chart(el,graph)

			},
			async pages(){
				await gfn.fApi({url:'https://api.construe.cf/dashboard/lojas?pagina='+(this.currentPage - 1)+'&tamanho_pagina='+this.lojas+'&razao_social='+this.razaoSocial, options: {method: 'GET'}}, this.listStores);
			},
			async filter(){
				this.currentPage = 1
				this.msgErro = 'Carregando...'
				this.storeInfos = ''
				await gfn.fApi({url:'https://api.construe.cf/dashboard/lojas?pagina='+(this.currentPage - 1)+'&tamanho_pagina='+this.lojas+'&razao_social='+this.razaoSocial, options: {method: 'GET'}}, this.listStores);
			},
			async goToDash(){
				this.dashLineData = await gfn.fApi({url:'https://api.construe.cf/dashboard/lojas/'+this.loja+'/grafico-faturamento-mensal', options: {method: 'GET'}});
				if (this.dashLineData) {
					this.startCharts('line', 'linechart1','','', true);
				}
				this.dashBarData = await gfn.fApi({url:'https://api.construe.cf/dashboard/lojas/'+this.loja+'/grafico-faturamento-produto-construe-mensal', options: {method: 'GET'}});
				if (this.dashBarData) {
					// this.startCharts('bar', 'barchart1','','', true);
				}

				console.log('-- Dados Gráficos --')
				console.log('Faturamento ==> ' , this.dashLineData)
				console.log('--------------------------------')
				console.log('Categorias ==> ' , this.dashBarData)
				console.log('-- Dados Gráficos --')

			},
			loadDash(obj) {
				this.dashLineData = obj
			},
			goToAssoc(cnpj) {
				this.$router.push({
					path: "/associacoes/",
					query: {
						cnpj: cnpj
					}
				});
			},
			listStores(obj){
				this.msgErro = 'Nenhuma loja encontrada'
				this.storeInfos = obj.data
				this.totalLojas = obj.total_data_size
			},
			fDate(date) {
				return gfn.formatDate(date)
			},
			fCNPJ(cnpj) {
				return gfn.formatCNPJ(cnpj)
			},
		},
		async mounted() {
			if (this.$route.params.id != undefined) {
				this.loja = this.$route.params.id
				this.goToDash()
			} else {
				await gfn.fApi({url:'https://api.construe.cf/dashboard/lojas?pagina='+(this.currentPage - 1)+'&tamanho_pagina='+this.lojas+'&razao_social='+this.razaoSocial, options: {method: 'GET'}}, this.listStores);
			}
		},
		created() {
		},
		watch: {
			'$route' () {
				this.loja = this.$route.params.id
				if(this.$route.params.id != undefined) {
					this.goToDash()
				} else {
					this.dashLineData = ''
					gfn.fApi({url:'https://api.construe.cf/dashboard/lojas?pagina='+(this.currentPage - 1)+'&tamanho_pagina='+this.lojas+'&razao_social='+this.razaoSocial, options: {method: 'GET'}}, this.listStores);
				}
			}
		}
	};
</script>

<style src="./Lojas.scss" lang="scss" scoped />
