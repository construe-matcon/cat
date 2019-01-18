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
	var url = "https://api.mlab.com/api/1/databases/construe-cf/collections/login?apiKey=LLKamk80CzsWhh1DYeLENAKd0-vPMjN_"
	import Widget from '@/components/Widget/Widget';

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
					var that = this
					,	inputName = this.input.username
					,	inputPass = this.input.password;

					fetch(url).then(function(response){
						response.json().then(function(data){
							that.user = data;
							
							if(!that.user.find(us => inputName == us.user && inputPass == us.pass) == false) {
								var loggedUser = that.user.find(us => inputName == us.user && inputPass == us.pass)
								that.$parent.account = {
									name: loggedUser.name,
									lastname: loggedUser.lastname,
									user: loggedUser.user,
									id: loggedUser._id
								}

								that.$emit("authenticated", true);
								window.localStorage.setItem('authenticated', true);
								that.$router.push('/');
							} else {
								alert('Nome de usuário ou senha inválidos')
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
