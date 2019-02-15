<template>
  <section>
    <h3 class="page-title">Upload de <span class="fw-semi-bold">arquivos</span></h3>
    <b-tabs>
      <b-tab title="Importar" active>
        <b-row class="formProduto">
          <b-col lg="12" class="list-item">
            <div class="selInd">
              <b-form-select v-model="selected" :options="selectInds" @change="getVal" class="mb-3" />
            </div>
            <template v-if="dropzoneOptions">
              <vue-dropzone v-show="drop" ref="myVueDropzone" id="dropzone"
                :options="dropzoneOptions"
                :useCustomSlot=true
                :duplicateCheck=true
                @vdropzone-max-files-reached="vMax"
                @vdropzone-error="vError"
                @vdropzone-file-added="vAdd"
                @vdropzone-upload-progress="vProgress"
                @vdropzone-queue-complete="vComplete"
                @vdropzone-success="vSuccess"
                @vdropzone-sending="vBefore"
                >
                <div class="dropzone-custom-content">
                  <h3 class="dropzone-custom-title">Arraste aqui seu arquivo</h3>
                  <div class="subtitle">...ou clique para selecionar do seu computador</div>
                </div>
              </vue-dropzone>
            </template>
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
              <b-button variant="outline-success" v-show="add" @click="vSend">Enviar</b-button>
            </b-col>
          </b-col>
        </b-row>
        <b-row v-show="drop">
          <b-col>
            <h4 class="page-title">Histórico de importações de <span class="fw-semi-bold">{{nomeInd}}</span></h4>
            <b-table striped responsive hover bordered :items="hist" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"></b-table>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
import $ from 'jquery';
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
        sortBy: "id",
        sortDesc: true,
        prod: [],
        selectInds: [],
        selected: null,
        dismissCountDown: 1.5,
        animate: true,
        idPost: '',
        dropzoneOptions: {
          url: 'https://api.construe.cf/importacao/produtos/',
          thumbnailWidth: 200,
          // addRemoveLinks: true,
          maxFilesize: 200,
          maxFiles: 1,
          thumbnail: false,
          autoProcessQueue: false,
          acceptedFiles: ".xls,.xlsx",
          headers: { "Content-type": "application/json; charset=UTF-8",  'Authorization': JSON.parse(window.localStorage.getItem("account")).token }
        },
        status: {},
        error: {},
        nome: '',
        err: false,
        max: false,
        dis: false,
        add: false,
        ok: false,
        drop: false,
        prog: 0,
        byte: 0,
        nomeInd: '',
        hist: [],
        fields: {
          id: {
            label: 'ID',
            sortable: true,
          },
          nome: {
            label: 'Nome do arquivo',
            sortable: false
          },
          qtIn: {
            label: 'Itens Inseridos',
            sortable: true
          },
          qtAt: {
            label: 'Itens Atualizados',
            sortable: true
          },
          user: {
            label: 'Usuário que importou',
            sortable: false
          },
          data: {
            label: 'Data da importação',
            sortable: true
          }
        }
      };
    },
    methods: {
      async getVal(value){

        var newURL = 'https://api.construe.cf/importacao/produtos/'+value
        this.$refs.myVueDropzone.options.url = newURL
        this.$refs.myVueDropzone.dropzone.options.url = newURL
        this.dropzoneOptions.url = newURL
        await gfn.fApi({url:"https://api.construe.cf/importacao/produtos/"+value, options: {method: 'GET'}}, this.fetchHist);

        this.idPost = value
        this.drop = true;


        if ($('.selInd option:selected').attr('value') === 'null') {
          this.drop = false;
        } else {
          this.nomeInd = $('.selInd option:selected').text()
        }

      },
      fetchCat(obj){
        var ind      = obj.data
        this.selectInds.push({
          "text": 'Por favor selecione uma indústria antes de começar',
          "value": 'null'
        })
        for (var i = 0, lgt = ind.length; i < lgt; i++ ) {
          this.selectInds.push({
            "text": ind[i].nome,
            "value": ind[i].id
          })
        }
      },
      fetchHist(obj){
        var dt = obj.data
        this.hist = []

        for (var i = 0, lgt = dt.length; i < lgt; i++ ) {
          this.hist.push({
            'id': dt[i].id,
            'nome': dt[i].nome_arquivo,
            'qtIn': dt[i].qtd_inseridos,
            'qtAt': dt[i].qtd_atualizados,
            'user': dt[i].usuario,
            'data': gfn.formatDate(dt[i].dt_inclusao),
            'ind':  dt[i].industria,
          })
        }
      },
      vAdd(file){
        this.nome = file.name

        if (file.name.toLowerCase().indexOf($('.selInd option:selected').text().toLowerCase()) < 0 ) {
          this.add = false
          alert('O arquivo escolhido não tem o mesmo nome da indústria selecionada.')
          this.$refs.myVueDropzone.removeFile(file)
        } else {
          this.add = true
        }
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
      vBefore(file, xhr, formData){
        formData.append('arquivo', file)

        console.log(JSON.stringify(formData))
      },
      vSend(){
        this.$refs.myVueDropzone.processQueue()
      },
      vComplete(){
        // this.$refs.myVueDropzone.disable()

        this.dis = false
      },
      vSuccess(file){
        this.status = file
        this.ok = true
      },
    },
    async mounted() {
      await gfn.fApi({url:"https://api.construe.cf/industrias?tamanho_pagina=200", options: {method: 'GET'}}, this.fetchCat);
    },
  };
</script>

<style src="./Upload.scss" lang="scss" scoped />
