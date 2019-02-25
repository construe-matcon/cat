<template>
	<section v-if="prod.id">
		<h3 class="page-title">{{prod.id}} - <span class="fw-semi-bold">{{prod.descricao}}</span></h3>
		<b-tabs>
			<b-tab title="Geral" active>
				<b-row class="formProduto">
					<b-col lg="4" class="list-item">
						<img class="img-rounded imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
						<!-- ADICIONAR IF PARA GALERIA AQUI -->
						<b-col lg="12" class="thumb-gal" v-if="1 == 2">
							<img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
							<img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
							<img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
						</b-col>
						<!-- ADICIONAR IF PARA GALERIA AQUI -->
					</b-col>
					<b-col lg="8" class="list-item">
						<b-col lg="6" class="interno">
							<span>Nome: </span><span class="fw-semi-bold">{{prod.descricao}}</span><br>
							<span>Descrição Indústria: </span><span class="fw-semi-bold">{{prod.descricao_industria}}</span><br>
							<span>Marca: </span><span class="fw-semi-bold">{{prod.marca}}</span><br>
							<span>ID Marca: </span><span class="fw-semi-bold">{{prod.id_marca}}</span><br>
						</b-col>
						<b-col lg="6" class="interno">
							<template v-if="prod.preco">
								<span v-if="prod.preco.preco_capital">Preço Capital: </span><span class="fw-semi-bold" v-if="prod.preco.preco_capital">R$ {{prod.preco.preco_capital}}</span><br>
								<span v-if="prod.preco.preco_interior">Preço Interior: </span><span class="fw-semi-bold" v-if="prod.preco.preco_interior">R$ {{prod.preco.preco_interior}}</span><br>
								<span>Código Interno: </span><span class="fw-semi-bold">{{prod.codigo_interno}}</span><br>
								<span>Industria: </span><span class="fw-semi-bold">{{prod.industria}}</span><br>
								<span>ID: </span><span class="fw-semi-bold">{{prod.id}}</span><br>
							</template>
						</b-col>
						<hr>
						<b-col lg="6" class="interno">
							<span>Categoria: </span><span class="fw-semi-bold">{{prod.categoria}}</span><br>
							<span>ID Categoria: </span><span class="fw-semi-bold">{{prod.id_categoria}}</span><br>
							<span>Linha: </span><span class="fw-semi-bold">{{prod.linha}}</span><br>
							<span>ID Linha: </span><span class="fw-semi-bold">{{prod.id_linha}}</span><br>
							<span>EAN: </span><span class="fw-semi-bold">{{prod.ean}}</span><br>
							<span>NCM: </span><span class="fw-semi-bold">{{prod.ncm}}</span><br>
						</b-col>
						<b-col lg="6" class="interno">
							<template v-if="prod.tags">
								<span>Tags: </span><br>
								<span v-for="(tags,i) in prod.tags" :key="'tg-'+i">
									<span v-if="tags.length > 0" class="fw-semi-bold" style="text-transform: capitalize;">{{tags}}<br></span>
								</span>
							</template>
						</b-col>
					</b-col>
				</b-row>
			</b-tab>
			<b-tab title="Detalhes">
				<b-row class="formProduto">
					<b-col lg="4" class="list-item">
						<img class="img-rounded imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
						<!-- ADICIONAR IF PARA GALERIA AQUI -->
						<b-col lg="12" class="thumb-gal" v-if="1 == 2">
							<img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
							<img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
							<img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
						</b-col>
						<!-- ADICIONAR IF PARA GALERIA AQUI -->
					</b-col>
					<b-col lg="8" class="list-item" v-if="prod.detalhe">
						<b-col lg="6" class="interno">
							<span>Detalhes: </span><br>
							<template v-if="prod.detalhe.embalagem">
								<span v-if="prod.detalhe.embalagem.volume">Volume: </span><span class="fw-semi-bold" v-if="prod.detalhe.embalagem.volume">{{prod.detalhe.embalagem.volume}} {{prod.detalhe.embalagem.unidade_medida}}<br></span>
								<span v-if="prod.detalhe.embalagem.embalagem">Embalagem: </span><span class="fw-semi-bold" v-if="prod.detalhe.embalagem.embalagem">{{prod.detalhe.embalagem.embalagem}}<br></span>
								<span v-if="prod.detalhe.embalagem.rendimento">Rendimento: </span><span class="fw-semi-bold" v-if="prod.detalhe.embalagem.rendimento">{{prod.detalhe.embalagem.rendimento}}<br></span>
								<span v-if="prod.detalhe.embalagem.embalagem_embarque != ''">Embalagem Embarque: </span><span class="fw-semi-bold" v-if="prod.detalhe.embalagem.embalagem_embarque">{{prod.detalhe.embalagem.embalagem_embarque}}</span><br>
								<span v-if="prod.detalhe.sku_embarque != ''">SKU Embarque: </span><span class="fw-semi-bold" v-if="prod.detalhe.sku_embarque">{{prod.detalhe.sku_embarque}}</span><br>
								<span v-if="prod.detalhe.gtin">GTIN: </span><span class="fw-semi-bold" v-if="prod.detalhe.gtin">{{prod.detalhe.gtin}}<br></span>
							</template>
						</b-col>
						<b-col lg="6" class="interno">
							<span>Tamanho Embalagem Embarque: </span><br>
							<template v-if="prod.detalhe.embalagem">
								<span v-if="prod.detalhe.altura_embalagem_embarque != ''">Altura: </span><span class="fw-semi-bold" v-if="prod.detalhe.altura_embalagem_embarque">{{prod.detalhe.altura_embalagem_embarque}}</span><br>
								<span v-if="prod.detalhe.largura_embalagem_embarque != ''">Largura: </span><span class="fw-semi-bold" v-if="prod.detalhe.largura_embalagem_embarque">{{prod.detalhe.largura_embalagem_embarque}}</span><br>
								<span v-if="prod.detalhe.profundidade_embalagem_embarque != ''">Profundidade: </span><span class="fw-semi-bold" v-if="prod.detalhe.profundidade_embalagem_embarque">{{prod.detalhe.profundidade_embalagem_embarque}}</span><br>
								<span v-if="prod.detalhe.peso_embalagem_embarque != ''">Peso: </span><span class="fw-semi-bold" v-if="prod.detalhe.peso_embalagem_embarque">{{prod.detalhe.peso_embalagem_embarque}}</span><br>
							</template>
						</b-col>
						<hr>
						<b-col lg="6" class="interno">
							<span v-if="prod.detalhe.atributo.grupo_produto != ''">Grupo do Produto: </span><span class="fw-semi-bold" v-if="prod.detalhe.atributo.grupo_produto">{{prod.detalhe.atributo.grupo_produto}}</span>
						</b-col>
						<b-col lg="6" class="interno">
							<span v-if="prod.detalhe.atributo.perfil_compra != ''">Perfil de Compra: </span><span class="fw-semi-bold" v-if="prod.detalhe.atributo.perfil_compra">{{prod.detalhe.atributo.perfil_compra}}</span>
						</b-col>
						<b-col lg="6" class="interno">
							<span v-if="prod.detalhe.atributo.cor != ''">Cor: </span><span class="fw-semi-bold" v-if="prod.detalhe.atributo.cor">{{prod.detalhe.atributo.cor}}</span>
						</b-col>
						<b-col lg="6" class="interno">
							<span v-if="prod.detalhe.atributo.codigo_cor != ''">Código Cor: </span><span class="fw-semi-bold" v-if="prod.detalhe.atributo.codigo_cor">{{prod.detalhe.atributo.codigo_cor}}</span>
						</b-col>
						<b-col lg="6" class="interno">
							<span v-if="prod.detalhe.atributo.relevancia_pedido_certo != ''">Relevância Pedido Certo: </span><span class="fw-semi-bold" v-if="prod.detalhe.atributo.relevancia_pedido_certo">{{prod.detalhe.atributo.relevancia_pedido_certo}}</span>
						</b-col>
						<b-col lg="6" class="interno">
							<span>Tributação: </span><br>
							<span v-if="prod.detalhe.tributacao.ipi != ''">IPI: </span><span class="fw-semi-bold" v-if="prod.detalhe.tributacao.ipi">{{prod.detalhe.tributacao.ipi}}<br></span>
							<span v-if="prod.detalhe.tributacao.st != ''">ST: </span><span class="fw-semi-bold" v-if="prod.detalhe.tributacao.st">{{prod.detalhe.tributacao.st}}</span>
						</b-col>
					</b-col>
				</b-row>
			</b-tab>
			<b-tab title="Editar">
				<b-row class="formProduto">
					<b-col lg="4" class="list-item">
						<img class="img-rounded imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
						<!-- ADICIONAR IF PARA GALERIA AQUI -->
						<b-col lg="12" class="thumb-gal" v-if="1 == 2">
							<img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
							<img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
							<img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
						</b-col>
						<!-- ADICIONAR IF PARA GALERIA AQUI -->
					</b-col>
					<b-col lg="8" class="list-item">
						<b-form @submit.prevent="">
							<div class="form-group row">
								<b-form-group class="col">
									<label for="inputIndustria" class="col-form-label">Industria</label>
									<div class="">
										<b-input class="form-control-plaintext" id="inputIndustria" v-model="prod.industria" readonly />
									</div>
								</b-form-group>
								<b-form-group class="col">
									<label for="inputFabricante" class="col-form-label">Fabricante</label>
									<div class="">
										<b-input class="form-control-plaintext" id="inputFabricante" v-model="prod.fabricante" readonly />
									</div>
								</b-form-group>
								<b-form-group class="col">
									<label for="inputCategoria" class="col-form-label">Categoria</label>
									<div class="">
										<b-input class="form-control-plaintext" id="inputCategoria" v-model="prod.categoria" readonly />
									</div>
								</b-form-group>
							</div>
							<div class="form-group row">
								<b-form-group class="col">
									<label for="inputEan" class="col-form-label">EAN</label>
									<div class="">
										<template v-if="prod.ean.length == 13">
											<b-input class="form-control-plaintext" id="inputEan" v-model="prod.ean" readonly />
										</template>
										<template v-else>
											<b-input class="form-control-plaintext" autocomplete="off" id="inputEan" v-model="prod.ean" pattern="\d{13}" maxlength="13" />
										</template>
									</div>
								</b-form-group>
								<b-form-group class="col">
									<label for="inputCodInterno" class="col-form-label">Cod. Interno</label>
									<div class="">
										<b-input class="form-control-plaintext" id="inputCodInterno" v-model="prod.codigo_interno" readonly />
									</div>
								</b-form-group>
								<b-form-group class="col">
									<label for="inputNcm" class="col-form-label">NCM</label>
									<div class="">
										<b-input class="form-control-plaintext" id="inputNcm" v-model="prod.ncm" readonly />
									</div>
								</b-form-group>
								<b-form-group class="col">
									<label for="inputMarca" class="col-form-label">Marca</label>
									<div class="">
										<b-input class="form-control-plaintext" id="inputMarca" v-model="prod.marca" readonly />
									</div>
								</b-form-group>
							</div>
							<div class="form-group row">
								<b-form-group class="col">
									<label for="inputDescricao" class="col-form-label">Descrição</label>
									<div class="">
										<b-form-textarea class="form-control-plaintext" id="inputDescricao" v-model="prod.descricao" readonly rows="3" max-rows="3" />
									</div>
								</b-form-group>
								<b-form-group class="col">
									<label for="inputDescInd" class="col-form-label">Descrição Ind.</label>
									<div class="">
										<b-form-textarea class="form-control-plaintext" id="inputDescInd" v-model="prod.descricao_industria" readonly rows="3" max-rows="3" />
									</div>
								</b-form-group>
							</div>
							<div class="form-group row">
								<label for="inputTags" class="col-3 col-form-label">Tags</label>
								<div class="col-9">
									<input type="text" class="form-control-plaintext" id="inputTags" placeholder="Adicionar tags" @keyup.enter="addTag" @keydown.prevent.tab="addTag" maxlength="35" />
									<b-badge variant="success" v-for="tag in prod.tags" v-if="tag != ''" :key="'tag-'+tag">{{tag.toLowerCase()}}<b-button-close @click.prevent="removeTag" /></b-badge>
								</div>
							</div>
							<h3>Detalhes</h3>
							<h5>Atributos</h5>
							<div class="form-group row">
								<template v-for="(value, key) in prod.detalhe.atributo">
									<label class="col-3 col-form-label" :key="'atributo-1-'+key" style="text-transform: capitalize;">{{key.replace(/\_/g,' ')}}</label>
									<div class="col-9" :key="'atributo-2-'+key">
										<b-input class="form-control-plaintext" v-model="prod.detalhe.atributo[key]" />
									</div>
								</template>
							</div>
							<h5>Embalagem</h5>
							<div class="form-group row">
								<template v-for="(value, key) in prod.detalhe.embalagem">
									<label class="col-3 col-form-label" :key="'embalagem-1-'+key" style="text-transform: capitalize;">{{key.replace(/\_/g,' ')}}</label>
									<div class="col-9" :key="'embalagem-2'+key">
										<b-input class="form-control-plaintext" v-model="prod.detalhe.embalagem[key]" />
									</div>
								</template>
							</div>
							<b-button variant="outline-danger float-left" @click.prevent="resetForm">Cancelar</b-button>
							<b-button variant="outline-success float-right" @click.prevent="sendForm">Salvar</b-button>
						</b-form>
					</b-col>
				</b-row>
			</b-tab>
			<b-tab title="Associações">
				<b-row class="formProduto">
					<b-col lg="4" class="list-item">
						<img class="img-rounded imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
						<!-- ADICIONAR IF PARA GALERIA AQUI -->
						<b-col lg="12" class="thumb-gal" v-if="1 == 2">
							<img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
							<img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
							<img class="img-rounded thumb-imgCat" :src="'https://images.construe.cf/'+prod.industria+'/'+prod.ean+'.jpg'" alt="" />
						</b-col>
						<!-- ADICIONAR IF PARA GALERIA AQUI -->
					</b-col>
					<b-col lg="8" class="list-item">
						<b-form @submit.prevent="">
							<div class="form-group row">
								<b-form-group class="col">
									<label for="inputIndustria" class="col-form-label">Possiveis associações de Sell Out</label>
									<div class="">
										<b-input class="form-control-plaintext" id="inputIndustria" v-model="prod.industria" readonly />
									</div>
								</b-form-group>
							</div>
						</b-form>
					</b-col>
				</b-row>
			</b-tab>
		</b-tabs>
		<b-modal
			ref="completeEdit"
			:title="avisoModalTitle"
			:header-bg-variant="avisoModalTipo"
			:header-text-variant="'light'"
			:body-bg-variant="'light'"
			:body-text-variant="'dark'"
			:footer-bg-variant="'light'"
			:footer-text-variant="'dark'"
			ok-only
		>
			<div class="d-block text-left">
				<p v-html="avisoModal"></p>
			</div>
		</b-modal>
	</section>
	<section v-else-if="prod.mensagens">
		Produto não encontrado...
	</section>
	<section v-else>

	</section>
