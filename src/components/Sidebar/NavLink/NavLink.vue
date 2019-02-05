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
				<div v-if="childrenLinks.length > 0" :class="{caretWrapper: true, carretActive: isActive}" @click.prevent="openMenuList">
					<i class="fa fa-angle-left" />
				</div>
			</router-link>
		</div>
		<b-collapse v-if="childrenLinks.length > 0" :id="'collapse' + index" :visible="isActive">
			<ul>
				<NavLink v-for="link in childrenLinks"
				:activeItem="activeItem"
				:nome="link.nome"
				:index="link.id.toString()"
				:link="link.id.toString()"
				:childrenLinks="link.subcategorias"
				:key="link.link"
				:level="(level + 1)"
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
			childrenLinks: { type: Array, default: null },
			className: { type: String, default: '' },
			isHeader: { type: Boolean, default: false },
			deep: { type: Number, default: 0 },
			activeItem: { type: String, default: '' },
			label: { type: String },
			index: { type: String },
			level: { type: Number, default: 0 },
		},
		data() {
			return {
				headerLinkWasClicked: false,
				navItens: [],
				classLevel: 'level' + this.level,
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
				return (this.iconName) ? `fi ${this.iconName}` : ``;
			},
			isActive() {
				return (this.activeItem
					&& this.activeItem.includes(this.index)
					&& this.headerLinkWasClicked);
			},
		},
		created(){
		}
	};
</script>

<style src="./NavLink.scss" lang="scss" scoped />
