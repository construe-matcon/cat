<template>
	<div class="login-page">
		<b-container>
			<h1>Cadastro Usuario</h1>
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
				console.log('cadastro Usuario')
			}
		},
	};
</script>

<style lang="scss" scoped>
@import './_CadUser.scss';
</style>
