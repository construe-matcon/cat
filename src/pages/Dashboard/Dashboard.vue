<template>
  <div>
    <h1 class="page-title">Dashboard</h1>
    <h5 class="page-title"><small>Última atualização: <span class='fw-semi-bold'>{{date}}</span></small></h5>

    <b-row>
      <b-col v-for="gra in listCat" class="min" v-bind:key="gra.id">
        <div class="pb-xlg h-100 pointer" @click="clickGraph()">
          <Widget class="h-100 mb-0" :title='"Top 15 Lojas que venderam "+gra.nome'>
            <b-row>
              <canvas :id='"industria"+gra.id' height="350"></canvas>
            </b-row>
          </Widget>
        </div>
      </b-col>
    </b-row>


    <b-row>
      <b-col class="min">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Produtos Sem Categoria">
            <b-row>
              <canvas id="piechart0" height="350"></canvas>
            </b-row>
          </Widget>
        </div>
      </b-col>
      <b-col class="min">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Produtos Sem Tags">
            <b-row>
              <canvas id="piechart1" height="350"></canvas>
            </b-row>
          </Widget>
        </div>
      </b-col>
      <b-col class="min">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Produtos Sem EAN">
            <b-row>
              <canvas id="piechart2" height="350"></canvas>
            </b-row>
          </Widget>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col xs="12" lg="6">
        <Widget
          title="<h5>Total de produtos por <span class='fw-semi-bold'>indústria</span></h5>"
          bodyClass="widget-table-overflow"
          customHeader>
          <div class="table-responsive">
            <canvas id="barchart1" height="350"></canvas>
          </div>
        </Widget>
      </b-col>
      <b-col xs="12" lg="6">
        <Widget
          title="<h5>Total de produtos por <span class='fw-semi-bold'>indústria</span></h5>"
          bodyClass="widget-table-overflow"
          customHeader>
          <div class="table-responsive">
            <canvas id="barchart2" height="350"></canvas>
          </div>
        </Widget>
      </b-col>
    </b-row>
    <!-- <b-row>
      <b-col lg="4" sm="6" xs="12">
        <Widget
          title="<h5 class='d-flex align-items-center pb-1'>
            <span class='circle bg-primary mr-sm' style='font-size: 6px;'></span>
            Statistic<span class='fw-normal ml-xs'>Light Blue</span>
          </h4>"
          bodyClass="p-0 mt"
          customHeader
        >
          <h4 class="fw-semi-bold ml-lg mb-lg">4,232</h4>
          <div class="d-flex border-top">
            <div class="w-50 border-right p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>+830</h6>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Registrations</small>
              </p>
            </div>
            <div class="w-50 p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>4.5%</h6>
                <i class="la la-arrow-right text-danger rotate-45" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Bounce Rate</small>
              </p>
            </div>
          </div>
        </Widget>
      </b-col>
      <b-col lg="4" sm="6" xs="12">
        <Widget
          title="<h5 class='d-flex align-items-center pb-1'>
            <span class='circle bg-warning mr-sm' style='font-size: 6px;'></span>
            Statistic<span class='fw-normal ml-xs'>Sing App</span>
          </h4>"
          bodyClass="p-0 mt"
          customHeader
        >
          <h4 class="fw-semi-bold ml-lg mb-lg">754</h4>
          <div class="d-flex border-top">
            <div class="w-50 border-right p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>+30</h6>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Registrations</small>
              </p>
            </div>
            <div class="w-50 p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>2.5%</h6>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Bounce Rate</small>
              </p>
            </div>
          </div>
        </Widget>
      </b-col>
      <b-col lg="4" sm="6" xs="12">
        <Widget
          title="<h5 class='d-flex align-items-center pb-1'>
            <span class='circle bg-warning mr-sm' style='font-size: 6px;'></span>
            Statistic<span class='fw-normal ml-xs'>RNS</span>
          </h4>"
          bodyClass="p-0 mt"
          customHeader
        >
          <h4 class="fw-semi-bold ml-lg mb-lg">1,025</h4>
          <div class="d-flex border-top">
            <div class="w-50 border-right p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>+230</h6>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Registrations</small>
              </p>
            </div>
            <div class="w-50 p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>21.5%</h6>
                <i class="la la-arrow-right text-danger rotate-45" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Bounce Rate</small>
              </p>
            </div>
          </div>
        </Widget>
      </b-col>
    </b-row> -->
  </div>
