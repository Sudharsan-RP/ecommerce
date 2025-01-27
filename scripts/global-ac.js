import { cart } from './cart.js';
import { products } from './products.js'

let productHtml = '';

products.forEach((product) => {
  productHtml = `
 <div class="product-container">
          <div class="image">
            <a href="global-product-info.html" target="_balnk"><img src="${product.image}"></a>
          </div>

          <div class="product-details">
            <div class="name">
              <p>
                ${product.name}
              </p>
            </div>
  
            <div class="rating">
              <div class="stars">&#9733; &#9733; &#9733; &#9733; ${product.rating.stars}</div>
              <div class="counts">&#10555; ${product.rating.reviews}</div>
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
            <div class="button">
              <button class="js-add-to-cart" data-product-id = ${product.id} data-product-image = ${product.image}>
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
    cartButton.addEventListener('click', () => {

      const productId = cartButton.dataset.productId;
      const productImage = cartButton.dataset.productImage;
      let matchingItem;

      cart.forEach((item) => {
        if(productId === item.productId){
          matchingItem = item; 
        }
      
      })
      
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity = Number(quantitySelector.value);

      if (matchingItem) {
        matchingItem.quantity += 1;      
      }else {
        cart.push ({
            productId: productId,
            quantity: quantity,
            productImage: productImage
          })
      }

      console.log(cart);
      let cartQuantity = 0;

      cart.forEach((total) => {
       cartQuantity += total.quantity;
       if (cartQuantity > 0) {
        document.querySelector('.logo-cart').classList.add('cart-logo');
       }
        document.querySelector('.total')
            .innerHTML = cartQuantity;
        
      })

    })
  })
  
});


