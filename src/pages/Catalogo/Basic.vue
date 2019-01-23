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
									<th class="hidden-sm-down">ID</th>
									<th class="hidden-sm-down">Códigos</th>
									<th>Imagem</th>
									<th>Nome</th>
									<th class="hidden-sm-down">Linha</th>
									<th class="hidden-sm-down">Marca</th>
									<th class="hidden-sm-down">Categoria</th>
									<th class="hidden-sm-down">Tags</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="row in tableStyles" :key="row.id" @click="ir(row.id)">
									<td>{{row.id}}</td>
									<td>
										<p class="mb-0">
											<small>
												<span class="fw-semi-bold">EAN:</span>
												<span class="text-muted">&nbsp; {{row.ean}}</span>
											</small>
										</p>
										<p>
											<small>
												<span class="fw-semi-bold">NCM:</span>
												<span class="text-muted">&nbsp; {{row.ncm}}</span>
											</small>
										</p>
									</td>
									<td>
										<img class="img-rounded imgCat" :src="'https://images.construe.cf/hidrobuk/'+row.ean+'.jpg'" alt="" />
									</td>
									<td>
										{{row.descricao}}
										<div v-if="row.label">
											<b-badge :variant="row.label.colorClass">{{row.label.text}}</b-badge>
										</div>
									</td>
									<td class="text-semi-muted">
										{{row.linha}}
									</td>
									<td class="text-semi-muted">
										{{row.marca}}
									</td>
									<td class="text-semi-muted">
										{{row.categoria}}
									</td>
									<td class="width-150">
										<template v-if="row.tags.length > 0">
											<span v-for="(tags, i) in row.tags" :key="i">
												{{tags}}<br>
											</span>
										</template>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
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
				, 	url 	 = "https://api.construe.cf/produtos/industria/11"

				fetch(url).then(function(response){
					response.json().then(function(data){
						var ran = data.data
						that.tableStyles = ran;
						// console.log(that.tableStyles)
						// for(var i = 0, lgt = ran.length; i < lgt; i++) {
						// 	console.log(ran[i])
						// }
						// var ran = data.sort(() => .5 - Math.random()).slice(0,20);
						// that.tableStyles = [];
						// for(var i = 0, lgt = ran.length; i < lgt; i++) {
						// 	that.tableStyles[i] = {
						// 		id: ran[i].replace(/\D/g, '').slice(-5),
						// 		picture: 'https://images.construe.cf/hidrobuk/'+ran[i],
						// 		description: ran[i].split('.').slice(0, -1).join('.'),
						// 		info: {
						// 			type: ran[i].split('.').pop(),
						// 			dimensions: '200x150',
						// 		},
						// 		date: new Date('September 14, 2012'),
						// 		size: '45.6 KB',
						// 		progress: {
						// 			percent: 29,
						// 			colorClass: 'success',
						// 		},
						// 	}
						// }
						// console.log(that.tableStyles)
					});
				}).catch(function(err){
					console.error('Erro na chamada', err);
				});
			},
			ir(id){
				this.$router.push({
					path: "/produto?id="+id,
					params: {
						row: id
					}
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





