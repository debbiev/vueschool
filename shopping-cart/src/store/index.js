import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)


export default new Vuex.Store({
	state: { // = data
		products: [],
		// { id, quantity }
		cart: [],
		checkoutStatus: null,
	},


	getters: { // = computed properties, 
		availableProducts (state, getters) {
			return state.products.filter(product => product.inventory > 0)
		},
		cartProducts (state, getters) {
			return state.cart.map(cartItem => {
				const product = 
					state.products.find(product => product.id === cartItem.id)
				return {
					title: product.title,
					price: product.price,
					quantity: cartItem.quantity
				}
			})
		},
		cartTotal (state,getters) {
			/*  Simple way
			let total = 0
			getters.cartProducts.forEach(product => {
				total += product.price * product.quantity
			})
			return total
			*/ /* use a reducer instead */
			return getters.cartProducts.reduce((total, product)=> 
				total + product.price * product.quantity, 0)
		},

		getProductById (state,getters){
			return id => {
				return state.products.find(product => product.id === id)
			}
		},
		// getters aren't built to take args, but you can make it work with a fx
		// by returning a function that takes an arg
		productIsInStock () {
			return (product) => {
				return product.inventory > 0 //true or false
			}
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
		},

		addProductToCart ({state, getters, commit}, product){
			//if (product.inventory > 0) {
			if (getters.productIsInStock(product)) {
				//find cartItem
				const cartItem = 	
					state.cart.find(item => item.id === product.id)

				if (!cartItem) {
					//pushProductToCart
					commit('pushProductToCart', product.id)
				} else {
					//increment the quantity
					commit('incrementItemQuantity', cartItem)
				}
				commit('decrementProductInventory', product)

			} else { // out of stock
			}
		},

		//checkout (context) {
		checkout ({state, commit}) {

			shop.buyProducts (
				//context.state.cart, 
				state.cart, 
				() => {
					//context.commit('emptyCart')
					//context.commit('setCheckoutStatus', 'success')
					commit('emptyCart')
					commit('setCheckoutStatus', 'success')
				},
				() => {
					//context.commit('setCheckoutStatus', 'fail')
					commit('setCheckoutStatus', 'fail')
				}
			)
		}

	},

	mutations: { // responsible for setting and updating the state
	  // keep them simple, ONLY update the state
		setProducts (state, products) { //products is the "payload"
			state.products = products
		},
		pushProductToCart (state, productId) { 
			state.cart.push({
				id: productId,
				quantity: 1,
			})
		},
		incrementItemQuantity (state, cartItem) { 
			cartItem.quantity++
		},
		decrementProductInventory (state, product) { 
			product.inventory--
		},
		emptyCart (state) { 
			state.cart = []
		},
		setCheckoutStatus (state, status) { 
			state.checkoutStatus = status
		},
	}
})
