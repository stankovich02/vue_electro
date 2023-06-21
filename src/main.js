import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Main from './components/pages/Main.vue'
import Store from './components/pages/Store.vue'
import Checkout from './components/pages/Checkout.vue'
import Wishlist from './components/pages/Wishlist.vue'
import Product from './components/pages/Product.vue'
import Admin from './components/pages/Admin.vue'
import Login from './components/pages/Login.vue'
import Register from './components/pages/Register.vue'
import EditProduct from './components/pages/EditProduct.vue'
import InsertProduct from './components/pages/InsertProduct.vue'
import TextInput from "./components/forms/TextInput"
import DropDown from "./components/forms/DropDown"
import RadioButtons from "./components/forms/RadioButtons"
import Button from "./components/forms/Button"
import store from "./store/store.js"
import RoleDirective from "./directives/RoleDirective.js"
import { ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { localize } from 'vee-validate';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.directive("role", RoleDirective)
const instance = axios.create({
  baseURL: "https://itshoppssite.000webhostapp.com/"
})

localize({
  en: {
    messages: {
      required: 'This field is required',
      min: 'This field must have no less than {length} characters',
      max: (_, { length }) => `this field must have no more than ${length} characters`
    }
  }
});
Vue.component('ValidationProvider', ValidationProvider);
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

extend('emailRegex', value => {
  if (value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    return true;
  }
  return 'Email must be valid. Example: peraperic@gmail.com';
})
extend('usernameRegex', value => {
  if (value.match(/^[a-z0-9_-]{3,15}$/)) {
    return true;
  }
  return 'Username must be 3-15 characters long and can only contain lowercase letters, numbers, underscores and dashes. Example: pera123';
});
extend('passwordRegex', value => {
  if (value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/)) {
    return true;
  }
  return 'Password must be 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character. Example: Pera123!';
});

Vue.component("TextInput", TextInput)
Vue.component("Button", Button)
Vue.component("DropDown", DropDown)
Vue.component("RadioButtons", RadioButtons)

Vue.prototype.$axios = instance;
Vue.config.productionTip = false

Vue.use(VueRouter)
var routes = [
  { path: "/", component: Main },
  { path: "/store", component: Store },
  { path: "/product/:name", component: Product },
  { path: "/wishlist", component: Wishlist},
  { path: "/checkout", component: Checkout},
  { path: "/admin/:table", component: Admin},
  { path: "/login", component: Login},
  { path: "/register", component: Register},
  { path: "/edit-product/:id", component: EditProduct},
  { path: "/insert-product", component: InsertProduct},

]
var router = new VueRouter({routes})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
