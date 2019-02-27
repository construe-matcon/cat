<template>
	<div class="minhaConta-page">
		<b-container>
			<b-row>
				<b-col>
					<h1>Minha conta</h1>
					<hr />
					{{user}}
				</b-col>
			</b-row>
			<b-form @submit.prevent="" id="userUpdate" class="row formUser col-12">
				<b-col lg="3" class="list-item">
					<input type="file" ref="photo" name="photo" id="userPhoto" style="display: none;" @change="newPhoto">
					<div class="holder-img" @click.prevent="changePhoto">
						<img class="img-rounded" :src="userpic" alt="" />
					</div>
				</b-col>
				<b-col lg="8" class="list-item">
						<div class="form-group row">
							<label for="inputEmail" class="col-4 col-form-label text-right">E-mail</label>
							<div class="col-8">
								<b-input class="form-control-plaintext" id="inputEmail" v-model="user.email" readonly />
							</div>
						</div>
						<div class="form-group row">
							<label for="inputNome" class="col-4 col-form-label text-right">Nome</label>
							<div class="col-8">
								<b-input class="form-control-plaintext" id="inputNome" v-model="user.nome"  />
							</div>
						</div>
						<div class="form-group row">
							<label for="inputOldPass" class="col-4 col-form-label text-right">Senha Atual</label>
							<div class="col-8">
								<b-input type="password" class="form-control-plaintext" id="inputOldPass" v-model="user.pass" autocomplete="off" />
							</div>
						</div>
						<div class="form-group row">
							<label for="inputPass" class="col-4 col-form-label text-right">Nova Senha</label>
							<div class="col-8">
								<b-input type="password" class="form-control-plaintext" id="inputPass" v-model="user.novapass" autocomplete="off" />
							</div>
						</div>
						<div class="form-group row">
							<label for="inputRePass" class="col-4 col-form-label text-right">Confirmar Nova Senha</label>
							<div class="col-8">
								<b-input type="password" class="form-control-plaintext" id="inputRePass" v-model="user.repass" autocomplete="off" />
								<small class="d-block text-right">A senha deverá ter no mínimo 8 caracteres</small>
								<b-popover :show.sync="tooltipShow" target="inputRePass" title="" placement="topleft" disabled>
									{{popoverText}}
								</b-popover>
							</div>
						</div>
						<div class="form-group row">
							<div class="col-4"></div>
							<div class="col-8">
								<b-button variant="outline-danger float-left" @click.prevent="resetForm">Cancelar</b-button>
								<b-button variant="outline-success float-right" @click.prevent="sendForm">Salvar</b-button>
							</div>
						</div>
				</b-col>
			</b-form>
		</b-container>
	</div>
</template>

<script>
	// import $ from 'jquery';
	import Widget from '@/components/Widget/Widget';
	import gfn from '@/core/globalFunctions';
	import jwt from 'jsonwebtoken';
	import axios from 'axios';

	export default {
		name: 'minhaConta',
		components: { Widget },
		data() {
			return {
				user: jwt.decode(JSON.parse(window.localStorage.getItem('account')).token).usuario,
				userpic: '',
				bkpUser: jwt.decode(JSON.parse(window.localStorage.getItem('account')).token).usuario,
				tooltipShow: false,
				popoverText: 'A senha está diferente da digitada',
				igfn: gfn
			};
		},
		methods: {
			resetForm: function() {
				this.user = this.bkpUser
			},
			sendForm: function() {
				this.tooltipShow = false;
				console.log(this.user.novapass)
				console.log(this.user.repass)
				if ((this.user.novapass == this.user.repass) && (this.user.novapass.length >= 8 && this.user.repass.length >= 8)) {
					let formData = new FormData()
					console.log(formData)
				} else {
					this.tooltipShow = true
				}
			},
			changePhoto: function() {
				let elm = this.$refs.photo
				elm.click()
			},
			newPhoto: function(event) {
				let input = event.target
				,	reader = new FileReader();

				reader.onload = function(e) {
					console.log(e.target.result)
					document.querySelector('.list-item .img-rounded').setAttribute('src', e.target.result);
				}

				reader.readAsDataURL(input.files[0])
			},
			hasImage: function(foto) {
				/* eslint-disable */
				axios.get('https://images.construe.cf/usuarios/'+foto).then((response) => {
					//response
					this.userpic = 'https://images.construe.cf/usuarios/'+foto
				}).catch((error) => {
					//error
					this.userpic = require('../../assets/people/upload.png')
				})
				/* eslint-enable */
			},
		},
		mounted() {
			this.hasImage(this.user.foto)
			this.user.novapass = ''
			this.user.repasspass = ''
		},
	};
</script>

<style lang="scss" scoped>
@import './User.scss';
</style>
