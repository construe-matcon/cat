<template>
<!-- <div :class="{root: true, chatOpen, sidebarClose, sidebarStatic}"> -->
<div :class="{root: true, sidebarStatic, sidebarClose}">
  <Sidebar />
  <div class="wrap">
    <Header />
    <!-- <Chat /> -->
    <v-touch class="content" @swipeleft="handleSwipe" @swiperight="handleSwipe" :swipe-options="{direction: 'horizontal', threshold: 100}">
      <router-view />
      <footer class="contentFooter">
        Catálogo Matcon 2019 - <a href="https://construe.cf" rel="catalogo" target="_blank">Construe</a>
        </footer>
    </v-touch>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
// import Chat from '@/components/Chat/Chat';

import './Layout.scss';

export default {
  name: 'Layout',
  components: { Sidebar, Header},
  data() {
    return {
      sidebarClose: false,
      sidebarStatic: true,
      windowWidth: window.screen.width,
    }
  },
  methods: {
    ...mapActions(
      'layout', ['switchSidebar', 'handleSwipe', 'changeSidebarActive'],
    ),
    handleWindowResize() {
      this.windowWidth = window.screen.width;
      if(this.windowWidth <= 767) {
        this.sidebarClose = true;
        this.sidebarStatic = false;
      } else {
        this.sidebarClose = false;
        this.sidebarStatic = true;
      }
    },
  },
  computed: {
    ...mapState('layout', {
      chatOpen: state => state.chatOpen,
    }),
  },
  created() {
    //
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this. handleWindowResize)
  },
  mounted() {
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize(window);
  },
};
</script>

<style src="./Layout.scss" lang="scss" />