let product = "Socks";
let description = "A pair of warm, fuzzy socks.";
let eventBus = new Vue()

Vue.component('product-details', {
    data() {
        return {
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        }
    },
    template: `
        <div>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
        </div>
    `
});

Vue.component('product', {
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="image" :alt="altText" />
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p>{{ sale }}</p>
<!--                <p>Shipping: {{ shipping }}</p>-->

                <div class="product-quantity">
                    <p v-if="inStock" class="inStock">In stock</p>
                    <p v-else class="outOfStock">Out of Stock</p>
                </div>

                <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId"
                     :style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(index)"></div>

<!--                <product-details :details="details"></product-details>-->

                <p>Size</p>
                <ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>

                <div v-for="variant in variants" :key="variant.variantId">
                    <p>{{ variant.variantColor }}</p>
                </div>

                <div class="product-name">
                    <p>{{ description }}</p>
                </div>

                <div class="product-a">
                    <a :href="link">More products like this</a>
                </div>
                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to cart</button>
                <button v-on:click="removeFromCart">Remove from Cart</button>
            </div>
<!--            <div>-->
<!--                <h2>Reviews</h2>-->
<!--                <p v-if="!reviews.length">There are no reviews yet.</p>-->
<!--                <ul>-->
<!--                    <li v-for="review in reviews">-->
<!--                        <p>{{ review.name }}</p>-->
<!--                        <p>Rating: {{ review.rating }}</p>-->
<!--                        <p>{{ review.review }}</p>-->
<!--                        <p>Recommendation: {{ review.recommend }}</p>-->
<!--                    </li>-->
<!--                </ul>-->
<!--            </div>-->
            
            <product-tabs :reviews="reviews" :shipping="shipping"></product-tabs>
            
<!--            <product-review @review-submitted="addReview"></product-review>-->
        </div>
    `,
    props: {
        premium: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return {
            product,
            brand: 'Vue Mastery',
            selectedVariant: 0,
            altText: "A pair of socks",
            inventory: 120,
            onSale: true,
            reviews: [],
            description,
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
        };
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        },

    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale() {
            if (this.onSale) {
                return `${this.brand} ${this.product} is on sale!`;
            } else {
                return `${this.brand} ${this.product} is not on sale.`;
            }
        },
        shipping() {
            return this.premium ? "Free" : 2.99;
        },
    },
});

Vue.component('product-detail', {
    template: `
    <ul>
        <li v-for="detail in details" :key="detail">{{ detail }}</li>
    </ul>
    `,
    data() {
        return { details: ['80% cotton', '20% polyester', 'Gender-neutral'] }
    }

})


Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        },
        shipping: {
            type: String,
            required: true
        }
    },
    template: `
     <div>   
       <ul>
         <span class="tab"
               :class="{ activeTab: selectedTab === tab }"
               v-for="(tab, index) in tabs"
               @click="selectedTab = tab"
         >{{ tab }}</span>
       </ul>
       <div v-show="selectedTab === 'Reviews'">
         <p v-if="!reviews.length">There are no reviews yet.</p>
         <ul>
           <li v-for="review in reviews">
           <p>{{ review.name }}</p>
           <p>Rating: {{ review.rating }}</p>
           <p>{{ review.review }}</p>
           </li>
         </ul>
       </div>
       <div v-show="selectedTab === 'Make a Review'">
         <product-review></product-review>
       </div>
       <div v-show="selectedTab === 'Shipping'">
            <p>Shipping : {{ shipping }}</p>
           
        </div>
        <div v-show="selectedTab === 'Details'">
            <product-details></product-details>
        </div>
     </div>
`,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details',],
            selectedTab: 'Reviews'
        }
    },

})

Vue.component('product-review', {
    template: `
   <form class="review-form" @submit.prevent="onSubmit">
   <p v-if="errors.length">
 <b>Please correct the following error(s):</b>
 <ul>
   <li v-for="error in errors">{{ error }}</li>
 </ul>
</p>
 <p>
   <label for="name">Name:</label>
   <input required id="name" v-model="name" placeholder="name">
 </p>

 <p>
   <label for="review">Review:</label>
   <textarea id="review" v-model="review"></textarea>
 </p>

 <p>
   <label for="rating">Rating:</label>
   <select id="rating" v-model.number="rating">
     <option>5</option>
     <option>4</option>
     <option>3</option>
     <option>2</option>
     <option>1</option>
   </select>
 </p>

 <p>
   <label for="recommend">Would you recommend this product?</label>
   <input type="radio" id="yes" value="yes" v-model="recommend"> <label for="yes">Yes</label>
   <input type="radio" id="no" value="no" v-model="recommend"> <label for="no">No</label>
 </p>

 <p>
   <input required type="submit" value="Submit">
 </p>

</form>

 `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: [],
        }
    },
    methods: {
        onSubmit() {
            this.errors = [];
            if (this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend,
                }
                eventBus.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;
            } else {
                if (!this.name) this.errors.push("Name required.");
                if (!this.review) this.errors.push("Review required.");
                if (!this.rating) this.errors.push("Rating required.");
                if (!this.recommend) this.errors.push("Recommendation required.");
            }
        }
    }
});

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeFromCart(id) {
            const index = this.cart.indexOf(id);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        },
    },
});



