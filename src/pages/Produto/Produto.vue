<template>
  <section>
    <h3 class="page-title">ID - <span class="fw-semi-bold">Nome Produto</span></h3>
    <b-tabs>
      <b-tab title="Geral" active>
        <b-row class="formProduto">
          <b-col lg="4" class="list-item">
            <img class="img-rounded imgCat" :src="'https://images.construe.cf/hidrobuk/'+prod.ean+'.jpg'" alt="" />
          </b-col>
          <b-col lg="8" class="list-item">
            <b-col lg="6" class="interno">
              <span>Nome: </span><span class="fw-semi-bold">{{prod.descricao}}</span><br>
              <span>Nome: </span><span class="fw-semi-bold">{{prod.descricao_industria}}</span><br>
            </b-col>
            <b-col lg="6" class="interno">
              <template v-if="prod.preco">
                <span v-if="prod.preco.preco_capital">Preço Capital: </span><span class="fw-semi-bold" v-if="prod.preco.preco_capital">R$ {{prod.preco.preco_capital}}</span><br>
                <span v-if="prod.preco.preco_interior">Preço Interior: </span><span class="fw-semi-bold" v-if="prod.preco.preco_interior">R$ {{prod.preco.preco_interior}}</span><br>
              </template>
            </b-col>
          </b-col>
          <b-col lg="12" class="list-item"></b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
export default {
    name: 'Produto',
    data() {
      return {
        prod: [],
      };
    },
    methods: {
      fetchUrl(){
        var that = this
        ,   url    = "https://api.construe.cf/produtos/"+that.$route.query.id

        fetch(url).then(function(response){
          response.json().then(function(data){
            var ran = data
            that.prod = ran;
            console.log(that.prod)
          });
        }).catch(function(err){
          console.error('Erro na chamada', err);
        });
      },
    },
    mounted() {
      this.fetchUrl();
    },
  };
</script>

<style src="./Produto.scss" lang="scss" scoped />
