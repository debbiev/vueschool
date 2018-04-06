import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)


export default new Vuex.Store({
	state: { // = data
		products: []
	},


	getters: { // = computed properties, 
						 // automatically update when a dependency changes
		availableProducts (state, getters) {
			return state.products.filter(product => product.inventory > 0)
			
		}
	},

	actions: { // = does the ajax, don't be tempted to set the state here
		//can be complicated but, DO NOT update the state, call the mutation instead

		//context exposes all methods and properties as the store obj
		//fetchProducts (context) {
		//the commit is a es6 destructing thingy that lets you just do the commit
		
		fetchProducts ({commit}) {
			return new Promise((resolve, reject) => {
				//make the call
				shop.getProducts(products => {
					//context.commit('setProducts', products)
					commit('setProducts', products)
					resolve()
					//we can use resolve() instead of reject() because it can't fail
				})

			})
			//run the setProducts mutation
			//setProducts(products)
			//setProducts()
		}

		/*
		addToCart (context, product) {
			if (product.inventory > 0){
				context.commit('pushProductToCard', product)
			} else {
				// show out of stock message
			}
		}
		*/
	},

	mutations: { // responsible for setting and updating the state
	  // keep them simple, ONLY update the state
		setProducts (state, products) { //products is the "payload"
			state.products = products
		}
		/*
		pushProductToCart (state, product) { //products is the "payload"
		}
		*/
	}
})
