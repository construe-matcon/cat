<template>
  <section>
    <h3 class="page-title">{{prod.id}} - <span class="fw-semi-bold">{{prod.descricao}}</span></h3>
    <b-tabs>
      <b-tab title="Geral" active>
        <b-row class="formProduto">
          <b-col lg="4" class="list-item">
            <img class="img-rounded imgCat" :src="'https://images.construe.cf/fogo/'+prod.ean+'.jpg'" alt="" />
            <!-- ADICIONAR IF PARA GALERIA AQUI -->
            <b-col lg="12" class="thumb-gal">
              <img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/fogo/'+prod.ean+'.jpg'" alt="" />
              <img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/fogo/'+prod.ean+'.jpg'" alt="" />
              <img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/fogo/'+prod.ean+'.jpg'" alt="" />
            </b-col>
            <!-- ADICIONAR IF PARA GALERIA AQUI -->
          </b-col>
          <b-col lg="8" class="list-item">
            <b-col lg="6" class="interno">
              <span>Nome: </span><span class="fw-semi-bold">{{prod.descricao}}</span><br>
              <span>Descrição Indústria: </span><span class="fw-semi-bold">{{prod.descricao_industria}}</span><br>
              <span>Marca: </span><span class="fw-semi-bold">{{prod.marca}}</span><br>
              <span>ID Marca: </span><span class="fw-semi-bold">{{prod.id_marca}}</span><br>
            </b-col>
            <b-col lg="6" class="interno">
              <template v-if="prod.preco">
                <span v-if="prod.preco.preco_capital">Preço Capital: </span><span class="fw-semi-bold" v-if="prod.preco.preco_capital">R$ {{prod.preco.preco_capital}}</span><br>
                <span v-if="prod.preco.preco_interior">Preço Interior: </span><span class="fw-semi-bold" v-if="prod.preco.preco_interior">R$ {{prod.preco.preco_interior}}</span><br>
                <span>Código Interno: </span><span class="fw-semi-bold">{{prod.codigo_interno}}</span><br>
                <span>ID: </span><span class="fw-semi-bold">{{prod.id}}</span><br>
              </template>
            </b-col>
            <hr>
            <b-col lg="6" class="interno">
              <span>Categoria: </span><span class="fw-semi-bold">{{prod.categoria}}</span><br>
              <span>ID Categoria: </span><span class="fw-semi-bold">{{prod.id_categoria}}</span><br>
              <span>Linha: </span><span class="fw-semi-bold">{{prod.linha}}</span><br>
              <span>ID Linha: </span><span class="fw-semi-bold">{{prod.id_linha}}</span><br>
              <span>EAN: </span><span class="fw-semi-bold">{{prod.ean}}</span><br>
              <span>NCM: </span><span class="fw-semi-bold">{{prod.ncm}}</span><br>
            </b-col>
            <b-col lg="6" class="interno">
              <template v-if="prod.tags">
                <span>Tags: </span><br>
                <span v-for="tags in prod.tags" :key="tags">
                  <span v-if="tags.length > 0" class="fw-semi-bold" style="text-transform: capitalize;">{{tags}}<br></span>
                </span>
              </template>
            </b-col>
            <hr>
            <b-col lg="6" class="interno">
              <span>Detalhes: </span><br>
              <template v-if="prod.detalhe.embalagem">
                <span v-if="prod.detalhe.embalagem.volume">Volume: </span><span class="fw-semi-bold" v-if="prod.detalhe.embalagem.volume">{{prod.detalhe.embalagem.volume}} {{prod.detalhe.embalagem.unidade_medida}}<br></span>
                <span v-if="prod.detalhe.embalagem.embalagem">Embalagem: </span><span class="fw-semi-bold" v-if="prod.detalhe.embalagem.embalagem">{{prod.detalhe.embalagem.embalagem}}<br></span>
                <span v-if="prod.detalhe.embalagem.rendimento">Rendimento: </span><span class="fw-semi-bold" v-if="prod.detalhe.embalagem.rendimento">{{prod.detalhe.embalagem.rendimento}}<br></span>
                <span v-if="prod.detalhe.embalagem.embalagem_embarque != ''">Embalagem Embarque: </span><span class="fw-semi-bold" v-if="prod.detalhe.embalagem.embalagem_embarque">{{prod.detalhe.embalagem.embalagem_embarque}}</span><br>
                <span v-if="prod.detalhe.sku_embarque != ''">SKU Embarque: </span><span class="fw-semi-bold" v-if="prod.detalhe.sku_embarque">{{prod.detalhe.sku_embarque}}</span><br>
                <span v-if="prod.detalhe.gtin">GTIN: </span><span class="fw-semi-bold" v-if="prod.detalhe.gtin">{{prod.detalhe.gtin}}<br></span>
              </template>
            </b-col>
            <b-col lg="6" class="interno">
              <span>Tamanho Embalagem Embarque: </span><br>
              <template v-if="prod.detalhe.embalagem">
                <span v-if="prod.detalhe.altura_embalagem_embarque != ''">Altura: </span><span class="fw-semi-bold" v-if="prod.detalhe.altura_embalagem_embarque">{{prod.detalhe.altura_embalagem_embarque}}</span><br>
                <span v-if="prod.detalhe.largura_embalagem_embarque != ''">Largura: </span><span class="fw-semi-bold" v-if="prod.detalhe.largura_embalagem_embarque">{{prod.detalhe.largura_embalagem_embarque}}</span><br>
                <span v-if="prod.detalhe.profundidade_embalagem_embarque != ''">Profundidade: </span><span class="fw-semi-bold" v-if="prod.detalhe.profundidade_embalagem_embarque">{{prod.detalhe.profundidade_embalagem_embarque}}</span><br>
                <span v-if="prod.detalhe.peso_embalagem_embarque != ''">Peso: </span><span class="fw-semi-bold" v-if="prod.detalhe.peso_embalagem_embarque">{{prod.detalhe.peso_embalagem_embarque}}</span><br>
              </template>
            </b-col>
            <hr>
          </b-col>
          <b-col lg="12" class="list-item">
            <b-col lg="2" class="interno">
              <span v-if="prod.detalhe.atributo.grupo_produto != ''">Grupo do Produto: </span><span class="fw-semi-bold" v-if="prod.detalhe.atributo.grupo_produto">{{prod.detalhe.atributo.grupo_produto}}</span>
            </b-col>
            <b-col lg="2" class="interno">
              <span v-if="prod.detalhe.atributo.perfil_compra != ''">Perfil de Compra: </span><span class="fw-semi-bold" v-if="prod.detalhe.atributo.perfil_compra">{{prod.detalhe.atributo.perfil_compra}}</span>
            </b-col>
            <b-col lg="2" class="interno">
              <span v-if="prod.detalhe.atributo.cor != ''">Cor: </span><span class="fw-semi-bold" v-if="prod.detalhe.atributo.cor">{{prod.detalhe.atributo.cor}}</span>
            </b-col>
            <b-col lg="2" class="interno">
              <span v-if="prod.detalhe.atributo.codigo_cor != ''">Código Cor: </span><span class="fw-semi-bold" v-if="prod.detalhe.atributo.codigo_cor">{{prod.detalhe.atributo.codigo_cor}}</span>
            </b-col>
            <b-col lg="2" class="interno">
              <span v-if="prod.detalhe.atributo.relevancia_pedido_certo != ''">Relevância Pedido Certo: </span><span class="fw-semi-bold" v-if="prod.detalhe.atributo.relevancia_pedido_certo">{{prod.detalhe.atributo.relevancia_pedido_certo}}</span>
            </b-col>
          </b-col>
          <b-col lg="12" class="list-item">
            <b-col lg="2" class="interno">
              <span>Tributação: </span><br>
              <span v-if="prod.detalhe.tributacao.ipi != ''">IPI: </span><span class="fw-semi-bold" v-if="prod.detalhe.tributacao.ipi">{{prod.detalhe.tributacao.ipi}}<br></span>
              <span v-if="prod.detalhe.tributacao.st != ''">ST: </span><span class="fw-semi-bold" v-if="prod.detalhe.tributacao.st">{{prod.detalhe.tributacao.st}}</span>
            </b-col>
          </b-col>
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
        ,   dados = JSON.parse(window.localStorage.getItem("account"))
        ,   url    = "https://api.construe.cf/produtos/"+that.$route.query.id

        fetch(url, {
            headers: {
              'Accept': 'application/json',
              'Authorization': dados.token
            }
          }).then(function(response){
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
