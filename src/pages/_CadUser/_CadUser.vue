<template>
	<div class="cadastro-page">
		<b-container>
			<Widget class="mx-auto" title="<h3 class='mt-0'>Cadastro de novo usuário</h3>" customHeader>
				<form class="mt" @submit.prevent="cadastro" autocomplete="off">
					<div class="form-group">
						<input class="form-control no-border" v-model="dados.nome" ref="fullname" required type="text" name="fullname" placeholder="Nome Completo" autocomplete="off" />
					</div>
					<div class="form-group">
						<input class="form-control no-border" v-model="dados.email" ref="email" required type="text" name="email" placeholder="Email" autocomplete="off" />
					</div>
					<div class="form-group">
						<input class="form-control no-border" v-model="dados.senha" ref="password" required type="password" name="password" placeholder="Senha" autocomplete="new-password" />
					</div>
					<div class="form-group">
						<b-form-group label="Perfil" label-cols="6" label-for="perfil">
							<b-form-radio-group
								id="perfil"
								buttons
								button-variant="primary"
								v-model="dados.id_perfil"
								:options="perfilOpt"
								name="radiosBtnDefault"
							/>
						</b-form-group>
					</div>
					<div class="form-group">
						<b-form-group label="Associar Industria" label-cols="6" label-for="industria">
							<b-form-checkbox class="float-left" v-model="dados.ind_todas_industrias" @change="toggleAll">Todas</b-form-checkbox>
							<b-form-checkbox-group
								id="industria1"
								name="indBasico1"
								v-model="dados.ids_industrias"
								:options="industriaOpt"
								@change="uncheckAll"
							/>
						</b-form-group>
					</div>
					<b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
						<span v-html="errorMessage"></span>
					</b-alert>
					<b-alert class="alert-sm" variant="success" :show="!!successMessage">
						{{successMessage}}
					</b-alert>
					<div class="clearfix">
						<div class="btn-toolbar float-right">
							<b-button type="submit" size="sm" variant="success">Salvar</b-button>
						</div>
					</div>
				</form>
			</Widget>
		</b-container>
	</div>
</template>

<script>
	// import $ from 'jquery';
	import Widget from '@/components/Widget/Widget';
	import gfn from '@/core/globalFunctions';

	export default {
		name: 'cadastro',
		components: { Widget },
		data() {
			return {
				icon: {
					picture: require('../../assets/img/construe.png'), // eslint-disable-line global-require
				},
				dados: {
					'email': '',
					'nome': '',
					'senha': '',
					'id_perfil': '',
					'ind_todas_industrias': false,
					'ids_industrias': []
				},
				perfilOpt: [],
				industriaOpt: [],
				errorMessage: '',
				successMessage: '',
			};
		},
		methods: {
			async cadastro(){
				let dados = JSON.parse(JSON.stringify(this.dados))
				if (dados.ind_todas_industrias) {
					dados.ids_industrias = []
				}
				var email = dados.email
				this.errorMessage = ''
				this.successMessage = ''

				if (email.split('@')[1].indexOf('construe') >= 0 || email.split('@')[1].indexOf('yandeh') >= 0) {
					await gfn.fApi({url:"https://api.construe.cf/usuarios", options: {method: 'POST', body: JSON.stringify(dados)}}, this.sendData);
				} else {
					this.errorMessage = 'O email precisa ser Yandeh ou Construe para poder efetuar o cadastro'
				}
			},
			sendData(obj){
				if(obj.mensagens) {
					this.errorMessage = ''

					for (var i = 0, lgt = obj.mensagens.length; i < lgt; i++ ) {
						this.errorMessage += (i != 0 ? '<br>'+obj.mensagens[i] : obj.mensagens[i])
					}
				} else {
					this.successMessage = 'Cadastro realizado com sucesso!'
					this.dados = {
						'email': '',
						'nome': '',
						'senha': ''
					}
				}
			},
			toggleAll(checked) {
				this.dados.ids_industrias = checked ? this.industriaOpt.map(opt => opt.value) : []
			},
			uncheckAll(checked) {
				if (this.industriaOpt.length == checked.length) {
					this.dados.ind_todas_industrias = true
				} else {
					this.dados.ind_todas_industrias = false
				}
			},
			mountObjInd(obj) {
				obj.data.forEach( ind => {
					this.industriaOpt.push({
						'text': ind.nome,
						'value': ind.id
					})
				});
			},
			mountObjPerf(obj) {
				let perfis = []
				obj.data.forEach( perf => {
					perfis.push({
						'text': perf.nome,
						'value': perf.id
					})
				});
				this.perfilOpt = perfis.sort((a,b) => {
					return a.text - b.text;
				})
			}
		},
		async mounted() {
			await gfn.fApi({url:"https://api.construe.cf/industrias?tamanho_pagina=200", options: {method: 'GET'}}, this.mountObjInd);
			await gfn.fApi({url:"https://api.construe.cf/perfis?tamanho_pagina=200", options: {method: 'GET'}}, this.mountObjPerf);
		}
	};
</script>

<style lang="scss" scoped>
@import './_CadUser.scss';
</style>
