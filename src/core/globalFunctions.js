import router from '../Routes';

export default {
	fApi(params, cb) {
		var dados = JSON.parse(window.localStorage.getItem("account"));
		params = {
			'url': params.url || false,
			'options': params.options
		}
		if (params.options) {
			if (!params.options.headers) {
				params.options.headers = {
					'Accept': 'application/json',
					'Authorization': dados.token
				}
			}
		}
		if (params.url) {
			fetch(
				params.url,
				params.options
			).then(function(response){
				if (response.status == 401) {
					window.localStorage.clear();
					router.push('/login');
				}
				response.json().then(function(data){
					if (typeof(cb) == 'function'){
						cb(data);
					}
				});
			}).catch(function(err){
				console.error('Erro na chamada', err);
			});
		} else {
			console.error('fApi precisa receber o parametro url')
		}
	},
	formatDate(valueDate,removeHour) {
		removeHour = removeHour || false;
		var t1, t2, t3, rDay, rMounth, rYear, rHour, rMin, rSec;
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
			return rDay +'/'+ rMounth +'/'+ rYear + '' + (removeHour ? '' : (' '+ rHour +':'+ rMin +':'+ rSec));
		} else if (valueDate.indexOf('T') > 0) {
			t1 = valueDate.split('T');
			t2 = t1[0].split('-');
			rDay = parseInt(t2[2]);
			rDay = (rDay < 10) ? "0"+rDay : rDay;
			rMounth = parseInt(t2[1]);
			rMounth = (rMounth < 10) ? "0"+rMounth : rMounth;
			rYear = t2[0];
			return rDay +'/'+ rMounth +'/'+ rYear + '' + (removeHour ? '' : (' '+ t1[1]));
		} else {
			return valueDate;
		}
	}
}