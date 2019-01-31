<template>
  <!-- <nav
    :class="{sidebar: true, sidebarStatic, sidebarOpened}"
    @mouseenter="sidebarMouseEnter"
    @mouseleave="sidebarMouseLeave"
  > -->
  <nav class="sidebar">
    <header class="logo">
      <router-link to="/"><img :src="icon.picture" width="50%" alt="Construe" class="icon-title"></router-link>
    </header>
    <ul class="nav">
      <NavLink
        nome="Catálogo"
        link="/"
        iconName="flaticon-equal-1"
        index="catalogo"
        isHeader
      />
      <NavLink
        :activeItem="activeItem"
        nome="Categorias"
        link="/Categorias"
        iconName="flaticon-list"
        index="catalogo"
        :childrenLinks="navItens"
      />
    </ul>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      alerts: [],
      icon: {
        picture: require('../../assets/img/construe.png'), // eslint-disable-line global-require
      },
      navItens: [],
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
    fetchUrl(){
        var that = this
        ,   dados = JSON.parse(window.localStorage.getItem("account"))
        ,   url    = "https://api.construe.cf/categorias?pagina=0&tamanho_pagina=20"

        fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': dados.token
          }
        }).then(function(response){
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
  created() {
    // this.setActiveByRoute();
    this.fetchUrl();
  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
