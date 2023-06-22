<template>
    <div>
		<div id="breadcrumb" class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-12">
						<ul class="breadcrumb-tree">
							<li><a href="#">Home</a></li>
							<li class="active">Store</li>
						</ul>
					</div>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /BREADCRUMB -->

		<!-- SECTION -->
		<div class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<!-- ASIDE -->
					<div id="aside" class="col-md-3">
						<div class="aside">
							<h3 class="aside-title">Searh by name</h3>
							<div class="search-filter">
								<input type="text" name="search" class="py-2 px-2" id="search" placeholder="Type name..." v-model="search">
							</div>
						</div>
						<!-- /aside Widget -->
						<!-- aside Widget -->
						<div class="aside">
							<h3 class="aside-title">Categories</h3>
							<div class="checkbox-filter">
								<div class="input-checkbox" v-for="c in categories" :key="c.category_id">
									<input type="checkbox" name="category" :value="c.category_id" :id="makeID(c.category_id,c.category_name)" v-model="choosedCategories">
									<label :for="makeID(c.category_id,c.category_name)">
										<span></span>
										{{c.category_name}}
										<small>({{ c.NumOfProducts }})</small>
									</label>
								</div>
							</div>
						</div>
						<!-- /aside Widget -->


						<!-- aside Widget -->
						<div class="aside">
							<h3 class="aside-title">Brand</h3>
							<div class="checkbox-filter">
								<div class="input-checkbox" v-for="b in brands" :key="b.brand_id">
									<input type="checkbox" name="brand" :value="b.brand_id" :id="makeID(b.brand_id,b.brand_name)" v-model="choosedBrands">
									<label :for="makeID(b.brand_id,b.brand_name)">
										<span></span>
										{{b.brand_name}}
										<small>({{ b.NumOfProducts }})</small>
									</label>
								</div>

							</div>
						</div>
						<!-- aside Widget -->
						<div class="aside">
							<h3 class="aside-title">Price</h3>
							<div class="price-filter">
								<div id="price-slider"></div>
								<div class="input-number price-min">
									<input v-model="minPrice" id="price-min" type="number">
								</div>
								<span>-</span>
								<div class="input-number price-max">
									<input  v-model="maxPrice" id="price-max" type="number">
								</div>
							</div>
						</div>
						<!-- /aside Widget -->

						<!-- /aside Widget -->
					</div>
					<!-- /ASIDE -->

					<!-- STORE -->
					<div id="store" class="col-md-9">
						<!-- store top filter -->
						<div class="store-filter clearfix" v-if="this.products.length > 0">
							<div class="store-sort">
								<label>
									Sort By:
									<select class="input-select" name="sort" v-model="sort">
										<option value="0">Standard</option>
										<option value="name-asc">Name A-Z</option>
										<option value="name-desc">Name Z-A</option>
										<option value="price-asc">Price Low to High</option>
										<option value="price-desc">Price High to Low</option>
										<option value="newest">Newest</option>
									</select>
								</label>

								<label>
									Show:
									<select class="input-select" name="perPage" v-model="perPage">
										<option value="3">3</option>
										<option value="6">6</option>
										<option value="9">9</option>
										<option value="12">12</option>
									</select>
								</label>
							</div>
							<!-- <ul class="store-grid">
								<li class="active"><i class="fa fa-th"></i></li>
								<li><a href="#"><i class="fa fa-th-list"></i></a></li>
							</ul> -->
							<div class="store-filter clearfix">
							<span class="store-qty">Showing {{((this.viewpage-1)*this.perPage + 1)}}-{{printNumOfProductsAtPage()}} of {{ this.products.length }} product(s)</span>
							</div>
						</div>
						<!-- /store top filter -->

						<!-- store products -->
						<div class="row" v-if="pagedProducts.length > 0">
							<!-- product -->
							<div  v-for="p in pagedProducts" :key="p.product_id" class="col-md-4 col-xs-6">
								<div class="product" v-if="p.product_id">
									<div class="product-img">
										<img :src="returnImgSrc(p.image_src, imgSize)" alt="">
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
							</div>
							<!-- /product -->
						</div>
						<div v-else class="alert alert-danger text-center fs-1">
							No products found
						</div>
						<!-- /store products -->

						<!-- store bottom filter -->

							<ul class="store-pagination">
							</ul>

						<!-- /store bottom filter -->
					</div>
					<!-- /STORE -->
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
    name: 'StoreComponent',
    data() {
        return {
			pagedProducts: [],
			categories: [],
			brands: [],
			choosedCategories: [],
			choosedBrands: [],
			minPrice: 0,
			maxPrice: 3000,
			search: '',
			sort: 0,
			adminLoggedIn: false,
			imgSize: 'large',
			perPage : 9,
			viewpage: 1,
			lastpage: null,
        }
    },
	mounted() {
		let categoryParams = {
			table : 'categories',
		}
		let brandParams = {
			table : 'brands',
		}
		this.$axios.get('models/getAsideFilter.php', {params : categoryParams}).then(response => {
			this.categories = response.data
		}).catch(error => {
			console.log(error)
		})
		this.$axios.get('models/getAsideFilter.php', {params : brandParams}).then(response => {
			this.brands = response.data
		}).catch(error => {
			console.log(error)
		})
		this.makePagination();
		let paginations = document.querySelectorAll('.store-pagination li');
		paginations.forEach(pagination => {
			pagination.addEventListener('click', () => {
				this.viewpage = pagination.textContent;
				this.pagedProducts = this.products.slice((this.viewpage - 1) * this.perPage, this.viewpage * this.perPage)
			})
		})
		this.pagedProducts = this.products.slice((this.viewpage - 1) * this.perPage, this.viewpage * this.perPage)
		let user = JSON.parse(localStorage.getItem('user'));
		if(user){
			if(user.role == 'admin'){
				this.adminLoggedIn = true;
			}
		}
		
	},
	computed: {
		...mapGetters(["products","role","wishlist"])
	},
	methods: {
		makePagination(){
			let html = '';
			let numOfPages = Math.ceil(this.products.length / this.perPage);
			for(let i = 1; i <= numOfPages; i++){
				html += `<li class="pagination"><a href="#">${i}</a></li>`;
			}
			document.querySelector('.store-pagination').innerHTML = html;
			let paginations = document.querySelectorAll('.store-pagination li');
			var self = this;
			paginations.forEach(pagination => {
				pagination.addEventListener('click', () => {
					this.viewpage = pagination.textContent;
				})
			})
		},
		printNumOfProductsAtPage: function() {
			if(this.viewpage == this.lastpage || this.products.length < this.perPage){
				return this.products.length;
			}
			return this.viewpage*this.perPage;
		},
		makeID: function(id,name) {
			return name + id;
		},
		sendPage: function(e) {
			let paginations = document.querySelectorAll('.pagination');
			for(let p of paginations) {
				p.classList.remove('active');
			}
			e.classList.add('active');
		},
		returnImgSrc(src, imgSize){
			return src + '_' + imgSize + '.png';
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
		editProduct: function(id) {
			this.$router.push("/edit-product/" + id)
		},
		deleteProduct: function(id){
			this.$store.commit("deleteProduct", id)
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
	watch: {
		choosedCategories: function() {
			this.$store.commit('filterByCategory', this.choosedCategories)
		},
		choosedBrands: function() {
			this.$store.commit('filterByBrand', this.choosedBrands)
		},
		minPrice: function() {
			this.$store.commit('filterByPrice', {minPrice : this.minPrice, maxPrice: this.maxPrice})
		},
		maxPrice: function() {
			this.$store.commit('filterByPrice', {minPrice : this.minPrice, maxPrice: this.maxPrice})
		},
		search: function() {
			this.$store.commit('filterByKeyword', this.search)
		},
		sort: function() {
			this.$store.commit('sortProducts', this.sort)
		},
		products: function() {
			this.viewpage = 1;
			this.lastpage = Math.ceil(this.products.length / this.perPage);
			this.pagedProducts = this.products.slice((this.viewpage - 1) * this.perPage, this.viewpage * this.perPage)
			this.makePagination()
		},
		viewpage: function() {
			this.pagedProducts = this.products.slice((this.viewpage - 1) * this.perPage, this.viewpage * this.perPage)
		},
		perPage: function() {
			this.viewpage = 1;
			this.pagedProducts = this.products.slice((this.viewpage - 1) * this.perPage, this.viewpage * this.perPage)
			this.makePagination()

		}
	}
}
</script>