</template>

<script>
import $ from 'jquery';
/* eslint-disable */
import 'imports-loader?jQuery=jquery,this=>window!flot';
import 'imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie';
/* eslint-enable */
import Widget from '@/components/Widget/Widget';
/* ChartJS */
import Chart from 'chart.js';

import gfn from '@/core/globalFunctions';


export default {
  name: 'Dashboard',
  components: { Widget },
  data() {
    return {
      date: [],
      listCat: [],
      teste: [],
    };
  },
  methods: {
    clickGraph(){
      console.log('Clicou no Gráfico')
    },
    getRandomData() {
      const arr = [];

      for (let i = 0; i < 25; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }

      return arr;
    },
    getData() {
      const data = [];
      const seriesCount = 3;
      const accessories = ['SMX', 'Direct', 'Networks'];

      for (let i = 0; i < seriesCount; i += 1) {
        data.push({
          label: accessories[i],
          data: Math.floor(Math.random() * 100) + 1,
        });
      }

      return data;
    },
    initChart() {
      $.plot(this.$refs.chartContainer, this.getData(), {
        series: {
          pie: {
            innerRadius: 0.8,
            show: true,
            fill: 0.5,
          },
        },
        colors: ['#ffc247', '#f55d5d', '#9964e3'],
        legend: {
          noColumns: 1,
          container: this.$refs.chartLegend,
          labelBoxBorderColor: '#ffffff',
        },
      });
    },
    startCharts(type, idEl, label, datax,displayLegend=true) {
      var el = document.getElementById(idEl).getContext('2d')
      var graph;

      if (type == 'pie') {
        graph = {
          type: type,
          data:datax,
          options: {
            legend: {
              display: displayLegend,
              position: 'bottom',
              "ticks": {
                "beginAtZero": true
              },
            },
            scales: {
              xAxes: [{
                  ticks: {
                    display: false
                  },
                  gridLines: {
                      drawBorder: false,
                      display: false
                  }
              }],
              yAxes: [{
                  ticks: {
                    display: false
                  },
                  gridLines: {
                      drawBorder: false,
                      display: false
                  }
              }]
            }
          }
        }
      } else if (type == 'horizontalBar') {
        graph = {
          type: type,
          data:{},
          options: {
            legend: {
              display: displayLegend,
              position: 'bottom',
              "ticks": {
                "beginAtZero": true
              },
            },
            scales: {
              xAxes: [{
                  ticks: {
                    display: true
                  },
                  gridLines: {
                      drawBorder: true,
                      display: true
                  }
              }],
              yAxes: [{
                  ticks: {
                    display: true
                  },
                  gridLines: {
                      drawBorder: true,
                      display: true
                  }
              }]
            }
          }
        }
      } else if (type == 'bar') {
        graph = {
          type: type,
          data: datax,
          options: {
            legend: {
              display: displayLegend,
              position: 'bottom',
              "ticks": {
                "beginAtZero": true
              },
            },
            scales: {
              xAxes: [{
                  ticks: {
                    display: false
                  },
                  gridLines: {
                      drawBorder: true,
                      display: true
                  }
              }],
              yAxes: [{
                  ticks: {
                    display: true
                  },
                  gridLines: {
                      drawBorder: true,
                      display: true
                  }
              }]
            }
          }
        }
      } else {
        graph = {
          type: type,
          data: datax,
          options: {
            legend: {
              display: displayLegend,
              position: 'bottom',
              "ticks": {
                "beginAtZero": true
              },
            },
            scales: {
              xAxes: [{
                  ticks: {
                    display: false
                  },
                  gridLines: {
                      drawBorder: true,
                      display: true
                  }
              }],
              yAxes: [{
                  ticks: {
                    display: true
                  },
                  gridLines: {
                      drawBorder: true,
                      display: true
                  }
              }]
            }
          }
        }
      }

      return new Chart(el,graph) // End Pie Chart

    },
    rds(arr) {
      var seen = {};
      var ret_arr = [];
      for (var i = 0; i < arr.length; i++) {
          if (!(arr[i] in seen)) {
              ret_arr.push(arr[i]);
              seen[arr[i]] = true;
          }
      }
      return ret_arr;
    },
    getRandomRgb() {
      var num = Math.round(0xffffff * Math.random());
      var r = num >> 16;
      var g = num >> 8 & 255;
      var b = num & 255;
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    },
    addData(chart, label, bgColor, dados) {
        chart.data.datasets.push({
          label: label,
          backgroundColor: bgColor,
          data: dados,
        });
        chart.update();
    },
    fetchUrl(obj){
      var arrI = {'labels':["Total", "Sem categoria"],'datasets':[{'data':[],'backgroundColor':['rgba(237,123,0, 0.8)','rgba(97,201,184, 0.8)'],'borderColor':['transparent'],'borderWidth':[]}]};

      for (var a = 0, lgtt = 3; a < lgtt; a++ ) {
        arrI.datasets[0].data = []
        if (a == 0) {
          arrI.datasets[0].data.push(obj.qtd_total_produto, obj.qtd_produto_sem_categoria)
        } else if (a == 1) {
          arrI.datasets[0].data.push(obj.qtd_total_produto, obj.qtd_produto_sem_tag)
        } else if (a == 2) {
          arrI.datasets[0].data.push(obj.qtd_total_produto, obj.qtd_produto_sem_ean)
        }
        this.startCharts('pie', 'piechart'+a,'',arrI, true);
      }


      this.date = gfn.formatDate(obj.ultimas_importacoes[0].dt_inclusao);
      var inds = obj.ultimas_importacoes;
      var colors = ['rgba(97,201,184, 0.8)','rgba(23,137,126, 0.8)','rgba(237,95,0, 0.8)','rgba(237,123,0, 0.8)','rgba(250,168,0, 0.8)'] //Com azul
      this.barChart1 = new this.startCharts('bar', 'barchart1','',[]);
      this.barChart2 = new this.startCharts('bar', 'barchart2','',[]);

      for (var i = 0, lgt = inds.length; i < lgt; i++ ) {
        var ind = inds[i].industria
        ,   qtT = inds[i].qtd_total_produtos
        this.listCat.push({id:inds[i].id_industria,nome:inds[i].industria})

        this.addData(this.barChart1, ind, colors[i], [qtT])
        this.addData(this.barChart2, ind, colors[i], [qtT])
      }

      this.fetchIds(this.listCat)
    },
    async fetchIds(ids){
      for (var i = 0, lgt = ids.length; i < lgt; i++) {
        await gfn.fApi({url:"https://api.construe.cf/dashboard?id_industria="+ids[i].id, options: {method: 'GET'}}, this.montaGraf);
      }
    },
    montaGraf(obj) {
      // console.log(obj)
      var lojas = obj.lojas_compram_industria.slice(0,15)
      // this.startCharts('pie', 'industria'+obj.ultimas_importacoes[0].id_industria,["Total de produtos", "Total de produtos associados"],[obj.qtd_total_produto,obj.qtd_produto_sellout_associado_catalogo]);

      var sellOut = {'labels':[],'datasets':[{'data':[],'pointBackgroundColor':'rgba(237,123,0, 1)','fill':true, 'backgroundColor':'rgba(97,201,184, 0.4)' }]}

      for (var i = 0, lgt = lojas.length; i < lgt; i++ ) {
        sellOut.labels.push(((/\s*-\s\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}/).test(lojas[i].razao_social) ? lojas[i].razao_social.substr(0, lojas[i].razao_social.length - 20) : lojas[i].razao_social))
        sellOut.datasets[0].data.push(lojas[i].qtd_produtos_industria)
        // sellOut.datasets[0].pointBackgroundColor.push(this.getRandomRgb())
      }
      this.startCharts('line', 'industria'+obj.ultimas_importacoes[0].id_industria,'',sellOut,false);


      // {
      //       labels: label,
      //       datasets: [{
      //           data: datax,
      //           backgroundColor: [
      //               'rgba(237,123,0, 0.8)',
      //               'rgba(97,201,184, 0.8)',
      //           ],
      //       }]
      //     },
      // this.startCharts('bar', 'industria'+obj.ultimas_importacoes[0].id_industria,'',sellOut);
    },
  },
  async mounted() {
    window.addEventListener('resize', this.initChart);
    await gfn.fApi({url:"https://api.construe.cf/dashboard", options: {method: 'GET'}}, this.fetchUrl);
  },
  created() {
  }
};
</script>

<style src="./Dashboard.scss" lang="scss" scoped />
