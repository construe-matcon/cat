<template>
	<section v-if="1 == 1">
		<h3 class="page-title">Associação de <span class="fw-semi-bold">Sell Out</span></h3>
		<b-tabs>
			<b-tab title="Rejeitados">
				<b-row class="filterRejeitado">
					<b-col lg="6">
						<b-form>
							<b-form-group
							id="form"
							label-for="buscaInd"
							description="Digite o nome da indústria para filtrar (se mais de uma, separar por vírgula)"
							>
							<b-form-input
							id="buscaInd"
							type="text"
							v-model="filtroInds"
							placeholder="Digite aqui o(s) nome(s)" />
							</b-form-group>
						</b-form>
					</b-col>
					<b-col lg="6">
						<b-button @click="onSubmit" variant="primary">Filtrar</b-button>
					</b-col>
				</b-row>
				<b-row class="formProduto">
					<b-col lg="6" class="list-item">
						<h4>Sell Out Rejeitado</h4>
						<select class="form-control custom-select" size="20" v-model="selDesc" @keyup="sugestao" @click="sugestao">
							<template v-if="listaDesc.length > 0">
								<option v-for="(row, index) in listaDesc" :key="'rejeitado='+index" :value="index">{{row.descricao}}</option>
							</template>
							<template v-else-if="listaDesc == true">
								<option value="">Carregando...</option>
							</template>
							<template v-else>
								<option value="" disabled>NENHUM DADO DE SELL OUT ENCONTRADO PARA ASSOCIAR</option>
							</template>
						</select>
						<b-pagination v-if="itensRej <= totalItensRej"
							align="center"
							size="sm"
							next-text="Proximo"
							prev-text="Anterior"
							v-model="currentPage"
							:limit="10"
							:hide-goto-end-buttons="true"
							:total-rows="totalItensRej"
							:per-page="itensRej"
							@input="pages"
						/>
						<template v-if="detailRej == true">
							<div class="detalhes">
								<span>Descrição: </span><span class="fw-semi-bold">{{listaDesc[selDesc].descricao}}</span><br>
								<span>Loja: </span><span class="fw-semi-bold">{{listaDesc[selDesc].loja}}</span><br>
								<span>CNPJ Loja: </span><span class="fw-semi-bold">{{listaDesc[selDesc].cnpj}}</span><br>
								<span>Código do Produto: </span><span class="fw-semi-bold">{{listaDesc[selDesc].codigo_produto}}</span><br>
								<span>SKU: </span><span class="fw-semi-bold">{{listaDesc[selDesc].sku}}</span><br>
								<span>Indústria Possui Sell In? </span><span class="fw-semi-bold">{{(listaDesc[selDesc].ind_possui_sellin ? 'Sim' : 'Não')}}</span><br>
								<span>Indústria Possui Sell Out? </span><span class="fw-semi-bold">{{(listaDesc[selDesc].ind_possui_sellout ? 'Sim' : 'Não')}}</span><br>
							</div>
						</template>
					</b-col>
					<b-col lg="6" class="list-item">
						<h4>Selecione aqui o produto relacionado</h4>
						<select class="form-control custom-select" size="20" v-model="selProd" @keyup="bothSel" @click="bothSel">
							<template v-if="listaProds.length > 0">
								<option v-for="(row, index) in listaProds" :key="'produto='+index" :value="index">{{row.descricao}}</option>
							</template>
							<template v-else-if="listaProds == true">
								<option value=""></option>
							</template>
							<template v-else>
								<option value="" disabled>NENHUMA SUGESTÃO ENCONTRADA NO CATÁLOGO CONSTRUE</option>
							</template>
						</select>
						<template v-if="detailProd == true">
							<div class="detalhes prodRelacionado">
								<span>Descrição: </span><span class="fw-semi-bold">{{listaProds[selProd].descricao}}</span><br>
								<span>Descrição da Indústria: </span><span class="fw-semi-bold">{{listaProds[selProd].descricao_industria}}</span><br>
								<span>ID: </span><span class="fw-semi-bold">{{listaProds[selProd].id}}</span><br>
								<span>Indústria: </span><span class="fw-semi-bold">{{listaProds[selProd].industria}}</span><br>
								<span>Fabricante: </span><span class="fw-semi-bold">{{listaProds[selProd].fabricante}}</span><br>
								<span>Categoria: </span><span class="fw-semi-bold">{{listaProds[selProd].categoria}}</span><br>
								<template v-if="listaProds[selProd].tags">
									<span>Tags: </span><br>
									<span v-for="(tags,i) in listaProds[selProd].tags" :key="'tg-'+i">
										<span v-if="tags.length > 0" class="fw-semi-bold" style="text-transform: capitalize;">{{tags}}<br></span>
									</span>
								</template>
								<span>Marca: </span><span class="fw-semi-bold">{{listaProds[selProd].marca}}</span><br>
								<span>Linha: </span><span class="fw-semi-bold">{{listaProds[selProd].linha}}</span><br>
								<span>EAN: </span><span class="fw-semi-bold">{{listaProds[selProd].ean}}</span><br>
								<span>Código Interno: </span><span class="fw-semi-bold">{{listaProds[selProd].codigo_interno}}</span><br>
								<span>NCM: </span><span class="fw-semi-bold">{{listaProds[selProd].ncm}}</span><br>
								<span>Data de Criação: </span><span class="fw-semi-bold">{{(listaProds[selProd].dt_criacao ? listaProds[selProd].dt_criacao.toLocaleString('pt-br') : 'Data não informada')}}</span><br>
								<span>Data de Atualização: </span><span class="fw-semi-bold">{{(listaProds[selProd].dt_ultima_alteracao ? listaProds[selProd].dt_ultima_alteracao.toLocaleString("pt-br") : 'Data não informada')}}</span><br>
							</div>
						</template>
						<b-button variant="outline-success" class="saveRej float-right" v-show="add" v-b-modal.modal-center>Salvar</b-button>
						<b-modal ref="myModalRef" id="modal-center" centered hide-footer title="Confirmação de associação">
							<span>Você irá associar o Sell Out <span class="fw-semi-bold">{{modalNomes.nomeDesc}}</span></span>
							<br>
							<span>Com o produto <span class="fw-semi-bold">{{modalNomes.nomeProd}}</span></span>
							<br />
							<br />
							<h5>Este processo é <span class="fw-semi-bold">irreversível</span><br>Tem certeza que deseja continuar ?</h5>
							<b-button variant="success" class="saveRej float-right" v-show="add" @click="vSend">Confirmar</b-button>
							<b-button variant="danger" class="saveRej float-left" v-show="add" @click="hideModal">Cancelar</b-button>
						</b-modal>
					</b-col>
				</b-row>
			</b-tab>
		</b-tabs>
	</section>
	<section v-else-if="prod.mensagens">
		Produto não encontrado...
	</section>
	<section v-else>

	</section>
