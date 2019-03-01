<template>
	<div class="cadastro-page">
		<b-container>
			<Widget class="mx-auto" title="<h3 class='mt-0'>Cadastro de novo usuário</h3>" customHeader>
				<form class="mt" @submit.prevent="cadastro">
					<div class="form-group">
						<input class="form-control no-border" v-model="dados.nome" ref="fullname"
						required type="text" name="fullname" placeholder="Nome Completo" />
					</div>
					<div class="form-group">
						<input class="form-control no-border" v-model="dados.email" ref="email"
						required type="text" name="email" placeholder="Email" />
					</div>
					<div class="form-group">
						<input class="form-control no-border" v-model="dados.senha" ref="password"
						required type="password" name="password" placeholder="Senha" />
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
					'id_perfil': 1,
					'ind_todas_industrias': true,
					'ids_industrias': ''
				},
				errorMessage: '',
				successMessage: '',
			};
		},
		methods: {
			async cadastro(){
				var email = this.dados.email
				this.errorMessage = ''
				this.successMessage = ''

				if (email.split('@')[1].indexOf('construe') >= 0 || email.split('@')[1].indexOf('yandeh') >= 0) {
					await gfn.fApi({url:"https://api.construe.cf/usuarios", options: {method: 'POST', body: JSON.stringify(this.dados)}}, this.sendData);
				} else {
					this.errorMessage = 'O email precisa ser Yandeh ou Construe para poder efetuar o cadastro'
				}
			},
			sendData(obj){
				if(obj.mensagens) {
					console.log(obj)
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
		},
	};
</script>

<style lang="scss" scoped>
@import './_CadUser.scss';
</style>
