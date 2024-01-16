let product = "Socks";
let description = "A pair of warm, fuzzy socks."

let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
    }
})

let appP = new Vue({
    el: '#appP',
    data: {
        description
    }
})