<template>
  <router-view />
</template>
<script>
export default {
  name: 'App',
  data(){
    return {
      authenticated: false,
      mockAccount: {
        username: "admin",
        password: "admin"
      }
    }
  },
  mounted() {
    // if(!this.authenticated) {
    //   this.$router.push('/login');
    // }
  },
  methods: {
    // setAuthenticated(status) {
    //   this.authenticated = status;
    // },
    // logout(){
    //   this.authenticated = false;
    // }
  },
  // created() {
  //   const currentPath = this.$router.history.current.path;
  //   if (window.localStorage.getItem('authenticated') === 'false') {
  //     this.$router.push('/login');
  //   }
  //   if (currentPath === '/') {
  //     this.$router.push('/dashboard');
  //   }
  // },
};
</script>

<style src="./styles/theme.scss" lang="scss" />
