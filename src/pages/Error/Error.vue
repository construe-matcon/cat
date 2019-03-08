<template>
	<div class="error-page">
		<b-container>
			<div class="errorContainer mx-auto">
				<h1 class="errorCode">404</h1>
				<p class="errorInfo">
					Essa página não está acessível.
				</p>
				<p class="errorHelp mb-3">
					Verifique se você possui permissões para acessá-la.
				</p>
				<b-form v-if="1 == 2">
					<b-form-group>
						<b-form-input class="input-no-border" type="text" placeholder="Search Pages" />
					</b-form-group>
					<router-link tag="a" to="/app/extra/search">
						<b-button class="errorBtn" type="submit" variant="inverse">
							Search <i class="fa fa-search text-warning ml-xs" />
						</b-button>
					</router-link>
				</b-form>
			</div>
			<footer class="pageFooter">
				2019 &copy; Equipe Construe.
			</footer>
		</b-container>
	</div>
</template>

<script>
	export default {
		name: 'ErrorPage',
	};
</script>

<style src="./Error.scss" lang="scss" scoped />
