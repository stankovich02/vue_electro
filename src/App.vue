<template>
  <div id="app">
    <Head/>
    <body>
      <Header :headerLinks="headerLinks" :user="userLoggedIn"/>
      <Nav :links="links"/>
    <main id="main">
      <router-view @userLoggedIn="changeNav()"></router-view>
    </main>
    <Footer/>
    </body>
  </div>
</template>

<script>
import Head from './components/Head.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
export default {
  name: 'App',
  data () {
        return {
        userLoggedIn: false,
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
        ],
        headerLinks:[
            {
              to: "/login",
              text: "Login"
            },
            {
              to: "/register",
              text: "Register"
            }
        ]
        }
    },
  components: {
    Head,
    Footer,
    Header,
    Nav
  },
  mounted(){
    let Script = document.createElement("script");
    Script.setAttribute("src", "assets/js/jquery.min.js");
    document.head.appendChild(Script); 
    let Script5 = document.createElement("script");
    Script5.setAttribute("src", "assets/js/nouislider.min.js");
    document.head.appendChild(Script5);
    setTimeout(function(){
    let Script3 = document.createElement("script");
    Script3.setAttribute("src", "assets/js/bootstrap.min.js");
    document.head.appendChild(Script3);
    }, 50);
  },
  methods: {
    changeNav: function(){
      let user = JSON.parse(localStorage.getItem('user'));
      if(user != null && user.role == "admin") {
        this.headerLinks = [
          {
            to: "/admin/products",
            text: "Admin"
          },
        ]
      }
      else if(user != null) {
        this.headerLinks = [];
      }
      else{
        this.headerLinks = [
          {
            to: "/login",
            text: "Login"
          },
          {
            to: "/register",
            text: "Register"
          }
        ]
      }
      this.userLoggedIn = true;
     
      
    }
  }
}
</script>
<style>
</style>
