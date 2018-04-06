import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)


export default new Vuex.Store({
	state: { // = data
		products: []
	},


	getters: { // = computed properties, 
		availableProducts (state, getters) {
			return state.products.filter(product => product.inventory > 0)
		}
	},

	actions: { // = does the ajax, don't be tempted to set the state here
		//can be complicated but, DO NOT update the state, call the mutation instead

		fetchProducts ({commit}) {
			return new Promise((resolve, reject) => {
				shop.getProducts(products => {
					commit('setProducts', products)
					resolve()
				})

			})
		}

	},

	mutations: { // responsible for setting and updating the state
	  // keep them simple, ONLY update the state
		setProducts (state, products) { //products is the "payload"
			state.products = products
		}
	}
})