</template>

<script>
	// import $ from 'jquery';
	import gfn from '@/core/globalFunctions';
	import axios from 'axios';

	export default {
		name: 'Rejeitados',
		data() {
			return {
				selDesc: null,
				selProd: null,
				add: false,
				filtroInds: '',
				listaDesc: true,
				listaProds: true,
				listaAssociar: '',
				modalNomes: '',
				pag: 0,
				itensRej: 0,
				totalItensRej: 0,
				detailRej: false,
				detailProd: false,
				currentPage: 1,
			};
		},
		methods: {
			resetAll(){
				this.detailProd = false;
				this.detailRej = false;
				this.selDesc = null
				this.selProd = null
				this.listaDesc = true
				this.listaProds = true
			},
			async pages(){
				this.resetAll()
				await gfn.fApi({url:"https://api.construe.cf/produtos-rejeitados?tamanho_pagina="+this.itensRej+"&pagina="+(this.currentPage - 1)+"&descricao="+this.filtroInds, options: {method: 'GET'}}, this.loadRej);
			},
			async onSubmit() {
				this.currentPage = 1
				this.resetAll()
				await gfn.fApi({url:"https://api.construe.cf/produtos-rejeitados?tamanho_pagina="+this.itensRej+"&descricao="+this.filtroInds, options: {method: 'GET'}}, this.loadRej);

			},
			async loadRej(obj) {
				this.listaDesc = obj.data
				this.itensRej = obj.size
				this.totalItensRej = obj.total_data_size

				console.log(this.totalItensRej)
			},
			sugestao(){
				this.detailRej = false
				this.detailProd = false;
				this.add = false
				this.listaProds = true
				this.detailRej = true
				this.selProd = null

				axios.post('https://api.construe.cf/produtos-rejeitados/sugerir', {
					descricao: this.listaDesc[this.selDesc].descricao
				},
				{
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						"Authorization": JSON.parse(window.localStorage.getItem("account")).token
					}}).then((response) => {
					// this.sendData(response)
					this.add = false
					this.fillProd(response)
				}).catch((error) => {
					// this.sendData(error.response.data)
					this.add = false
					console.log(error)
				})
			},
			fillProd(obj){
				this.listaProds = obj.data
			},
			bothSel() {
				this.detailProd = false;
				this.add = true;
				this.detailProd = true;

				this.modalNomes = {
					'nomeDesc': this.listaDesc[this.selDesc].descricao,
					'nomeProd': this.listaProds[this.selProd].descricao,
				}


				this.listaAssociar = {
					'id_produto': this.listaProds[this.selProd].id,
					'cnpj': this.listaDesc[this.selDesc].cnpj,
					'codigo_produto': this.listaDesc[this.selDesc].codigo_produto,
					'sku': this.listaDesc[this.selDesc].sku,
				}
				console.log(this.listaAssociar)
			},
			vSend() {
				alert('Gravou')
				// this.$refs.myModalRef.hide()

			},
			hideModal() {
				this.$refs.myModalRef.hide()
			},
		},
		async mounted() {
			await gfn.fApi({url:"https://api.construe.cf/produtos-rejeitados?tamanho_pagina=20", options: {method: 'GET'}}, this.loadRej);
		},
	};
</script>

<style lang="scss" scoped>
@import './Associacoes.scss';
</style>
