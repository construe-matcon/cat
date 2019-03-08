import router from '../Routes';
import axios from 'axios';

export default {
	gColors(){
		return ["#FBC14B", "#FAA800", "#ED7B00", "#ED5F00", "#A02B13", "#BA8113", "#5DBA78", "#13A06A", "#17897E", "#0CAD14", "#61C9B8", "#5CA8D6", "#125C96", "#093C7A", "#0C3D63"]
	},
	async fApi(params, cb) {
		let dados = JSON.parse(window.localStorage.getItem("account"))
		,	rdata = {};
		params = {
			'url': params.url || false,
			'options': params.options,
		}
		if (params.options) {
			if (!params.options.headers) {
				params.options.headers = {
					'Accept': 'application/json',
					'Content-type': 'application/json',
					'Authorization': dados.token
				}
			}
		}
		if (params.url) {
			await fetch(
				params.url,
				params.options
			).then(function(response){
				if (response.status == 401) {
					let currentPath = (router.history ? router.history.current.path : '')
					window.localStorage.clear();
					if (currentPath.indexOf('login') < 0) {
						router.push({path: '/login', query: {redirect: currentPath}});
					}
				}
				response.json().then(function(data){
					if (typeof(cb) == 'function'){
						cb(data);
					} else {
						rdata = data
					}
				});
			}).catch(function(err){
				console.error('Erro na chamada', err);
			});
		} else {
			console.error('fApi precisa receber o parametro url')
		}
		if (typeof(cb) != 'function'){
			return rdata
		}
	},
	async aApi(params, cb) {
		let dados = JSON.parse(window.localStorage.getItem("account"))
		,	rdata = {};
		params = {
			'method': params.method || '',
			'url': params.url || false,
			'data': params.data || '',
		}
		if (params.url) {
			await axios({
				method: params.method,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					"Authorization": dados.token
				},
				url: params.url,
				data: params.data
			}).then((response) => {
				if (typeof(cb) == 'function'){
					cb(response);
				} else {
					rdata = response
				}
			}).catch((error) => {
				if (typeof(cb) == 'function'){
					cb(error);
				} else {
					rdata = error
				}
			})
		} else {
			console.error('aApi precisa receber o parametro url')
		}
		if (typeof(cb) != 'function'){
			return rdata
		}
	},
	formatDate(valueDate,remove) {
		remove = remove || false;
		let t1, t2, t3, rDay, rMounth, rYear, rHour, rMin, rSec;
		if (valueDate.indexOf('AM') > 0 || valueDate.indexOf('PM') > 0) {
			t1 = valueDate.split('/')
			t2 = t1[2].split(' ');
			t3 = t2[1].split(':');
			rDay = parseInt(t1[1]);
			rDay = (rDay < 10) ? "0"+rDay : rDay;
			rMounth = parseInt(t1[0]);
			rMounth = (rMounth < 10) ? "0"+rMounth : rMounth;
			rYear = t2[0];
			rHour = (t2[2] === 'AM') ? (parseInt(t3[0]) === 12 ? 0 : t3[0]) : (parseInt(t3[0]) === 12 ? parseInt(t3[0]) : parseInt(t3[0]) + 12);
			rMin = t3[1];
			rSec = t3[2];
			return rDay +'/'+ rMounth +'/'+ rYear + '' + (remove ? '' : (' '+ rHour +':'+ rMin +':'+ rSec));
		} else if (valueDate.indexOf('T') > 0) {
			t1 = valueDate.split('T');
			t2 = t1[0].split('-');
			rDay = parseInt(t2[2]);
			rDay = (rDay < 10) ? "0"+rDay : rDay;
			rMounth = parseInt(t2[1]);
			rMounth = (rMounth < 10) ? "0"+rMounth : rMounth;
			rYear = t2[0];
			return rDay +'/'+ rMounth +'/'+ rYear + '' + (remove ? '' : (' '+ t1[1]));
		} else if (valueDate.indexOf('-') == 2 || valueDate.indexOf('-') == 4) {
			t1 = valueDate.split('-');
			if (t1[0].length == 4) {
				t2 = `${t1[2]}/${t1[1]}${(remove ? '' : `/${t1[0]}`)}`
			} else {
				t2 = `${t1[0]}/${t1[1]}${(remove ? '' : `/${t1[2]}`)}`
			}
			return t2;
		} else {
			return valueDate;
		}
	},
	formatCNPJ(cnpj) {
		cnpj = cnpj.replace(/\D/g,'');
		// return cnpj = cnpj.replace(/(\d{2})(\d{1})\.?(\d{2})(\d{1})\.?(\d{2})(\d{1})\-?(\d{0,3})(\d{0,2})/,"$1.$2$3.$4$5/$6$7-$8")
		return cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,"$1.$2.$3/$4-$5")
	},
	formatPrice(valor) {
		return `R$ ${valor.toLocaleString('pt-br')}`
	}
}