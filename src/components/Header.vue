<template>
		<header>
			<!-- TOP HEADER -->
			<div id="top-header">
				<div class="container">
					<ul class="header-links pull-left">
						<li><a href="#"><i class="fa fa-phone"></i> +021-95-51-84</a></li>
						<li><a href="#"><i class="fa fa-envelope-o"></i> office@electro.com</a></li>
						<li><a href="#"><i class="fa fa-map-marker"></i> 1734 Stonecoal Road</a></li>
					</ul>
					<ul class="header-links pull-right">
						<li><a href="#" v-if="user" @click="logout"><i class="fa fa-user-o"></i> Logout</a></li>
						<router-link  v-for="link in headerLinks" :key="link.to" :to="link.to"><li class="me-3"><a href="#" ><i class="fa fa-user-o"></i> {{link.text}}</a></li></router-link>
					</ul>
				</div>
			</div>
			<!-- /TOP HEADER -->

			<!-- MAIN HEADER -->
			<div id="header">
				<!-- container -->
				<div class="container">
					<!-- row -->
					<div class="row">
						<!-- LOGO -->
						<div class="col-md-6">
							<div class="header-logo">
								<a href="#" class="logo">
									<img src="assets/img/logo.png" alt="">
								</a>
							</div>
						</div>
						<!-- /LOGO -->
						<!-- ACCOUNT -->
						<div class="col-md-6 clearfix">
							<div class="header-ctn">
								<!-- Wishlist -->
								<div>
									<router-link to="/wishlist">
										<i class="fa fa-heart-o"></i>
										<span>Your Wishlist</span>
									</router-link>
								</div>
								<!-- /Wishlist -->

								<!-- Cart -->
								<div class="dropdown">
									<a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
										<i class="fa fa-shopping-cart"></i>
										<span>Your Cart</span>
									</a>
									<div class="cart-dropdown" v-if="cartProducts.length > 0">
										<div class="cart-list">
											<div class="product-widget" v-for="p in this.cartProducts" :key="p.product_id">
												<div class="product-img">
													<img :src="returnImgSrc(p.image_src)" alt="">
												</div>
												<div class="product-body">
													<h3 class="product-name"><router-link :to="makeLinkForSingle(p.name)">{{ p.name }}</router-link></h3>
													<h4 class="product-price"><span class="qty">{{ p.quantity }}x</span>{{p.price}}&euro;</h4>
												</div>
												<button class="delete" @click="removeFromCart(p.product_id)"><i class="fa fa-close"></i></button>
											</div>
										</div>
										<div class="cart-summary">
											<small>{{ cartProducts.length }} Item(s) selected</small>
											<h5>TOTAL: {{totalPrice}}&euro;</h5>
										</div>
										<div class="cart-btns">
											<router-link to="/checkout">Checkout<i class="fa fa-arrow-circle-right ms-3"></i></router-link>
										</div>
									</div>
									<div class="cart-dropdown" v-else>
											<h4 class="text-center my-0">Your cart is empty.</h4>
									</div>

								</div>
								<!-- /Cart -->

								<!-- Menu Toogle -->
								<div class="menu-toggle">
									<a href="#">
										<i class="fa fa-bars"></i>
										<span>Menu</span>
									</a>
								</div>
								<!-- /Menu Toogle -->
							</div>
						</div>
						<!-- /ACCOUNT -->
					</div>
					<!-- row -->
				</div>
				<!-- container -->
			</div>
			<!-- /MAIN HEADER -->
		</header>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'HeaderComponent',
    data() {
        return {
			userLoggedIn: false,
			isAdmin: false,
			totalPrice: 0,
			products : []
        }
    },
	props: {
		user: {
			type: Boolean,
			required: true
		},
		headerLinks: {
			type: Array,
			required: true
		}
	},
	mounted() {
		let user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			this.userLoggedIn = true;
		}
		if(user != null && user.role == "admin") {
			this.isAdmin = true;
		}
		if(this.cartProducts.length > 0) {
			this.products = cartProducts;
			let price = 0;
			this.cartProducts.forEach(p => {
				price += p.price * p.quantity;
			});
			this.totalPrice = price;
		}
		
	},
	computed: {
		...mapGetters(['cartProducts'])
	},
	methods: {
		makeLinkForSingle: function(name) {
			return "/product/" + name;
		},
		returnImgSrc(src){
			return src + '_small.png';
		},
		logout() {
			this.$store.commit("logoutUser");
			this.$router.push("/login");
			this.$emit("userLoggedOut");
		},
		removeFromCart: function(id){
            // let product = document.querySelector(`.pr[data-id="${id}"]`);
            // product.remove();
            this.$store.commit('removeProductFromCart', id);
        }
	},
	watch: {
		cartProducts: function() {
			let price = 0;
			this.cartProducts.forEach(p => {
				price += p.price * p.quantity;
			});
			this.totalPrice = price;
		}
	}
}
</script>