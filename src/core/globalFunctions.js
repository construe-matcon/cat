export default {
	teste1(cb) {
		cb();
		console.log(1)
		return '1'
	},
	fApi(params, cb) {
		var dados = JSON.parse(window.localStorage.getItem("account"))
		fetch(params.url, {
			headers: {
				'Accept': 'application/json',
				'Authorization': dados.token
			}
		}).then(function(response){
			response.json().then(function(data){
				cb(data)
			});
		}).catch(function(err){
			console.error('Erro na chamada', err);
		});
	}
}