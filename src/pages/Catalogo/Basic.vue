<template>
  <div class="tables-basic">
    <h2 class="page-title">Catálogo - <span class="fw-semi-bold">Produtos</span></h2>
    <b-row>
      <b-col>
        <Widget>
          <div class="table-resposive table-hover">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#</th>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th class="hidden-sm-down">Info</th>
                  <th class="hidden-sm-down">Data</th>
                  <th class="hidden-sm-down">Peso</th>
                  <th class="hidden-sm-down">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in tableStyles" :key="row.id">
                  <td>{{row.id}}</td>
                  <td>
                    <img class="img-rounded" :src="row.picture" :alt="row.description" width="100" />
                  </td>
                  <td>
                    {{row.description}}
                    <div v-if="row.label">
                      <b-badge :variant="row.label.colorClass">{{row.label.text}}</b-badge>
                    </div>
                  </td>
                  <td>
                    <p class="mb-0">
                      <small>
                        <span class="fw-semi-bold">Tipo:</span>
                        <span class="text-muted">&nbsp; {{row.info.type}}</span>
                      </small>
                    </p>
                    <p>
                      <small>
                        <span class="fw-semi-bold">Dimensão:</span>
                        <span class="text-muted">&nbsp; {{row.info.dimensions}}</span>
                      </small>
                    </p>
                  </td>
                  <td class="text-semi-muted">
                    {{parseDate(row.date)}}
                  </td>
                  <td class="text-semi-muted">
                    {{row.size}}
                  </td>
                  <td class="width-150">
                    <b-progress
                      :variant="row.progress.colorClass" :value="row.progress.percent" :max="100"
                      class="progress-sm mb-xs"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <div class="clearfix">
            <div class="float-right">
              <b-button variant="default" class="mr-xs" size="sm">Send to...</b-button>
              <b-dropdown variant="inverse" class="mr-xs" size="sm" text="Clear" right>
                <b-dropdown-item>Clear</b-dropdown-item>
                <b-dropdown-item>Move ...</b-dropdown-item>
                <b-dropdown-item>Something else here</b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item>Separated link</b-dropdown-item>
              </b-dropdown>
            </div>
            <p>Basic table with styled content</p>
          </div> -->
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import $ from 'jquery';
import Vue from 'vue';
import Widget from '@/components/Widget/Widget';
import 'imports-loader?jQuery=jquery,this=>window!jquery-sparkline'; // eslint-disable-line

export default {
  name: 'Catalogo',
  components: { Widget },
  data() {
    return {
      tableStyles: [],
    };
  },
  methods: {
    parseDate(date) {
      const dateSet = date.toDateString().split(' ');
      return `${date.toLocaleString('en-us', { month: 'short' })} ${dateSet[2]}, ${dateSet[3]}`;
    },
    checkAll(ev, checkbox) {
      const checkboxArr = (new Array(this[checkbox].length)).fill(ev.target.checked);
      Vue.set(this, checkbox, checkboxArr);
    },
    changeCheck(ev, checkbox, id) {
      this[checkbox][id] = ev.target.checked;
      if (!ev.target.checked) {
        this[checkbox][0] = false;
      }
    },
    getRandomData() {
      const result = [];

      for (let i = 0; i <= 8; i += 1) {
        result.push(Math.floor(Math.random() * 20) + 1);
      }


      return result;
    },
    initCharts() {
      const colors = ['#547fff', '#9964e3', '#f55d5d', '#ffc247', '#3abf94'];

      $.each($('.sparkline-chart'), (id, chart) => {
        $(chart).sparkline(this.getRandomData(), {
          type: 'bar',
          barColor: colors[Math.floor(Math.random() * colors.length)],
        });
      });
    },
    fetchUrl(){
    	var that = this
			, 	url 	 = "https://images.construe.cf/listaImagens"

			console.log(that.tableStyles)

		  fetch(url).then(function(response){
				response.json().then(function(data){
					var ran = data.sort(() => .5 - Math.random()).slice(0,20)
					for(var i = 0, lgt = ran.length; i < lgt; i++) {
						that.tableStyles[i] = {
							id: ran[i].replace(/\D/g, '').slice(-5),
		          picture: 'https://images.construe.cf/hidrobuk/'+ran[i],
		          description: ran[i].split('.').slice(0, -1).join('.'),
		          info: {
		          	type: ran[i].split('.').pop(),
            		dimensions: '200x150',
		          },
		          date: new Date('September 14, 2012'),
		          size: '45.6 KB',
		          progress: {
		            percent: 29,
		            colorClass: 'success',
		          },
						}
					}
					console.log(that.tableStyles)
				});
			}).catch(function(err){
				console.error('Erro na chamada', err);
			});
	  }
  },
  mounted() {
    this.initCharts();
  	this.fetchUrl();
  },
};
</script>

<style src="./Basic.scss" lang="scss" scoped />





