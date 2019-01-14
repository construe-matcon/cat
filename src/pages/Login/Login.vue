<template>
  <div class="login-page">
    <b-container>
      
      <h5 class="logo">
        <img :src="icon.picture" alt="Construe" class="icon-title">
      </h5>
      <Widget class="mx-auto" title="<h3 class='mt-0'>Faça login para continuar</h3>" customHeader>
        <!-- <p class="text-muted mb-0 mt fs-sm">
          Use Facebook, Twitter or your email to sign in.
        </p>
        <p class="text-muted fs-sm">
          Don't have an account? Sign up now!
        </p> -->
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
              <!-- <b-button type="reset" size="sm" variant="default">Create an Account</b-button> -->
              <b-button type="submit" size="sm" variant="inverse">Entrar</b-button>
            </div>
          </div>
          <!-- <div class="row no-gutters mt-3">
            <div class="col">
              <div class="abc-checkbox">
                <input
                  type="checkbox"
                  id="checkbox"
                />
                <label for="checkbox" class="text-muted fs-sm">Mantenha Conectado</label>
              </div>
            </div>
            <div class="col">
              <a class="mt-sm" href="">Trouble with account?</a>
            </div>
          </div> -->
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
      icon: {
        picture: require('../../assets/img/construe.png'), // eslint-disable-line global-require
      },
      errorMessage: null,
    };
  },
  methods: {
    login(){
      if(this.input.username != "" && this.input.password != ""){
        if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
          this.$emit("authenticated", true);
          window.localStorage.setItem('authenticated', true);
          this.$router.push('/dashboard');
        } else {
          alert('Nome de usuário ou senha inválidos')
        }
      } else {
        alert('É obrigatório preencher usuário e senha')
      }
    }
    // login() {
    //   const username = this.$refs.username.value;
    //   const password = this.$refs.password.value;

    //   if (username.length !== 0 && password.length !== 0) {
    //     window.localStorage.setItem('authenticated', true);
    //     this.$router.push('/dashboard');
    //   }
    // },
  },
  // created() {
  //   if (window.localStorage.getItem('authenticated') === 'true') {
  //     this.$router.push('/dashboard');
  //   }
  // },
};
</script>

<style lang="scss" scoped>
  @import './Login.scss';
</style>
