<template>
    <div>
		<div class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<!-- shop -->
					<div class="col-md-4 col-xs-6">
						<div class="shop">
							<div class="shop-img">
								<img src="assets/img/shop01.png" alt="aa">
							</div>
							<div class="shop-body">
								<h3>Laptop<br>Collection</h3>
								<router-link to="/store"><a href="#" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a></router-link>
							</div>
						</div>
					</div>
					<!-- /shop -->

					<!-- shop -->
					<div class="col-md-4 col-xs-6">
						<div class="shop">
							<div class="shop-img">
								<img src="assets/img/shop03.png" alt="">
							</div>
							<div class="shop-body">
								<h3>Accessories<br>Collection</h3>
								<router-link to="/store"><a href="#" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a></router-link>
							</div>
						</div>
					</div>
					<!-- /shop -->

					<!-- shop -->
					<div class="col-md-4 col-xs-6">
						<div class="shop">
							<div class="shop-img">
								<img src="assets/img/shop02.png" alt="">
							</div>
							<div class="shop-body">
								<h3>Cameras<br>Collection</h3>
								<router-link to="/store"><a href="#" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a></router-link>
							</div>
						</div>
					</div>
					<!-- /shop -->
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /SECTION -->
		<!-- SECTION -->
		<div class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">

					<!-- section title -->
					<div class="col-md-12">
						<div class="section-title">
							<h3 class="title">New Products</h3>
						</div>
					</div>
					<!-- /section title -->

					<!-- Products tab & slick -->
					<div class="col-md-12">
						<div class="row">
							<div class="products-tabs">
								<!-- tab -->
								<div id="tab1" class="tab-pane active">
									<div class="products-slick" data-nav="#slick-nav-1">
										<!-- product -->
										<div class="product" v-for="p in newProducts" :key="p.product_id">
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
												<div class="product-btns">
													<button :class="checkProductInWishlist(p.product_id)" :data-id="p.product_id" @click="addToWishlist(p.product_id)"><i :class="checkProductForIcon(p.product_id)"></i><span class="tooltipp">add to wishlist</span></button>
												</div>
											</div>
											<div class="add-to-cart" v-if="p.in_stock == 1">
												<button class="add-to-cart-btn" @click="addToCart(p)"><i class="fa fa-shopping-cart"></i> add to cart</button>
											</div>
										</div>
										<!-- /product -->
									</div>
									<div id="slick-nav-1" class="products-slick-nav"></div>
								</div>
								<!-- /tab -->
							</div>
						</div>
					</div>
					<!-- Products tab & slick -->
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /SECTION -->

		<!-- HOT DEAL SECTION -->
		<div id="hot-deal" class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-12">
						<div class="hot-deal">
							<ul class="hot-deal-countdown">
								<li>
									<div>
										<h3>02</h3>
										<span>Days</span>
									</div>
								</li>
								<li>
									<div>
										<h3>10</h3>
										<span>Hours</span>
									</div>
								</li>
								<li>
									<div>
										<h3>34</h3>
										<span>Mins</span>
									</div>
								</li>
								<li>
									<div>
										<h3>60</h3>
										<span>Secs</span>
									</div>
								</li>
							</ul>
							<h2 class="text-uppercase">hot deal this week</h2>
							<p>New Collection Up to 50% OFF</p>
							<router-link to="/store"><a class="primary-btn cta-btn">Shop now</a></router-link>
						</div>
					</div>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /HOT DEAL SECTION -->

		<!-- SECTION -->
		<div class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">

					<!-- section title -->
					<div class="col-md-12">
						<div class="section-title">
							<h3 class="title">On discount</h3>
						</div>
					</div>
					<!-- /section title -->

					<!-- Products tab & slick -->
					<div class="col-md-12">
						<div class="row">
							<div class="products-tabs">
								<!-- tab -->
								<div id="tab2" class="tab-pane fade in active">
									<div class="products-slick" data-nav="#slick-nav-2">
										<!-- product -->
										<div class="product" v-for="p in discountedProducts" :key="p.product_id">
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
												<div class="product-btns">
													<button :class="checkProductInWishlist(p.product_id)" :data-id="p.product_id" @click="addToWishlist(p.product_id)"><i :class="checkProductForIcon(p.product_id)"></i><span class="tooltipp">add to wishlist</span></button>
												</div>
											</div>
											<div class="add-to-cart" v-if="p.in_stock == 1">
												<button class="add-to-cart-btn" @click="addToCart(p)"><i class="fa fa-shopping-cart"></i> add to cart</button>
											</div>
										</div>
										<!-- /product -->
									</div>
									<div id="slick-nav-2" class="products-slick-nav"></div>
								</div>
								<!-- /tab -->
							</div>
						</div>
					</div>
					<!-- /Products tab & slick -->
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /SECTION -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {

  name: 'HomeComponent',
  data () {
    return {
		newProducts: [],
		discountedProducts: [],
    }
  },
  computed: {
		...mapGetters(["products","wishlist"])
	},
	methods: {
		returnImgSrc(src){
			return src + '_large.png';
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
		makeLinkForSingle: function(name) {
			return "/product/" + name;
		},
		checkProductInWishlist(id){
			for(let product of this.wishlist){
				if(product.id == id){
					return "add-to-wishlist active";
				}
			}
			return "add-to-wishlist";
		},
		checkProductForIcon(id){
			for(let product of this.wishlist){
				if(product.id == id){
					return `fa fa-heart`;
				}
			}
			return `fa fa-heart-o`;
		},
		addToWishlist: function(id) {
			let button = document.querySelector('.add-to-wishlist[data-id="' + id + '"]')
			if(button.classList.contains('active')){
				button.classList.remove('active')
				button.innerHTML = `<i class="fa fa-heart-o"></i>`
				this.$store.commit('removeProductFromWishlist', id);
			}
			else{
				button.classList.add('active')
				button.innerHTML = `<i class="fa fa-heart"></i>`
				this.$store.commit("addProductToWishlist", {id: id})
			}
		},
		addToCart: function(p) {
				this.$store.commit("addProductToCart", {product: p , SingleProduct: false})
		}
	},
  mounted () {
	setTimeout(function(){
		$('footer script').each(function(){
			$(this).remove();
		});
		let Script2 = document.createElement("script");
		Script2.setAttribute("src", "assets/js/slick.min.js");
		document.head.appendChild(Script2);
	
    }, 100);
	setTimeout(function(){
		let Script = document.createElement("script");
		Script.setAttribute("src", "assets/js/mainold.js");
		document.querySelector('footer').appendChild(Script);
	}, 200);
	this.newProducts = this.products.sort((a, b) => {
          return b.product_id - a.product_id
        } ).slice(0, 8);
	this.discountedProducts = this.products.filter(x => x.discount_id != null).slice(0, 8);
  },
}
</script>