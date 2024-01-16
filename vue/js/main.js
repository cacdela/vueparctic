let product = "Socks";
let description = "A pair of warm, fuzzy socks."

let app = new Vue({
    el: '#app',
    data: {
        product,
        image: "./assets/vmSocks-blue-onWhite.jpg",
        altText: "A pair of socks",
        description,
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
     }     
 }) 
