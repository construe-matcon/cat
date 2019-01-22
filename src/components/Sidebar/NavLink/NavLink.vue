<template>
  <li v-if="!childrenLinks && isHeader" :class="{headerLink: true, className}">
    <router-link :to="link">
      <span class="icon">
        <i :class="fullIconName"></i>
      </span>
      {{nome}} <sup v-if="label" class="headerLabel">{{label}}</sup>
      <b-badge v-if="badge" class="badge rounded-f" variant="warning" pill>{{badge}}</b-badge>
    </router-link>
  </li>
  <li v-else-if="childrenLinks" :class="{headerLink: true, className}">
    <div @click="() => togglePanelCollapse(link)">
      <router-link :to="link" class="d-flex">
        <span class="icon">
          <i :class="fullIconName"></i>
        </span>
        {{nome}} <sup v-if="label" class="headerLabel">{{label}}</sup>
        <div :class="{caretWrapper: true, carretActive: isActive}">
          <!-- <i class="fa fa-angle-left" /> -->
        </div>
      </router-link>
    </div>
    <b-collapse :id="'collapse' + index" :visible="isActive">
      <ul>
        <NavLink v-for="link in childrenLinks"
          :activeItem="activeItem"
          :nome="link.nome"
          :index="link.index"
          :link="link.id.toString()"
          :childrenLinks="link.subcategorias"
          :key="link.link"
        />
      </ul>
    </b-collapse>
  </li>
  <li v-else>
    <router-link :to="index !== 'menu' && link">
      {{nome}} <sup v-if="label" class="headerLabel">{{label}}</sup>
    </router-link>
  </li>
</template>

<script>
import { mapActions } from 'vuex';

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
  },
  data() {
    return {
      headerLinkWasClicked: true,
      navItens: [],
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive']),
    togglePanelCollapse(link) {
      this.changeSidebarActive(link);
      this.headerLinkWasClicked = !this.headerLinkWasClicked
      || !this.activeItem.includes(this.index);
    },
    fetchUrl(){
      var that = this
      ,   url    = "https://api.construe.cf/categorias?pagina=0&tamanho_pagina=20"

      fetch(url).then(function(response){
        response.json().then(function(data){
          var ran = data.data
          that.navItens = ran;
          // console.log(that.navItens)
        });
      }).catch(function(err){
        console.error('Erro na chamada de categorias:', err);
      });
    },
  },
  computed: {
    fullIconName() {
      return `fi ${this.iconName}`;
    },
    isActive() {
      return (this.activeItem
      && this.activeItem.includes(this.index)
      && this.headerLinkWasClicked);
    },
  },
  created(){
    // this.fetchUrl()
  }
};
</script>

<style src="./NavLink.scss" lang="scss" scoped />
