<template>
    <div>
    <h1 class="text-center py-5">Wishlist</h1>
    <div class="container" v-if="wishlist.length > 0">
        <div class="row">
							<div v-for="p in wishlistProducts" :key="p.product_id" class="col-md-3 col-xs-6 pr" :data-id="p.product_id">
								<div class="product" v-if="p.product_id">
									<div class="product-img">
										<img :src="returnImgSrc(p.image_src)" alt="">
										<div class="product-label">
											<span class="new" v-if="p.discount_percent">-{{p.discount_percent}}%</span>
										</div>
									</div>
									<div class="product-body">
										<h3 class="product-name"><router-link :to="makeLinkForSingle(p.name)">{{ p.name }}</router-link></h3>
										<div v-if="p.discount_id != null">
										<h4 class="product-price">{{p.price}}&euro;<del class="product-old-price">{{p.price  - (p.price * p.discount_percent / 100)}}&euro;</del></h4>
										</div>
										<div v-else>
										<h4 class="product-price">{{p.price}}&euro;</h4>
										</div>
										<div class="product-rating" v-html="makeRating(p.Rating)">
										</div>
                                        <button class="btn btn-danger" @click="removeFromWishlist(p.product_id)">Remove product</button>
									</div>
									<div class="add-to-cart">
										<button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
									</div>
								</div>
							</div>
						</div>
    </div>
	<h2 class="text-center py-5" v-else>Your wishlist is empty.</h2>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Button from '../forms/Button.vue';
export default{
  components: { Button },
    name: "WishlistComponent",
    data(){
        return{
            wishlistProducts: [],
        }
    },
    mounted(){
        let user = JSON.parse(localStorage.getItem('user'));
        if(user == null){
            this.$router.push('/login');
        }
        if(this.wishlist.length == 0){
            this.empty = true;
        }
        for(let w of this.wishlist){
            for(let p of this.products){
                if(w.id == p.product_id){
                    this.wishlistProducts.push(p);
                }
            }
        }
    },
    methods: {
        returnImgSrc(src){
			return src + '_large.png';
		},
		makeLinkForSingle: function(name) {
			return "/product/" + name;
		},
        makeRating: function(rating) {
			let html = '';
			if(rating == null){
				html += `
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>
				`
			}
			else{
				for(let i = 0; i < rating; i++){
					html += `<i class="fa fa-star"></i>`
				}
				for(let i = 0; i < 5 - rating; i++){
					html += `<i class="fa fa-star-o"></i>`
			}
		}
			return html;
		},
        removeFromWishlist: function(id){
            let product = document.querySelector(`.pr[data-id="${id}"]`);
            product.remove();
            this.$store.commit('removeProductFromWishlist', id);
        }
    },
    computed:{
        ...mapGetters(["wishlist", "products"])
    }
}
</script>