</template>

<script>
	// import $ from 'jquery';
	import gfn from '@/core/globalFunctions';
	export default {
		name: 'Produto',
		data() {
			return {
				prod: {},
				bkpprod: {},
				avisoModal: 'Prodtuo Alterado com sucesso',
				avisoModalTipo: 'light',
				avisoModalTitle: 'Atualização de produto',
			};
		},
		methods: {
			loadProducts(id) {
				gfn.fApi({url:"https://api.construe.cf/produtos/"+id, options: {method: 'GET'}}, this.fetchUrl);
			},
			fetchUrl(obj){
				this.prod = obj;
				this.bkpprod = JSON.stringify(obj);
			},
			sendForm() {
				this.avisoModal = ''
				if (this.prod.tags != undefined) {
					this.prod.tags = this.prod.tags.filter(tag => {
						return tag != ""
					})
				}
				gfn.fApi({url:"https://api.construe.cf/produtos/"+this.$route.params.id, options: {method: 'PUT', body: JSON.stringify(this.prod)}}, this.completeForm);
			},
			completeForm(data) {
				if (data != null) {
					this.avisoModal =''
					this.avisoModalTipo = 'danger'
					this.avisoModalTitle ='Erro ao atualizar o produto'

					data.mensagens.forEach(msg => {
						this.avisoModal += msg + '<br />'
					})
				} else {
					this.avisoModal = 'Produto atualizado com sucesso!'
					this.avisoModalTipo = 'success'
					this.avisoModalTitle ='Atualização do produto'
					this.bkpprod = JSON.stringify(this.prod)
				}
				this.$refs.completeEdit.show()
			},
			resetForm() {
				this.prod = JSON.parse(this.bkpprod)
			},
			addTag(event) {
				let inputVal = event.target.value.trim().replace(/\s+/g," ")
				if (this.prod.tags == undefined) {
					this.prod["tags"] = []
				}
				if (this.prod.tags.indexOf(inputVal) < 0 && inputVal.replace(/\s/g,'').length > 0) {
					this.prod.tags.push(inputVal.toLowerCase())
				}
				event.target.value = ''
			},
			removeTag(event) {
				this.prod.tags = this.prod.tags.filter(tag => {
					return (tag != event.path[1].innerText.split('\n')[0] && tag != "")
				})
			}
		},
		async mounted() {
			await this.loadProducts(this.$route.params.id);
		},
		watch: {
			'$route' () {
				this.loadProducts(this.$route.params.id);
			}
		}
	};
</script>

<style lang="scss" scoped>
@import './Produto.scss';
</style>
