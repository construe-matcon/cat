<template>
  <div>
    <h1 class="page-title">Catálogo</h1>
    <h5 class="page-title"><small>Última atualização: {{date}}</small></h5>
    <b-row>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Produtos Sem Categoria">
            <b-row>
              <canvas id="piechart" width="80" height="80"></canvas>
            </b-row>
          </Widget>
        </div>
      </b-col>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Produtos Sem Tags">
            <b-row>
              <canvas id="piechart2" width="80" height="80"></canvas>
            </b-row>
          </Widget>
        </div>
      </b-col>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Produtos Sem EAN">
            <b-row>
              <canvas id="piechart3" width="80" height="80"></canvas>
            </b-row>
          </Widget>
        </div>
      </b-col>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Total de produtos por indústria">
            <b-row>
              <canvas id="barchart1" width="80" height="80"></canvas>
            </b-row>
          </Widget>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col xs="12">
        <Widget
          title="<h5>Support <span class='fw-semi-bold'>Requests</span></h5>"
          bodyClass="widget-table-overflow"
          customHeader
        >
          <div class="table-responsive">
            <table class="table table-lg mb-0">
              <thead>
                <tr class="text-muted">
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>DATE</th>
                  <th>CITY</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in table"
                  :key="row.id"
                >
                  <td>{{row.name}}</td>
                  <td>{{row.email}}</td>
                  <td>{{row.product}}</td>
                  <td>{{row.price}}</td>
                  <td>{{row.date}}</td>
                  <td>{{row.city}}</td>
                  <td>
                    <b-button
                      :variant="row.status === 'Pending'
                        ? 'success'
                        : row.status === 'Declined' ? 'danger' : 'info'"
                      class="p-1 px-3 btn-xs"
                    >
                      {{row.status}}
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Widget>
      </b-col>
    </b-row>
    <b-row>
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
    </b-row>
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
      table: [{
        id: 0,
        name: 'Mark Otto',
        email: 'ottoto@wxample.com',
        product: 'ON the Road',
        price: '$25 224.2',
        date: '11 May 2017',
        city: 'Otsego',
        status: 'Sent',
      },
      {
        id: 1,
        name: 'Jacob Thornton',
        email: 'thornton@wxample.com',
        product: 'HP Core i7',
        price: '$1 254.2',
        date: '4 Jun 2017',
        city: 'Fivepointville',
        status: 'Sent',
      },
      {
        id: 2,
        name: 'Larry the Bird',
        email: 'bird@wxample.com',
        product: 'Air Pro',
        price: '$1 570.0',
        date: '27 Aug 2017',
        city: 'Leadville North',
        status: 'Pending',
      },
      {
        id: 3,
        name: 'Joseph May',
        email: 'josephmay@wxample.com',
        product: 'Version Control',
        price: '$5 224.5',
        date: '19 Feb 2018',
        city: 'Seaforth',
        status: 'Declined',
      },
      {
        id: 4,
        name: 'Peter Horadnia',
        email: 'horadnia@wxample.com',
        product: 'Let\'s Dance',
        price: '$43 594.7',
        date: '1 Mar 2018',
        city: 'Hanoverton',
        status: 'Sent',
      }],
      date: [],
      teste: [],
    };
  },
  methods: {
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
    startCharts(obj) {
      var pie   = document.getElementById('piechart').getContext('2d')
      ,   pie2  = document.getElementById('piechart2').getContext('2d')
      ,   pie3  = document.getElementById('piechart3').getContext('2d')
      ,   bars1 = document.getElementById('barchart1').getContext('2d')
      new Chart(pie, {
        type: 'pie',
        data:{
          labels: ["Total", "Sem categoria"],
          datasets: [{
              label: 'Label',
              data: [obj.qtd_total_produto, obj.qtd_produto_sem_categoria],
              backgroundColor: [
                  'green',
                  'red',
              ],
          }]
        },
        options: {
          legend: {
            display: true,
            position: 'bottom'
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
      }) // End Pie Chart
      new Chart(pie2, {
        type: 'pie',
        data:{
          labels: ["Total", "Sem Tags"],
          datasets: [{
              label: 'Label',
              data: [obj.qtd_total_produto, obj.qtd_produto_sem_tag],
              backgroundColor: [
                  'green',
                  'red',
              ],
          }]
        },
        options: {
          legend: {
            display: true,
            position: 'bottom'
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
      }) // End Pie Chart2
      new Chart(pie3, {
        type: 'pie',
        data:{
          labels: ["Total", "Sem EAN"],
          datasets: [{
              label: 'Label',
              data: [obj.qtd_total_produto, obj.qtd_produto_sem_ean],
              backgroundColor: [
                  'green',
                  'red',
              ],
          }]
        },
        options: {
          legend: {
            display: true,
            position: 'bottom'
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
      }) // End Pie Chart3
      this.teste = new Chart(bars1, {
        type: 'bar',
        data:{
        },
        options: {
          legend: {
            display: true,
            position: 'bottom'
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
      }) // End Bar Chart 1
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
    addData(chart, label, color, dados) {
        chart.data.datasets.push({
          label: label,
          backgroundColor: color,
          data: dados
        });
        chart.update();
    },
    fetchUrl(obj){
      this.startCharts(obj);
      this.date = obj.ultimas_importacoes[0].dt_inclusao;
      var inds = obj.ultimas_importacoes;

      for (var i = 0, lgt = inds.length; i < lgt; i++ ) {
        var ind = inds[i].industria
        // ,   qtI = inds[i].qtd_inseridos
        ,   qtT = inds[i].qtd_total_produtos
        // ,   qtA = inds[i].qtd_atualizados

        this.addData(this.teste, ind, this.getRandomRgb(), [qtT])
      }
    },
  },
  async mounted() {
    // this.initChart();
    window.addEventListener('resize', this.initChart);
    await gfn.fApi({url:"https://api.construe.cf/dashboard", options: {method: 'GET'}}, this.fetchUrl);
  },
  created() {
    // if (window.localStorage.getItem('authenticated') === 'false') {
    //   this.$router.push('/login');
    // }
  }
};
</script>

<style src="./Dashboard.scss" lang="scss" scoped />
