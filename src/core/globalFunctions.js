import Vue from 'vue';
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
	}
}