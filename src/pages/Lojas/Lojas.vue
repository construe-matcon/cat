<template>
	<div v-if="loja">
		<h1 class="page-title" v-if="dashData.loja">Loja: <span class="fw-semi-bold">{{dashData.loja.razao_social}}</span></h1>
		<span class="small" v-if="dashData.loja">cnpj: <span class="fw-semi-bold">{{fCNPJ(dashData.loja.cnpj)}}</span></span>
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
				dashData: [],
			};
		},
		methods: {
			// Charts
			// startCharts(type, idEl, label, datax,displayLegend=true) {
			startCharts(type, idEl) {

				// var now 		= new Date()
				// , 	ms 			= 86400000
				var dates 		= this.dashData.datas
				, 	total 		= this.dashData.valores_totais
				, 	totalCat 	= this.dashData.valores_totais_produtos_catalogo


				// for (var i = 1; i < 31; i++) {
				// 	var newDate = new Date(now - (i * ms))
				// 	dates.push((newDate.getDate()).toString().padStart(2, '0')+'/'+(newDate.getMonth()+1).toString().padStart(2, '0'))
				// }

				var el = document.getElementById(idEl).getContext('2d')
				// var graph;


				var sellOut = new Chart (el, {
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
				console.log(sellOut)
			},
			// Charts
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
				this.dashData = await gfn.fApi({url:'https://api.construe.cf/dashboard/lojas/'+this.loja+'/grafico-faturamento-mensal', options: {method: 'GET'}});
				if (this.dashData) {
					this.startCharts('line', 'linechart1','','', true);
				}
			},
			loadDash(obj) {
				this.dashData = obj
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
					this.dashData = ''
					gfn.fApi({url:'https://api.construe.cf/dashboard/lojas?pagina='+(this.currentPage - 1)+'&tamanho_pagina='+this.lojas+'&razao_social='+this.razaoSocial, options: {method: 'GET'}}, this.listStores);
				}
			}
		}
	};
</script>

<style src="./Lojas.scss" lang="scss" scoped />
