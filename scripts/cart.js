// let cart = JSON.parse(localStorage.getItem('Cart')) || [];

// const { json } = require("body-parser");

// localStorage.setItem('Cart' , JSON.stringify('cart'))
export let cart = [
  {
    productId: '1',
    quantity: 1,
    productImage: '/images/product-img/panasonic-fridge2.webp',
    name: 'Whirlpool 300 L Frost Free    Triple-Door Refrigerator(FP 343D Protton Roy, Alpha Steel)'
  },{
      productId: '2',
      quantity: 2,
      productImage: '/images/product-img/fridge.webp',
      name: 'Whirlpool 184 L 2 Star Direct-Cool Single Door Refrigerator (205 WDE PRM 2S SAPPHIRE BLOOM-Z, 2023 Model)'
  }
];

// localStorage.setItem('cartItems', JSON.stringify(cart));

// let getItem = JSON.parse(localStorage.getItem('cartItems'));

// console.log(getItem);
console.log(cart);

// let deliveryDate = new Date();
// console.log(deliveryDate);

// const todayDate = deliveryDate.getUTCDate();
// console.log(todayDate);

// const todayMonth = deliveryDate.getMonth();
// console.log(todayMonth);

// const freeDelivery = todayDate + 7;
// console.log(freeDelivery)

// export default cart;

