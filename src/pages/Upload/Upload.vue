<template>
  <section>
    <h3 class="page-title">Upload de <span class="fw-semi-bold">arquivos</span></h3>
    <b-tabs>
      <b-tab title="Importar" active>
        <b-row class="formProduto">
          <b-col lg="12" class="list-item">
            <div class="selInd">
              <b-form-select v-model="selected" :options="selectInds" @change="getVal" class="mb-3" >
                <option :value="null">Por favor selecione uma indústria antes de começar</option>
              </b-form-select>

              <strong>{{ selected }}</strong>
            </div>
            <vue-dropzone ref="myVueDropzone" id="dropzone"
              :options="dropzoneOptions"
              :useCustomSlot=true
              :duplicateCheck=true
              @vdropzone-max-files-reached="vMax"
              @vdropzone-error="vError"
              @vdropzone-file-added="vAdd"
              @vdropzone-upload-progress="vProgress"
              @vdropzone-queue-complete="vComplete"
              @vdropzone-success="vSuccess"
              >
              <div class="dropzone-custom-content">
                <h3 class="dropzone-custom-title">Arraste aqui seu arquivo</h3>
                <div class="subtitle">...ou clique para selecionar do seu computador</div>
              </div>
            </vue-dropzone>
            <b-col class="status">
              <div v-if="max">
                <b-alert :show="dismissCountDown" fade @dismissed="dismissCountDown=0" variant="warning">Você atingiu o limite máximo de 1 arquivo</b-alert>
              </div>
              <b-progress
                v-show="dis"
                :value="prog"
                :variant="(prog > 75 ? 'success' : (prog >= 50 && prog <= 75 ? 'warning' : 'danger'))"
                :title="prog+'%'"
                :animated="animate"
                striped
                show-value
                :label="prog"
              />
              <div class="alertas">
                <b-alert
                  v-show="err"
                  show
                  variant="danger">
                  Ocorreu um erro ao enviar o arquivo <span class="fw-semi-bold">{{nome}}</span>
                  <br>
                  Mensagem de erro: <span class="fw-semi-bold">{{error.msg}}</span>
                </b-alert>
                <b-alert v-show="ok" show variant="success">O arquivo <span class="fw-semi-bold">{{status.name}}</span> foi enviado com sucesso!</b-alert>
              </div>
              <button v-show="add" @click="vSend">Enviar</button>
            </b-col>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import gfn from '@/core/globalFunctions';


export default {
    name: 'Upload',
    components: {
      vueDropzone: vue2Dropzone
    },
    data() {
      return {
        prod: [],
        selectInds: [],
        selected: null,
        dismissCountDown: 1.5,
        animate: true,
        idPost: '',
        dropzoneOptions: {
          url: 'https://api.construe.cf/importacao/produtos/21',
          thumbnailWidth: 200,
          // addRemoveLinks: true,
          maxFilesize: 200,
          maxFiles: 1,
          thumbnail: false,
          autoProcessQueue: false,
          acceptedFiles: ".xls,.xlsx",
          headers: { "Content-type": "application/json; charset=UTF-8", 'Authorization': JSON.parse(window.localStorage.getItem("account")).token }
        },
        status: {},
        error: {},
        nome: '',
        err: false,
        max: false,
        dis: false,
        add: false,
        ok: false,
        prog: 0,
        byte: 0,
      };
    },
    methods: {
      getVal(value){
        this.idPost = value
      },
      fetchCat(obj){
        var ind      = obj.data
        ,   dadosInd = []

        for (var i = 0, lgt = ind.length; i < lgt; i++ ) {
          dadosInd.push({
            "text": ind[i].nome,
            "value": ind[i].id
          })
        }
        this.selectInds = dadosInd;
      },
      fetchHist(obj){
        console.log(obj)
      },
      vAdd(file){
        this.add = true
        this.nome = file.name
      },
      vError(file, msg, xhr){
        this.err = true

        this.error = {
          file,
          msg,
          xhr
        }
      },
      vProgress(file, progress, bytesSent){
        this.dis = true
        this.prog = progress
        this.byte = bytesSent
      },
      vMax(){
        this.max = true
      },
      vSend(){
        this.$refs.myVueDropzone.processQueue()
      },
      vComplete(){
        this.$refs.myVueDropzone.disable()

        this.dis = false
      },
      vSuccess(file){
        this.status = file
        this.ok = true
      }
      // fetchUrl(){
      //   var that = this
      //   ,   dados = JSON.parse(window.localStorage.getItem("account"))
      //   ,   url    = "https://api.construe.cf/produtos/"

      //   fetch(url, {
      //       headers: {
      //         'Accept': 'application/json',
      //         'Authorization': dados.token
      //       }
      //     }).then(function(response){
      //     response.json().then(function(data){
      //       console.log(data)
      //     });
      //   }).catch(function(err){
      //     console.error('Erro na chamada', err);
      //   });
      // },
    },
    async mounted() {
      await gfn.fApi({url:"https://api.construe.cf/industrias?tamanho_pagina=200", options: {method: 'GET'}}, this.fetchCat);
      await gfn.fApi({url:"https://api.construe.cf/importacao/produtos/19", options: {method: 'GET'}}, this.fetchHist);
    },
  };
</script>

<style src="./Upload.scss" lang="scss" scoped />
