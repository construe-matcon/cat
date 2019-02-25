<template>
	<section v-if="1 == 1">
		<h3 class="page-title">Rejeitados <span class="fw-semi-bold">.</span></h3>
		<b-tabs>
			<b-tab title="Associações">
				<b-row class="formProduto">
					<b-col lg="6" class="list-item">
						<h4>Sell Out Rejeitado</h4>
						<b-form-select v-model="selDesc" :options="listaDesc" :select-size="20" @input="sugestao" />
					</b-col>
					<b-col lg="6" class="list-item">
						<h4>Selecione aqui o produto relacionado</h4>
						<b-form-select v-model="selProd" :options="listaProds" :select-size="20" @input="bothSel" />
					</b-col>
				</b-row>
				<b-button variant="outline-success" v-show="add" @click="vSend">Salvar</b-button>
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
	import $ from 'jquery';
	import gfn from '@/core/globalFunctions';
	import axios from 'axios';

	export default {
		name: 'Rejeitados',
		data() {
			return {
				selDesc: null,
				selProd: null,
				add: false,
				listaDesc: [],
				listaProds: [],
			};
		},
		methods: {
			loadRej(obj) {

				var rej = obj.data

				for (var i = 0, lgt = rej.length; i < lgt; i++ ) {
					this.listaDesc.push({
						value: rej[i].descricao,
						text: rej[i].descricao,
					})
				}
			},
			loadSugestao(obj){
				console.log(obj)
			},
			async sugestao(){
				this.add = false
				this.listaProds = []
				this.selProd = null

		        axios.post('https://api.construe.cf/produtos-rejeitados/sugerir', {
		        	descricao: this.selDesc
		        },
		        {
		          headers: {
		            "Content-type": "application/json; charset=UTF-8",
		            "Authorization": JSON.parse(window.localStorage.getItem("account")).token
		          },onUploadProgress: function( progressEvent ) {
		              // this.dis = true
		              // this.prog = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
		              console.log('going')
		            }.bind(this)
		        }).then((response) => {
		          // this.sendData(response)
		          // this.add = false
		          this.fillProd(response.data)
		        }).catch((error) => {
		          // this.sendData(error.response.data)
		          // this.add = false
		          console.log(error)
		        })
			},
			fillProd(obj){
				var prod = obj

				if(obj.length != 0) {
					for (var i = 0, lgt = prod.length; i < lgt; i++ ) {
						this.listaProds.push({
							value: prod[i].descricao,
							text: prod[i].descricao,
						})
					}
				} else {
					this.listaProds.push({
						value: 'NENHUMA SUGESTÃO ENCONTRADA NO CATÁLOGO CONSTRUE',
						text: 'NENHUMA SUGESTÃO ENCONTRADA NO CATÁLOGO CONSTRUE',
					})
				}
			},
			bothSel() {
				this.add = true;

				console.log(this.selDesc)
				console.log(this.selProd)
			},
			vSend() {
				alert('Gravou')
			},
		},
		async mounted() {
			await gfn.fApi({url:"https://api.construe.cf/produtos-rejeitados?tamanho_pagina=100", options: {method: 'GET'}}, this.loadRej);
		},
	};
</script>

<style lang="scss" scoped>
@import './Rejeitados.scss';
</style>
