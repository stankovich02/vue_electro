<template>
    <div class="mx-auto w-25 py-5">
        <ValidationProvider name="Name" rules="required|min:5" v-slot="{ errors }">
            <TextInput :error="errors[0]" id="name" label="Name*:" v-model="name"/>
        </ValidationProvider>
        <ValidationProvider name="Price" rules="required|min_value:1" v-slot="{ errors }">
            <TextInput type="number" :error="errors[0]" id="price" label="Price:*" v-model="price"/>
        </ValidationProvider>
        <DropDown v-model="brand_id" textProperty="brand_name" valueProperty="brand_id" :options="this.brands" id="ddlBrands" label="Brand:*"/>
        <DropDown v-model="category_id" textProperty="category_name" valueProperty="category_id" :options="this.categories" id="ddlCategories" label="Category:*"/>
        <TextInput type="number"  id="discount" label="Discount(%):" v-model="discount_percent"/>
        <RadioButtons label="Stock:*" :items="stock" v-model="in_stock"/>
        <ValidationProvider name="Image" rules="required" v-slot="{ errors }">
            <TextInput id="image" :error="errors[0]" label="Image:*" v-model="image_src"/>
        </ValidationProvider>
        <img :src="returnImgSrc(image_src)" :alt="name" class="img-fluid"/>
        <div v-if="error" class="alert p-3 mt-2 fs-4 alert-danger text-center" role="alert">
            {{ error }}
        </div>
        <div class="mt-5 text-center">
            <Button buttonText="Edit" @wasClicked="edit()"/>
        </div>
       </div>    
    </template>
    <script>
    import { mapGetters } from "vuex"
    export default {
    name: "EditProduct",
    data() {
        return {
            name: "",
            brand_id: 0,
            brands: [],
            categories: [],
            category_id: 0,
            product_id: 0,
            image_src: null,
            image_alt: null,
            discount_percent: 0,
            in_stock: 0,
            price: 0,
            stock:{
                0: "Out of Stock",
                1: "In Stock"
            },
            error: ""
        };
    },
    mounted() {
        var that = this;
        let categoryParams = {
                    table: "category",
                    getData: true
        }
        let brandParams = {
                table: "brand",
                getData: true
        }
        this.$axios.get("models/getDataForID.php", {params: brandParams}).then(response => {
            that.brands = response.data;
        }).catch(error => {
            console.log(error);
        });
        this.$axios.get("models/getDataForID.php", {params: categoryParams}).then(response => {
            that.categories = response.data;
        }).catch(error => {
            console.log(error);
        });
        if (this.$route.params.id) {
            for (let p of this.products) {
                if (p.product_id == this.$route.params.id) {
                    this.product_id = p.product_id,
                        this.image_src = p.image_src,
                        this.price = p.price,
                        this.name = p.name,
                        this.brand_id = p.brand_id,
                        this.category_id = p.category_id,
                        this.in_stock = p.in_stock,
                        this.discount_percent = p.discount_percent
                }
            }
        }
    },
    computed: {
        ...mapGetters(["products"])
    },
    methods: {
        returnImgSrc(src){
			return src + '_small.png';
		},
        edit: function () {
            if(!this.name || !this.price || !this.in_stock || !this.image_src || !this.brand_id || !this.category_id) {
                this.error = "Fields with * are required.";
                return;
            }
            this.$store.commit("updateProduct", { id: this.product_id, name: this.name, price: this.price, brand_id: this.brand_id, category_id: this.category_id, discount_percent: this.discount_percent, in_stock: this.in_stock, image_src: this.image_src});
            this.$router.push("/admin/products");
        }
    }
}
    </script>