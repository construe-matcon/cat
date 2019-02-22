<template>
	<li v-if="!childrenLinks && isHeader" :class="{headerLink: true, className}">
		<router-link :to="link">
			<span class="icon">
				<i :class="fullIconName"></i>
			</span>
			{{nome}}
			<b-badge v-if="badge" class="badge rounded-f" variant="warning" pill>{{badge}}</b-badge>
		</router-link>
	</li>
	<li v-else-if="childrenLinks" :class="{headerLink: true, className}">
		<div>
			<router-link :to="link" class="d-flex" :class="classLevel">
				<span v-if="fullIconName" class="icon">
					<i :class="fullIconName"></i>
				</span>
				{{nome}}
				<div v-if="childrenLinks.length > 0" :class="{caretWrapper: true, carretActive: isActive}" @click.prevent="openMenuList" :data-index="index">
					<i class="fa fa-angle-left" />
				</div>
			</router-link>
		</div>
		<b-collapse v-if="childrenLinks.length > 0" :id="'collapse' + index" :visible="isActive">
			<ul>
				<NavLink v-for="clink in childrenLinks"
				:activeItem="activeItem"
				:nome="clink.nome"
				:parentLink="parentLink"
				:index="clink.id.toString()"
				:link="parentLink + '/' + clink.id.toString()"
				:childrenLinks="clink.subcategorias"
				:key="clink.link"
				:deep="(deep + 1)"
				/>
			</ul>
		</b-collapse>
	</li>
	<li v-else>
		<router-link :to="index !== 'menu' && link">
			{{nome}}
		</router-link>
	</li>
</template>

<script>
	import { mapActions } from 'vuex';
	import $ from 'jquery';
	export default {
		name: 'NavLink',
		props: {
			badge: { type: String, dafault: '' },
			nome: { type: String, default: '' },
			iconName: { type: String, default: '' },
			headerLink: { type: String, default: '' },
			link: { type: String, default: '' },
			parentLink: { type: String, default: '' },
			childrenLinks: { type: Array, default: null },
			className: { type: String, default: '' },
			isHeader: { type: Boolean, default: false },
			deep: { type: Number, default: 0 },
			activeItem: { type: String, default: '' },
			label: { type: String },
			index: { type: String },
		},
		data() {
			return {
				headerLinkWasClicked: false,
				navItens: [],
				classLevel: 'level' + this.deep,
			};
		},
		methods: {
			...mapActions('layout', ['changeSidebarActive']),
			openMenuList(e) {
				var el = e.target
				if ($(el).hasClass('caretWrapper')) {
					$(el).toggleClass('carretActive')
				} else {
					$(el).closest('.caretWrapper').toggleClass('carretActive')
				}
				$(el).closest('.headerLink').find('.collapse').first().toggle(100);
			}
		},
		computed: {
			fullIconName() {
				return (this.iconName) ? `${this.iconName}` : ``;
			},
			isActive() {
				return (this.activeItem
					&& this.activeItem.includes(this.index)
					&& this.headerLinkWasClicked);
			},
		},
		created(){
		},
	};
</script>

<style src="./NavLink.scss" lang="scss" scoped />
