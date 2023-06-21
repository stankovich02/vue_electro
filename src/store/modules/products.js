import products from "../sources/products.json"

export default {
    state: {
      searchObj: { keyword : null, minPrice : null, maxPrice : null, sort: null ,choosedCategories : [], choosedBrands : [] },
      products: products
    },
    mutations: {
      filterByKeyword(state, keyword) {
        state.searchObj.keyword = keyword
      },
      filterByCategory(state, categories) {
        state.searchObj.choosedCategories = categories
      },
      filterByBrand(state, brands) {
        state.searchObj.choosedBrands = brands
      },
      filterByPrice(state, obj) {
        state.searchObj.minPrice = Number(obj.minPrice)
        state.searchObj.maxPrice = Number(obj.maxPrice)
      },
      sortProducts(state, sort) {
        state.searchObj.sort = sort
      },
      changePerPage(state, perPage) {
        state.searchObj.perPage = perPage
      },
      resetProducts(state) {
        state.searchObj = { keyword : null, minPrice : null, maxPrice : null, sort: null ,choosedCategories : [], choosedBrands : [] }
        
      },
      insertProduct(state, productObj) {
        let product = {
          product_id: state.products.length + 1,
          name: productObj.name,
          price: productObj.price,
          category_id: productObj.category_id,
          brand_id: productObj.brand_id,
          discount_percent: productObj.discount_percent,
          in_stock: productObj.in_stock,
          image_src: productObj.image_src,
          image_alt: productObj.name,
          discount_id: productObj.discount_percent > 0 ? state.products.length + 1 : null,
          Rating: null,
          NumberOfReviews: "0"
        }
        state.products.push(product);
      },
      updateProduct(state, productObj) {
        let product = state.products.find(x => x.product_id == productObj.id)
        product.name = productObj.name
        product.price = productObj.price
        product.category_id = productObj.category_id
        product.brand_id = productObj.brand_id
        product.discount_percent = productObj.discount_percent
        product.in_stock = productObj.in_stock,
        product.image_src = productObj.image_src
        product.image_alt = productObj.name
      },
      deleteProduct(state, id) {
        state.products = state.products.filter(x => x.product_id != id)
      }
    },
    getters: {
      products(state) {
          let filter = [];
          filter = state.products
          if(state.searchObj.keyword) {
            filter = filter.filter(function(p) {
              return p.name.toLowerCase().includes(state.searchObj.keyword.toLowerCase().trim())
            }) 
          }
          if(state.searchObj.choosedCategories.length > 0) {
            filter = filter.filter(el => state.searchObj.choosedCategories.includes(el.category_id))
          }
          if(state.searchObj.choosedBrands.length > 0) {
            filter = filter.filter(el => state.searchObj.choosedBrands.includes(el.brand_id))
          }
          if(state.searchObj.minPrice >= 0 && state.searchObj.maxPrice) {
            filter = filter.filter(el => el.price >= state.searchObj.minPrice)
            filter = filter.filter(el => el.price <= state.searchObj.maxPrice)
          }
          if(state.searchObj.sort) {
            filter = filter.sort((a, b) => {
              if(state.searchObj.sort == 'name-asc') {
                return a.name.localeCompare(b.name)
              }
              else if(state.searchObj.sort == 'name-desc') {
                return b.name.localeCompare(a.name)
              }
              else if(state.searchObj.sort == 'price-asc') {
                return a.price - b.price
              }
              else if(state.searchObj.sort == 'price-desc') {
                return b.price - a.price
              }
              else if(state.searchObj.sort == 'newest') {
                return b.product_id - a.product_id
              }
              else if(state.searchObj.sort == '0') {
                return a.product_id - b.product_id
              }
            } )
          }
          if(filter.length == 0 && (state.searchObj.keyword || state.searchObj.choosedCategories.length > 0 || state.searchObj.choosedBrands.length > 0 || state.searchObj.sort || state.searchObj.minPrice || state.searchObj.maxPrice)) {
            return [];
          }
          else if (!(state.searchObj.keyword || state.searchObj.choosedCategories.length > 0 || state.searchObj.choosedBrands.length > 0 || state.searchObj.sort || state.searchObj.minPrice || state.searchObj.maxPrice)){
            return state.products
          }
          else {
            return filter
          }
        }
    }
}