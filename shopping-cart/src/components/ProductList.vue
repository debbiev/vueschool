<template>
	<div>
		<h1>Product List</h1>

		<img
			v-if="loading"
			width="64" 
			alt="InternetSlowdown Day" 
			title="By Darmokand [CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0)], from Wikimedia Commons" 
			src="https://upload.wikimedia.org/wikipedia/commons/2/28/InternetSlowdown_Day.gif"
		>
		<ul v-else>
			<li v-for="product in products">
				{{ product.title }} - {{ product.price }} 
				<button @click="addProductToCart(product)">Add to cart</button>
			</li>
		</ul>
	</div>
</template>

<script>

	export default{
		data () {
			return {
				loading: false
			}
		},

		computed: {
			products () {
				return this.$store.getters.availableProducts
			}
		},

		methods: {
			addProductToCart (product) {
				this.$store.dispatch('addProductToCart', product)
			}
		},

		created () {
			this.loading = true
			this.$store.dispatch('fetchProducts')
			 .then(() => this.loading = false)

		},
	}
</script>

<style scoped>
</style>
