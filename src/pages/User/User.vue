<template>
	<div class="minhaConta-page">
		<b-container>
			<b-row>
				<b-col>
					<h1>Minha conta</h1>
					<hr />
				</b-col>
			</b-row>
			<b-form @submit.prevent="sendForm" id="userUpdate" class="row formUser col-12">
				<b-col lg="3" class="list-item">
					<b-form-file
						v-model="userP"
						v-show="false"
						:state="Boolean(userP)"
						accept=".png,.jpeg,.jpg,.gif"
						placeholder=""
						drop-placeholder=""
						browse-text=""
						@change="newPhoto"
						ref="photo"
						name="photo"
						id="userPhoto"
					/>
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
								<b-input class="form-control-plaintext" id="inputNome" v-model="user.nome" readonly />
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
								<b-button variant="outline-success float-right" type="submit">Salvar</b-button>
							</div>
						</div>
				</b-col>
			</b-form>
			<b-modal
				ref="changeUserProfile"
				:title="avisoModalTitle"
				:header-bg-variant="avisoModalTipo"
				:header-text-variant="'light'"
				:body-bg-variant="'light'"
				:body-text-variant="'dark'"
				:footer-bg-variant="'light'"
				:footer-text-variant="'dark'"
				ok-only
			>
				<div class="d-block text-left">
					<p v-html="avisoModal"></p>
				</div>
			</b-modal>
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
				userP: '',
				bkpUser: jwt.decode(JSON.parse(window.localStorage.getItem('account')).token).usuario,
				tooltipShow: false,
				popoverText: 'A senha está diferente da digitada',
				igfn: gfn,
				avisoModal: 'Usuário alterado com sucesso',
				avisoModalTipo: 'light',
				avisoModalTitle: 'Usuário',
				ddV: ''
			};
		},
		methods: {
			resetForm() {
				this.user = this.bkpUser
			},
			async sendForm() {
				this.avisoModal = ''
				this.tooltipShow = false;
				// if (
				// 	(!this.user.pass && !this.user.novapass && !this.user.repass) || 
				// 	((this.user.novapass == this.user.repass) && (this.user.novapass.length >= 8 && this.user.repass.length >= 8))
				// ) {
					let formData = new FormData()
					formData.append('nome',this.user.nome)
					// if (!this.user.pass || this.user.pass == '') {
						formData.append('senha_antiga',this.user.pass)
					// }
					// if (!this.user.novapass || this.user.novapass == '') {
						formData.append('senha_nova',this.user.novapass)
					// }
					formData.append('arquivo',this.userP)

					let rApi = await gfn.aApi({url: 'https://api.construe.cf/usuarios/minha-conta/'+this.user.id, method: 'put', data: formData})

					if (rApi.response != undefined) {
						this.avisoModal = ''
						this.avisoModalTipo = 'danger'
						this.avisoModalTitle = 'Erro ao editar usuário'
						rApi.response.data.mensagens.forEach((msg, i) => {
							this.avisoModal += (i != 0 ? '<br>'+msg : msg)
						})
					} else {
						this.bkpUseruser = this.user
						this.avisoModal = 'Usuário atualizado com sucesso!'
						this.avisoModalTipo = 'success'
						this.avisoModalTitle = 'Sucesso Usuário'
					}

					// axios.put('https://api.construe.cf/usuarios/minha-conta/'+this.user.id, formData, {
					// 	headers: {
					// 		"Content-type": "application/json; charset=UTF-8",
					// 		"Authorization": JSON.parse(window.localStorage.getItem("account")).token
					// 	}
					// }).then((response) => {
						// this.ddV = response
						// this.bkpUseruser = this.user
						// this.avisoModal = 'Usuário atualizado com sucesso!'
						// this.avisoModalTipo = 'success'
						// this.avisoModalTitle = 'Sucesso Usuário'
					// }).catch((error) => {

					// })

					this.$refs.changeUserProfile.show()
				// } else {
				// 	this.tooltipShow = true
				// }
			},
			completeForm(obj) {
				console.log(obj)
			},
			changePhoto() {
				let elm = this.$refs.photo
				elm.$refs.input.click()
			},
			newPhoto(event) {
				let input = event.target
				,	reader = new FileReader();

				reader.onload = function(e) {
					document.querySelector('.list-item .img-rounded').setAttribute('src', e.target.result);
				}

				reader.readAsDataURL(input.files[0])
			},
			async hasImage(foto) {
				/* eslint-disable */
				if (foto != null) {
					axios.get('https://images.construe.cf/usuarios/'+foto).then((response) => {
						//response
						this.userpic = 'https://images.construe.cf/usuarios/'+foto
					}).catch((error) => {
						//error
						this.userpic = require('../../assets/people/upload.png')
					})
				} else {
					this.userpic = require('../../assets/people/upload.png')
				}
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
