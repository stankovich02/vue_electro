<template>
    <div>
		<div id="breadcrumb" class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-12">
						<h3 class="breadcrumb-header">Checkout</h3>
						<ul class="breadcrumb-tree">
							<li><a href="#">Home</a></li>
							<li class="active">Checkout</li>
						</ul>
					</div>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /BREADCRUMB -->

		<!-- SECTION -->
		<div class="section" v-if="!validOrder">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">

					<div class="col-md-7">
						<!-- Billing Details -->
						<div class="billing-details">
							<div class="section-title">
								<h3 class="title">Billing address</h3>
							</div>
							<ValidationProvider name="First name" rules="required|min:3" v-slot="{ errors }">
								<TextInput :error="errors[0]" id="firstname" placeholder="First name..." v-model="firstName"/>
							</ValidationProvider>
							<ValidationProvider name="Last name" rules="required|min:3" v-slot="{ errors }">
								<TextInput :error="errors[0]" id="lastname" placeholder="Last name..." v-model="lastName"/>
							</ValidationProvider>
							<ValidationProvider name="Email" rules="emailRegex" v-slot="{ errors }">
								<TextInput :error="errors[0]" id="email" placeholder="Email..." v-model="email"/>
							</ValidationProvider>
							<ValidationProvider name="Address" rules="required|min:3" v-slot="{ errors }">
								<TextInput :error="errors[0]" id="address" placeholder="Address..." v-model="address"/>
							</ValidationProvider>
							<ValidationProvider name="City" rules="required|min:3" v-slot="{ errors }">
								<TextInput :error="errors[0]" id="City" placeholder="City..." v-model="city"/>
							</ValidationProvider>
							<ValidationProvider name="Country" rules="required|min:3" v-slot="{ errors }">
								<TextInput :error="errors[0]" id="country" placeholder="Country..." v-model="country"/>
							</ValidationProvider>
							<ValidationProvider name="Zip code" rules="required|min:5|numeric" v-slot="{ errors }">
								<TextInput :error="errors[0]" id="zipcode" placeholder="Zip code..." v-model="zipCode"/>
							</ValidationProvider>
							<ValidationProvider name="Notes" rules="" v-slot="{ errors }">
								<TextInput :multiline="true" :error="errors[0]" id="notes" v-model="notes" placeholder="Order notes..."/>
							</ValidationProvider>
						</div>
						<div class="" v-if="error">
						<br>
							<div class="alert alert-danger text-center fs-3">
								{{ error }}
							</div>
						</div>
						<!-- /Billing Details -->
					</div>
					
					<!-- Order Details -->
					<div class="col-md-5 order-details">
						<div class="section-title text-center">
							<h3 class="title">Your Order</h3>
						</div>
						<div class="order-summary">
							<div class="order-col">
								<div><strong>PRODUCT</strong></div>
								<div><strong>TOTAL</strong></div>
							</div>
							<div class="order-products">
								<div class="order-col" v-for="p in cartProducts" :key="p.product_id">
									<div>{{p.quantity}}x {{ p.name }}</div>
									<div>{{ p.quantity * p.price}}&euro;</div>
								</div>
							</div>
							<div class="order-col">
								<div>Shiping</div>
								<div><strong>FREE</strong></div>
							</div>
							<div class="order-col">
								<div><strong>TOTAL</strong></div>
								<div><strong class="order-total">{{totalPrice}}&euro;</strong></div>
							</div>
						</div>
						<div class="payment-method">
							<RadioButtons label="Payment type:" :items="payments" v-model="paymentType"/>
						</div>
						<div class="input-checkbox">
							<input type="checkbox" id="terms" v-model="terms">
							<label for="terms">
								<span></span>
								I've read and accept the <a href="#">terms & conditions</a>
							</label>
						</div>
						<a href="#" class="primary-btn order-submit" @click="placeOrder">Place order</a>
					</div>
					<!-- /Order Details -->
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<div v-else>
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="alert alert-success text-center fs-1">
							Order placed successfully!
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- /SECTION -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

    export default {
        name: "CheckoutComponent",
		data() {
			return {
				payments:{
                0: "Direct payment",
                1: "Paypal"
            	},
				firstName: "",
				lastName: "",
				email: "",
				address: "",
				city: "",
				country: "",
				zipCode: "",
				notes: "",
				terms: false,
				paymentType: null,
				totalPrice: 0,
				error: "",
				validOrder: false
			}
		},
		computed: {
		...mapGetters(['cartProducts'])
		},
		mounted() {
			if(this.cartProducts.length > 0) {
			let price = 0;
			this.cartProducts.forEach(p => {
				price += p.price * p.quantity;
			});
			this.totalPrice = price;
			}
			else{
				this.$router.push("/");
			}
		},
		methods: {
			placeOrder: function(){
				if(!this.firstName || !this.lastName || !this.email || !this.address || !this.city || !this.country || !this.zipCode){
					this.error = "Please fill all fields.";
					return;
				}
				if(this.paymentType == null){
					this.error = "Please choose payment type.";
					return;
				}
				if(!this.terms){
					this.error = "Please accept terms and conditions.";
					return;
				}
				this.error = "";
				this.cartProducts.forEach(p => {
					this.$store.commit('removeProductFromCart', p.product_id);
				});
				this.validOrder = true;
				setTimeout(() => {
					this.$router.push("/");
				}, 3000);
			}
		}
    }
</script>