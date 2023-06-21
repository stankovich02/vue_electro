<template>
		<!-- FOOTER -->
		<footer id="footer">
			<!-- top footer -->
			<div class="section">
				<!-- container -->
				<div class="container">
					<!-- row -->
					<div class="row">
						<div class="col-md-6 col-xs-6">
							<div class="footer">
								<ul class="footer-links">
									<li><a href="#"><i class="fa fa-map-marker"></i>1734 Stonecoal Road</a></li>
									<li><a href="#"><i class="fa fa-phone"></i>+021-95-51-84</a></li>
									<li><a href="#"><i class="fa fa-envelope-o"></i>office@electro.com</a></li>
								</ul>
							</div>
						</div>
						<div class="col-md-6 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">Quick Menu</h3>
								<ul class="footer-links">
									<li v-for="link in links" :key="link.path" class=""><router-link :to="link.path">{{link.text}}</router-link></li>
								</ul>
							</div>
						</div>
					</div>
					<!-- /row -->
				</div>
				<!-- /container -->
			</div>
			<!-- /top footer -->

			<!-- bottom footer -->
			<div id="bottom-footer" class="section">
				<div class="container">
					<!-- row -->
					<div class="row">
						<div class="col-md-12 text-center">
							<ul class="footer-payments">
								<li><a href="#"><i class="fa fa-cc-visa"></i></a></li>
								<li><a href="#"><i class="fa fa-credit-card"></i></a></li>
								<li><a href="#"><i class="fa fa-cc-paypal"></i></a></li>
								<li><a href="#"><i class="fa fa-cc-mastercard"></i></a></li>
								<li><a href="#"><i class="fa fa-cc-discover"></i></a></li>
								<li><a href="#"><i class="fa fa-cc-amex"></i></a></li>
							</ul>
						</div>
					</div>
						<!-- /row -->
				</div>
				<!-- /container -->
			</div>
			<!-- /bottom footer -->
		</footer>
		<!-- /FOOTER -->
</template>
<script>
export default {
    name: 'FooterComponent',
    data() {
        return {
            links: [
              { path: "/", text: "Home" },
              { path: "/store", text: "Store"},
			  { path: "/cart", text: "Cart"},
            ]
        }
    },
    methods: {
        
    },
    mounted() {
    }
}
</script>