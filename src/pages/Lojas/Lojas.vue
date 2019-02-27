<template>
	<div v-if="lojas">
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
			};
		},
		methods: {
			async pages(){
				await gfn.fApi({url:'https://api.construe.cf/dashboard/lojas?pagina='+(this.currentPage - 1)+'&tamanho_pagina='+this.lojas+'&razao_social='+this.razaoSocial, options: {method: 'GET'}}, this.listStores);
			},
			async filter(){
				this.currentPage = 1
				this.msgErro = 'Carregando...'
				this.storeInfos = ''
				await gfn.fApi({url:'https://api.construe.cf/dashboard/lojas?pagina='+(this.currentPage - 1)+'&tamanho_pagina='+this.lojas+'&razao_social='+this.razaoSocial, options: {method: 'GET'}}, this.listStores);
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

				console.log(this.storeInfos)
			},
			fDate(date) {
				return gfn.formatDate(date)
			}
		},
		async mounted() {
			await gfn.fApi({url:'https://api.construe.cf/dashboard/lojas?pagina='+(this.currentPage - 1)+'&tamanho_pagina='+this.lojas+'&razao_social='+this.razaoSocial, options: {method: 'GET'}}, this.listStores);
		},
		created() {
		},
	};
</script>

<style src="./Lojas.scss" lang="scss" scoped />
