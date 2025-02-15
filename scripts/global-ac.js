// import { cart } from './cart.js';
import { products } from './products.js'


//add product dynamically
let productHtml = '';

products.forEach((product) => {
  productHtml = `
 <div class="product-container">
          <div class="image">
            <a href="global-product-info.html" target="_balnk" height="${product.height}" width="${product.width}"><img src="${product.image}"></a>
          </div>

          <div class="product-details">
            <div class="name">
              <p>
                ${product.name}
              </p>
            </div>
  
            <div class="rating">
              <div class="stars">&#9733; &#9733; &#9733; &#9733; ${product.rating.stars}</div>
              <div class="counts">&#10555; ${product.rating.reviews} reviews</div>
            </div>
            <div class="bought">
              20+ bought in past month
            </div>
            <div class="price">₹${product.price}</div>
            <div class="delivery-date">
              FREE delivery as soon as Fri, 27 Dec, 7 am - 9 pm
            </div>
  
            <div class="quantity">
              <span>quantity</span>
              <select name="quantity" class="js-quantity-selector-${product.id}">
                <option value="1"> 1 </option>
                <option value="2"> 2 </option>
                <option value="3"> 3 </option>
                <option value="4"> 4 </option>
                <option value="5"> 5 </option>
              </select>
            </div>
            <div id="message"></div>
            <div class="button">
              <button type="submit" class="js-add-to-cart" data-product-id = ${product.id} data-product-image = ${product.image} data-product-name = ${product.name} data-product-price = ${product.price}>
                add to cart
              </button>
              <button>buy now</button>
            </div>
          </div>

        </div>
`
document.querySelector('.products-grid')
  .innerHTML += productHtml;

document.querySelectorAll('.js-add-to-cart')
  .forEach((cartButton) => {
    cartButton.addEventListener('click', async(e) => {
      e.preventDefault();

      const productId = cartButton.dataset.productId;
      const productImage = cartButton.dataset.productImage;
      const productName = cartButton.dataset.productName;
      const productPrice = cartButton.dataset.productPrice;

      let matchingItem;
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity = Number(quantitySelector.value);


      //post the data in db
      const response = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, productName, productPrice, quantity, productImage })
      });

      const data = await response.json();

      updateCartQuantity();  //update total cart when product added

      document.getElementById('message')
        .innerHTML = data.message || data.error;
  
    })
  })
  
});

const updateCartQuantity = async () => {
  try {
    // Fetch total cart data from DB
    const response = await fetch('http://localhost:3000/cart');
    const totalData = await response.json();
    const totalCart = totalData.cartItems;

    // Calculate total quantity from all items in the cart
    let totalQuantity = totalCart.reduce((sum, item) => sum + item.quantity, 0);

    // Update cart quantity display
    document.querySelector('.total').innerHTML = totalQuantity;
  } catch (error) {
    console.error('Error fetching cart data:', error);
  }
};

// Run once on page load to update cart count
updateCartQuantity();



document.querySelector('.service').addEventListener('click', () => {
  document.querySelector('.div')
    .innerHTML = `
       <a href="serviceform.html" target="_blank">
       <button class="div1">booking</button>
       </a>

       <a href="serviceProducts.html" target="_blank">
       <button class="div2">service order</button>
       </a>             
    `
    document.querySelector('.header').classList.add('extra-width')
})

document.querySelector('.contact').addEventListener('click', () => {
  document.querySelector('.list')
    .innerHTML = 
    `
      <div class="contact-list">
        <a href="tel: +9150845925"><div class="phone">call</div></a>
        <div class="facebook">facebook</div>
        <div class="insta">insta</div>
        <div class="twitter">twitter</div>
        <a href="mailto: sudharsanrp2905@gmail.com"><div class="mail">mail</div></a>
      </div>
     `
     
//   let getClass = document.querySelector('.list');
//   const addClass = getClass.getAttribute('class') === "list"
//    ? "display"
//       : "list";
//   getClass.setAttribute('class', addClass);
})

