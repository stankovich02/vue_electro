<template>
    <!-- NAVIGATION -->
		<nav id="navigation">
			<!-- container -->
			<div class="container">
				<!-- responsive-nav -->
				<div id="responsive-nav">
					<!-- NAV -->
					<ul class="main-nav nav navbar-nav">
						<li v-for="link in links" :key="link.path" v-role="link.role" class=""><router-link :to="link.path">{{link.text}}</router-link></li>
					</ul>
					<!-- /NAV -->
				</div>
				<!-- /responsive-nav -->
			</div>
			<!-- /container -->
		</nav>
		<!-- /NAVIGATION -->
</template>
<script>
export default {
    name: 'NavComponent',
    data () {
        return {
			links: [
				{ 
					path: "/", 
					text: "Home" ,
					role: ["admin","user","unauthorized"]
				},
				{ 
					path: "/store", 
					text: "Store",
					role: ["admin","user","unauthorized"]
				}
            ]
        }
    }
}
</script>