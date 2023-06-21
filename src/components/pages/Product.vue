<template>
    <div>
        	<!-- BREADCRUMB -->
		<div id="breadcrumb" class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-12">
						<ul class="breadcrumb-tree">
							<li><a href="#">Home</a></li>
							<li class="active">{{this.name}}</li>
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
					<!-- Product main img -->
					<div class="col-md-5">
						<div id="product-main-img">
							<div class="product-preview">
								<img :src="makeSourceImg(product.image_src)" alt="">
							</div>
						</div>
					</div>
					<!-- /Product main img -->

					<!-- Product details -->
					<div class="col-md-5">
						<div class="product-details">
							<h2 class="product-name">{{ product.name }}</h2>
							<div>
								<div class="product-rating" v-html="makeRating(product.Rating)">
								</div>
								<a class="review-link">{{product.NumberOfReviews}} Review(s)</a>
							</div>
							<div class="d-flex">
								<div v-if="product.discount_id != null">
                                <h3 class="product-price">{{product.price}}&euro;<del class="product-old-price">{{product.price  - (product.price * product.discount_percent / 100)}}&euro;</del></h3>
                                </div>
                                <div v-else>
                                <h3 class="product-price">{{product.price}}&euro;</h3>
                                </div>
								<span class="product-available d-flex align-items-center">{{ in_stock }}</span>
							</div>
							<div class="add-to-cart" v-if="in_stock == 'In stock'">
								<div class="qty-label">
									Qty
									<div class="input-number">
										<input type="number" v-model="quantity">
									</div>
								</div>
								<br/>
								<br/>
								<button class="add-to-cart-btn" @click="addToCart(product)"><i class="fa fa-shopping-cart"></i> add to cart</button>
							</div>			
							<ul class="product-links">
								<li>Category:</li>
								<li><a>{{product.category_name}}</a></li>
							</ul>
						</div>
					</div>
					<!-- /Product details -->

					<!-- Product tab -->
					<div class="col-md-12">
						<div id="product-tab">
							<!-- product tab nav -->
							<ul class="tab-nav">
								<li class="active"><a data-toggle="tab" href="#tab1">Description</a></li>
							</ul>
							<!-- /product tab nav -->

							<!-- product tab content -->
							<div class="tab-content">
								<!-- tab1  -->
								<div id="tab1" class="tab-pane fade in active">
									<div class="row">
										<div class="col-md-12">
											<p>{{product.description}}</p>
										</div>
									</div>
								</div>
								<!-- /tab1  -->
							</div>
							<!-- /product tab content  -->
						</div>
					</div>
					<!-- /product tab -->
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /SECTION -->

    </div>    
    </template>
    <script>
    export default {
        name: "ProductComponent",
        data: function() {
            return {
                name: "",
				quantity: 1,
                product: {},
				in_stock: true,
            }
        },
        mounted() {
			var that = this
            this.name = this.$route.params.name
            this.$axios.get('models/getSingleProduct.php?name=' + this.name).then(response => {
			that.product = response.data
			if(this.product.in_stock == 0){
				this.in_stock = "Out of stock"
			}
			else{
				this.in_stock = "In stock"
			}
			}).catch(error => {
				console.log(error)
			}
			)
			setTimeout(function(){
				$('footer script').each(function(){
					$(this).remove();
				});
				let Script2 = document.createElement("script");
				Script2.setAttribute("src", "assets/js/mainold.js");
				document.querySelector('footer').appendChild(Script2);
			}, 200);
        },
        computed: {
        },
        methods: {
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
        makeSourceImg: function(img) {
			if(img){
            return 'https://itshoppssite.000webhostapp.com/assets/' + img + '_large.png';
			}
        },
		addToCart: function(p) {
				this.$store.commit("addProductToCart", {product: p , quantity: Number(this.quantity), SingleProduct: true})
		}
        }
    }
    </script>