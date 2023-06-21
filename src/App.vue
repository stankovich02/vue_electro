<template>
  <div id="app">
    <Head/>
    <body>
      <Header/>
      <Nav/>
    <main id="main">
      <router-view @refresh="refreshPage(page)"></router-view>
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
  }
}
</script>
<style>
</style>
