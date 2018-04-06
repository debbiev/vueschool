import Vuex from 'vuex'
import Vue from 'vue'

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
		fetchProducts () {
			//make the call

			//run the setProducts mutation
			//setProducts(products)
			setProducts()
		}
	},

	mutations: { // responsible for setting and updating the state
	  // keep them simple, ONLY update the state

		
		setProducts (state, products) { //products is the "payload"
			state.products = products
		}
	}
})
