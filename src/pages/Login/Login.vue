<template>
	<div class="login-page">
		<b-container>
			<h5 class="logo">
				<img :src="icon.picture" alt="Construe" class="icon-title">
			</h5>
			<Widget class="mx-auto" title="<h3 class='mt-0'>Faça login para continuar</h3>" customHeader>
				<form class="mt" @submit.prevent="login">
					<b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
						{{errorMessage}}
					</b-alert>
					<div class="form-group">
						<input class="form-control no-border" v-model="input.username" ref="username"
						required type="text" name="username" placeholder="Usuário" />
					</div>
					<div class="form-group">
						<input class="form-control no-border" v-model="input.password" ref="password"
						required type="password" name="password" placeholder="Senha" />
					</div>
					<div class="clearfix">
						<div class="btn-toolbar float-right">
							<b-button type="submit" size="sm" variant="inverse">Entrar</b-button>
						</div>
					</div>
				</form>
			</Widget>
		</b-container>
		<footer class="footer">
			2019 - MatCon Construe
		</footer>
	</div>
</template>

<script>
	let url = "https://api.construe.cf/login"
	import Widget from '@/components/Widget/Widget';
	import jwt from 'jsonwebtoken';

	export default {
		name: 'login',
		components: { Widget },
		data() {
			return {
				input: {
					username: "",
					password: ""
				},
				user: '',
				icon: {
					picture: require('../../assets/img/construe.png'), // eslint-disable-line global-require
				},
				errorMessage: null,
			};
		},
		methods: {
			login(){
				if(this.input.username != "" && this.input.password != ""){
					let that = this
					,	inputName = this.input.username
					,	inputPass = this.input.password
					,	jsonInputs = {
						'email': inputName,
						'senha': inputPass
					};

					fetch(url, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(jsonInputs)
					}).then(function(response){
						response.json().then(function(data){
							that.user = data;

							if (data.mensagens != null) {
								alert(data.mensagens[0])
							} else {
								let loggedUser = jwt.decode(data.token).usuario
								,	redirectPath = (that.$router.history ? (that.$router.history.current.query ? that.$router.history.current.query.redirect : '/') : '/')

								that.$emit("authenticated", true);
								window.localStorage.clear()
								window.localStorage.setItem('authenticated', true);
								window.localStorage.setItem('account', JSON.stringify({
									name: loggedUser.nome,
									user: loggedUser.email,
									id: loggedUser.id,
									token: data.token
								}));
								
								that.$router.push({path:redirectPath || '/'});
							}
						});
					}).catch(function(err){
						console.error('Erro ao validar:', err);
					});
				} else {
					alert('É obrigatório preencher usuário e senha')
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
@import './Login.scss';
</style>
