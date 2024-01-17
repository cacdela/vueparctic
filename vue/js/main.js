let product = "Socks";
let description = "A pair of warm, fuzzy socks.";

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
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
                <p>Shipping: {{ shipping }}</p>

                <div class="product-quantity">
                    <p v-if="inStock" class="inStock">In stock</p>
                    <p v-else class="outOfStock">Out of Stock</p>
                </div>

                <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId"
                     :style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(index)"></div>

                <product-details :details="details"></product-details>

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

                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">
                    Add to cart
                </button>
            </div>
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
            description,
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
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
            this.$emit('remove-from-cart');
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
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
    },
});
