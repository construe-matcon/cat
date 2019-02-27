<template>
	<div v-if="lojas">
		<template v-if="storeInfos.length > 0">
			<h1 class="page-title">Lojas</h1>
			<!-- <h5 class="page-title"><small>Última atualização: <span class='fw-semi-bold'>{{date}}</span></small></h5> -->
			<b-row>
				<b-col>
					<Widget>
						<div class="table-resposive table-hover">
							<table class="table">
								<thead>
									<tr>
										<th class="hidden-sm-down">Razão Social</th>
										<th class="hidden-sm-down">Prod Assc.</th>
										<th class="hidden-sm-down">Prod Sem Assc.</th>
										<th class="hidden-sm-down">Total</th>
									</tr>
								</thead>
								<tbody>
									<template v-for="(row, index) in storeInfos">
										<tr :key="'listas'+index">
											<td><h5>{{row.razao_social}}</h5><span class="small">Ultima atualização: {{(row.data_leitura != null ? fDate(row.data_leitura) : 'Sem dados')}}</span></td>
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
			Dados não encontrados
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
			};
		},
		methods: {
			async pages(){
				await gfn.fApi({url:'https://api.construe.cf/dashboard/lojas?pagina='+(this.currentPage - 1)+'&tamanho_pagina='+this.lojas, options: {method: 'GET'}}, this.listStores);
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
				this.storeInfos = obj.data
				this.totalLojas = obj.total_data_size

				console.log(obj)
			},
			fDate(date) {
				return gfn.formatDate(date)
			}
		},
		async mounted() {
			await gfn.fApi({url:'https://api.construe.cf/dashboard/lojas', options: {method: 'GET'}}, this.listStores);
		},
		created() {
		},
	};
</script>

<style src="./Lojas.scss" lang="scss" scoped />
