<template>
	<div>
		<h1>Product List</h1>
		<ul>
			<li v-for="product in products">{{ product.title }} - {{ product.price }} </li>
		</ul>
	</div>
</template>

<script>
	import shop from '@/api/shop'
	import store from '@/store/index'

	//store.fetchProducts()

	export default{
		computed: {
			products () {
				return store.state.products
			}
		},
		created () {
			//This gets the hard coded products from ./api/shop.js
			shop.getProducts(products => {
				//this.products = products
				//run a mutation instead = more precisely COMMIT a mutation 
				//  passing a method & a payload
				store.commit('setProducts', products)
			})
		},
	}
</script>

<style scoped>
</style>
