<template>
    <div class="container">
        <h1 class="text-center mt-5">{{table.toUpperCase()}}</h1>
        <router-link to="/insert-product"><a class="btn btn-primary mt-auto my-5">Add new product</a></router-link>
        <table class="table table-bordered">
            <thead class="thead-dark">
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Discount(%)</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Image</th>
                <th>Stock</th>
                <th>Edit</th>
                <th>Delete</th>
            </thead>
            <tbody>
                <tr v-for="p of pagedProducts" :key="p.product_id">
                    <td>{{p.product_id}}</td>
                    <td>{{p.name}}</td>
                    <td>{{p.price}}&euro;</td>
                    <td>{{p.discount_percent}}</td>
                    <td>{{returnBrandName(p.brand_id)}}</td>
                    <td>{{returnCatName(p.category_id)}}</td>
                    <td><img :src="returnImgSrc(p.image_src)" :alt="p.name" class="pictureTable"></td>
                    <td>{{returnStock(p.in_stock)}}</td>
                    <td><button class="btn btn-primary" @click="editProduct(p.product_id)">Edit</button></td>
                    <td><button class="btn btn-danger" @click="deleteProduct(p.product_id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
        <ul class="store-pagination">
		</ul>
    </div>

</template>
<script>
import {mapGetters} from 'vuex';
    export default{
        data() {
        return {
            table : this.$route.params.table,
            pagedProducts: [],
            categories: [],
            brands: [],
            viewpage: 1,
            perPage: 10
        }
    },
        name:"AdminComponent",
        computed:{
            ...mapGetters(["products"])
        },
        mounted(){
            let user = JSON.parse(localStorage.getItem('user'));
            if(user == null){
                this.$router.push('/login');
            }
            if(user.role != "admin"){
                    this.$router.push('/');
            }
            var that = this;
            this.$axios.get("models/getDataForID.php?table=brand&getData=true").then(response => {
                that.brands = response.data;
            }).catch(error => {
                console.log(error);
            });
            this.$axios.get("models/getDataForID.php?table=category&getData=true").then(response => {
                that.categories = response.data;
            }).catch(error => {
                console.log(error);
            });
            this.makePagination();
            let paginations = document.querySelectorAll('.store-pagination li');
            paginations.forEach(pagination => {
                pagination.addEventListener('click', () => {
                    this.viewpage = pagination.textContent;
                    this.pagedProducts = this.products.slice((this.viewpage - 1) * this.perPage, this.viewpage * this.perPage)
                })
            })
            this.pagedProducts = this.products.slice((this.viewpage - 1) * this.perPage, this.viewpage * this.perPage)
        },
        methods:{
            makePagination(){
                let html = '';
                let numOfPages = Math.ceil(this.products.length / 10);
                for(let i = 1; i <= numOfPages; i++){
                    html += `<li class="pagination ${i == this.viewpage ? "active" : ""}"><a href="#">${i}</a></li>`;
                }
                document.querySelector('.store-pagination').innerHTML = html;
                let paginations = document.querySelectorAll('.store-pagination li');
                paginations.forEach(pagination => {
                    pagination.addEventListener('click', () => {
                        this.viewpage = pagination.textContent;
                    })
                })
		    },
            returnImgSrc(src){
			    return src + '_small.png';
		    },
            returnCatName(id){
                for(let c of this.categories){
                    if(c.category_id == id){
                        return c.category_name;
                    }
                }
            },
            returnStock(stock){
                if(stock == 1){
                    return "In stock";
                }
                else{
                    return "Out of stock";
                }
            },
            returnBrandName(id){
                for(let b of this.brands){
                    if(b.brand_id == id){
                        return b.brand_name;
                    }
                }
            },
            editProduct: function(id) {
			    this.$router.push("/edit-product/" + id)
            },
            deleteProduct: function(id){
                this.$store.commit("deleteProduct", id)
            }       
        },
        watch:{
            products(){
                if(this.products.length % this.perPage == 0 && this.viewpage > this.products.length / this.perPage){
                    this.viewpage = this.viewpage - 1;
                }
                this.pagedProducts = this.products.slice((this.viewpage - 1) * this.perPage, this.viewpage * this.perPage)
                this.makePagination()
            },
            viewpage(){
                this.pagedProducts = this.products.slice((this.viewpage - 1) * this.perPage, this.viewpage * this.perPage)
                $(".pagination").each(function(){
				$(this).removeClass('active');
			})
			$(".pagination").eq(this.viewpage - 1).addClass('active');
            }
        }
    }
</script>
<style>
.pictureTable{
    width: 100px;
}
table th{
    text-align: center;
    padding: 10px 0px;
}
td{
    vertical-align: middle!important;
    text-align: center;
}
</style>