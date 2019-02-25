<template>
	<b-navbar class="header d-print-none">
		<!-- <b-nav>
		<b-nav-item>
		<a class="d-md-down-none px-2" href="#" @click="toggleSidebarMethod" id="barsTooltip">
		<i class='la la-bars la-lg' />
		</a>
		<b-tooltip target="barsTooltip" placement="bottom">
		Turn on/off <br> sidebar <br> collapsing
		</b-tooltip>
		<a class="fs-lg d-lg-none" href="#" @click="switchSidebarMethod">
		<span class="rounded rounded-lg bg-gray text-white d-md-none">
		<i class="la la-bars la-lg" />
		</span>
		<i class="la la-bars la-lg d-sm-down-none ml-4" />
		</a>
		</b-nav-item>
		<b-nav-item class="d-md-down-none">
		<a href="#" class="px-2">
		<i class="la la-refresh la-lg" />
		</a>
		</b-nav-item>
		<b-nav-item class="d-md-down-none">
		<a href="#" class="px-2">
		<i class="la la-times la-lg" />
		</a>
		</b-nav-item>
		</b-nav>
		<b-nav>
		<b-form class="d-sm-down-none ml-5" inline>
		<b-form-group>
		<b-input-group class="input-group-no-border">
		<div class="input-group-addon d-flex align-items-center">
		<i class="la la-search px-3" />
		</div>
		<b-input id="search-input" placeholder="Buscar" />
		</b-input-group>
		</b-form-group>
		</b-form>
		</b-nav> -->
		<a  class="navbarBrand d-md-none">
			<img :src="icon.picture" width="50%" alt="Construe" class="icon-title">
		</a>
		<b-nav class="ml-auto">
			<!-- <b-nav-item-dropdown
			id="basic-nav-dropdown"
			class="notificationsMenu d-sm-down-none mr-2"
			extra-menu-classes="notificationsWrapper py-0 animated animated-fast fadeInUp"
			right>
			<template slot="button-content">
			<span class="avatar thumb-sm float-left mr-2">
			<img class="rounded-circle" src="../../assets/people/a5.jpg" alt="..." />
			</span>
			<span class="small">User <span class="fw-semi-bold">Logado</span></span>
			<span class="ml-1 circle bg-warning text-white fw-bold">13</span>
			</template>
			<Notifications />
			</b-nav-item-dropdown> -->
			<b-nav-item-dropdown class="notificationsMenu d-sm-down-none mr-2"
			extra-menu-classes="notificationsWrapper py-0"
			right>
			<!-- <template slot="button-content">
			<i class="la la-cog px-2" />
			</template> -->
				<template slot="button-content">
					<span class="avatar thumb-sm float-left mr-2">
						<img class="rounded-circle" :src="account.pic" alt="..." />
					</span>
					<span class="fw-semi-bold" v-text="account.name"></span>
				</template>
				<b-dropdown-item><i class="fa fa-user" /> Minha Conta</b-dropdown-item>
				<b-dropdown-divider />
					<b-dropdown-item-button @click="goToCadastro"><i class="fa fa-user-plus" /> Criar Usuário</b-dropdown-item-button>
				<b-dropdown-divider />
				<!-- <b-dropdown-item>Calendar</b-dropdown-item>
				<b-dropdown-item>
				Inbox &nbsp;&nbsp;<b-badge variant="danger" pill class="animated bounceIn">9</b-badge>
				</b-dropdown-item>
				<b-dropdown-divider /> -->
				<b-dropdown-item-button @click="logout">
					<i class="fa fa-sign-out" /> Sair
				</b-dropdown-item-button>
			</b-nav-item-dropdown>
			<!-- <b-nav-item>
			<a class="d-sm-down-none px-2" id="toggle-chat" href="#" @click="toggleChat">
			<i class="la la-globe" />
			</a>
			<div id="chat-notification" class="chatNotification hide">
			<div class="chatNotificationInner">
			<h6 class="title d-flex text-white">
			<span class="thumb-xs">
			<img src="../../assets/people/a6.jpg" alt=""
			class="rounded-circle mr-xs float-left" />
			</span>
			Jess Smith
			</h6>
			<p class="text">
			Hi there! <br /> This is a completely new version of Sing App <br />
			built with <strong class="text-primary">Vue</strong>
			</p>
			</div>
			</div>
			</b-nav-item>
			<b-nav-item class="fs-lg d-md-none">
			<a href="#" @click="toggleChat">
			<span class="rounded rounded-lg bg-gray text-white"><i class="la la-globe" /></span>
			</a>
			</b-nav-item> -->
		</b-nav>
	</b-navbar>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import $ from 'jquery';
	import Notifications from '@/components/Notifications/Notifications';

	export default {
		name: 'Headed',
		components: { Notifications },
		data() {
			var dados = JSON.parse(window.localStorage.getItem("account"))
			if (dados.id == 12) {
				dados['pic'] = 'data:image/jpeg;base64,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'
			}
			return {
				account: {
					name: (!dados) ? '' :  dados.name,
					pic: (!dados ? require('../../assets/people/user-default.png') : (!dados.pic ? require('../../assets/people/user-default.png') : dados.pic)), // eslint-disable-line global-require
				},
				icon: {
					picture: require('../../assets/img/construe.png'), // eslint-disable-line global-require
				},
			}
		},
		computed: {
			...mapState('layout', {
				sidebarClose: state => state.sidebarClose,
				sidebarStatic: state => state.sidebarStatic,
			}),
		},
		methods: {
			...mapActions('layout', ['toggleSidebar', 'toggleChat', 'switchSidebar', 'changeSidebarActive']),
			switchSidebarMethod() {
				if (!this.sidebarClose) {
					this.switchSidebar(true);
					this.changeSidebarActive(null);
				} else {
					this.switchSidebar(false);
					const paths = this.$route.fullPath.split('/');
					paths.pop();
					this.changeSidebarActive(paths.join('/'));
				}
			},
			toggleSidebarMethod() {
				if (this.sidebarStatic) {
					this.toggleSidebar();
					this.changeSidebarActive(null);
				} else {
					this.toggleSidebar();
					const paths = this.$route.fullPath.split('/');
					paths.pop();
					this.changeSidebarActive(paths.join('/'));
				}
			},
			logout() {
				window.localStorage.clear();
				this.$router.push('/login');
			},
			goToCadastro(){
				this.$router.push({
					path: "/admin/cadastro/"
				});
			},
		},
		created() {
			if (window.innerWidth > 576) {
				setTimeout(() => {
					const $chatNotification = $('#chat-notification');
					$chatNotification.removeClass('hide').addClass('animated fadeIn')
					.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
						$chatNotification.removeClass('animated fadeIn');
						setTimeout(() => {
							$chatNotification.addClass('animated fadeOut')
							.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd'
								+ ' oanimationend animationend', () => {
									$chatNotification.addClass('hide');
								});
						}, 6000);
					});
					$chatNotification.siblings('#toggle-chat')
					.append('<i class="chat-notification-sing animated bounceIn"></i>');
				}, 4000);
			}
		},
		mounted(){
		}
	};
</script>

<style src="./Header.scss" lang="scss" scoped />
