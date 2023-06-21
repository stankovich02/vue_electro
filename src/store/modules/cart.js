import cart from "./cart.json"

export default {
    state: {
      cart: cart,
    },
    mutations: {
      addProductToCart(state, obj) {
        if(state.cart[0].products.length == 0){
            if(!obj.SingleProduct){
                obj.product.quantity = 1;
                state.cart[0].products.push(obj.product);
                return;
            }
            obj.product.image_src = `https://itshoppssite.000webhostapp.com/assets/` + obj.product.image_src;
            obj.product.quantity = obj.quantity;
            state.cart[0].products.push(obj.product);
            return;
        }
        for(let p of state.cart[0].products){
            if(p.product_id == obj.product.product_id){
                if(!obj.SingleProduct){
                    p.quantity += 1;
                    return;
                }
                p.quantity += obj.quantity;
                return;
            }
        }
        if(!obj.SingleProduct){
        obj.product.quantity = 1;
        state.cart[0].products.push(obj.product);
        return;
        }
        obj.product.image_src = `https://itshoppssite.000webhostapp.com/assets/` + obj.product.image_src;
        obj.product.quantity = obj.quantity;
        state.cart[0].products.push(obj.product);
      },
      removeProductFromCart(state, id) {
        state.cart[0].products = state.cart[0].products.filter(x => x.product_id != id);
      }
    },
    getters: {
        cartProducts(state) {
            return state.cart[0].products;
        },
        totalPrice(state) {
            return state.cart[0].totalPrice;
        }
    }
}