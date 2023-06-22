<template>
    <div class="mx-auto w-25 py-5">
        <ValidationProvider name="Name" rules="required|min:5" v-slot="{ errors }">
            <TextInput :error="errors[0]" id="name" label="Name:*" v-model="name"/>
        </ValidationProvider>
        <ValidationProvider name="Price" rules="required|min_value:1" v-slot="{ errors }">
            <TextInput :error="errors[0]" type="number"  id="price" label="Price:*" v-model="price"/>
        </ValidationProvider>
        <DropDown v-model="brand_id" textProperty="brand_name" valueProperty="brand_id" :options="this.brands" id="ddlBrands" label="Brand:*"/>
        <DropDown v-model="category_id" textProperty="category_name" valueProperty="category_id" :options="this.categories" id="ddlCategories" label="Category:*"/>
        <TextInput type="number"  id="discount" label="Discount(%):" v-model="discount_percent"/>
        <RadioButtons label="Stock:*" :items="stock" v-model="in_stock"/>
        <ValidationProvider name="Image" rules="required" v-slot="{ errors }">
            <TextInput :error="errors[0]"  id="image" label="Image:*" v-model="image_src"/>
        </ValidationProvider>
        <img :src="returnImgSrc(image_src)" :alt="name" class="img-fluid"/>
        <div v-if="error" class="alert p-3 mt-2 fs-4 alert-danger text-center" role="alert">
            {{ error }}
        </div>
        <div class="mt-5 text-center">
            <Button buttonText="Insert" @wasClicked="insert()"/>
        </div>
       
       </div>    
    </template>
    <script>
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
            discount_percent: null,
            in_stock: null,
            price: null,
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
    },
    methods: {
        returnImgSrc(src, imgSize){
			return src + '_small.png';
		},
        insert: function () {
            if(!this.name || !this.price || !this.in_stock || !this.image_src || !this.brand_id || !this.category_id) {
                this.error = "Fields with * are required.";
                return;
            }
            this.$store.commit("insertProduct", { name: this.name, price: this.price, brand_id: this.brand_id, category_id: this.category_id, discount_percent: this.discount_percent, in_stock: this.in_stock, image_src: this.image_src});
            this.$router.push("/admin/products");
        }
    }
}
    </script>