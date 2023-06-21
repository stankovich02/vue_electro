import wishlist from "./wishlist.json"

export default {
    state: {
      wishlist: wishlist
    },
    mutations: {
      addProductToWishlist(state, obj) {
        state.wishlist.push(obj);
      },
      removeProductFromWishlist(state, id) {
       state.wishlist = state.wishlist.filter(x => x.id != id);
      }
    },
    getters: {
      wishlist(state) {
        return state.wishlist;
        }
    }
}