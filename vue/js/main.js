let product = "Socks";
let description = "A pair of warm, fuzzy socks."

let app = new Vue({
    el: '#app',
    data: {
        product,
        image: "./assets/vmSocks-blue-onWhite.jpg",
        altText: "A pair of socks"
     }     
 }) 

let appP = new Vue({
    el: '#appP',
    data: {
        description
    }
})