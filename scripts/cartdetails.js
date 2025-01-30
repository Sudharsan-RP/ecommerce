
async function fetchCartItems() {
  try {
    const response = await fetch('http://localhost:3000/cart');
    const cartItems = await response.json();
    console.log(cartItems.cartItems);

    const data = cartItems.cartItems;
    const message = document.querySelector('.message');
    const productInfo = document.querySelector('.product-info');
     if(data.length === 0) {
        productInfo.innerHTML = '';
      message.innerHTML = `<h3> your cart is empty </h3>`
      return;
     }
    
     let cartHtml = '';

    data.forEach((item) => {
      console.log(item._id);
      // const id = item._id.toString();

      cartHtml = 
      `<div class="bottom-container">
            <div class="img"><img src="${item.productImage}" alt="electronics"></div>

            <div class="details">
                <div class="name">
                    ${item.productName}
                </div>
                <div class="quantity">
                    <button onclick="removeItem(${item._id})"> - </button>
                    <p class="count"> ${item.quantity} </p>
                    <button onclick="increaseQuantity(${item._id}, ${item.quantity})"> + </button>
                </div>
            </div>
        </div>
        <div class="price">
            <p>${item.productPrice}</p>
        </div>
      `
        
      document.querySelector('.bottom')
        .innerHTML += cartHtml;

      const total = data.length;
      console.log(total)
      document.getElementById('total-quantity').innerHTML = total;
    })
  } catch(err) {
    console.log('error fetching cart items :', err);
  }
};

async function increaseQuantity(itemId, currentQuantity) {
  const newQuantity = currentQuantity + 1;

  try {
    const response = await fetch(`http://localhost:3000/cart/product/${itemId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: newQuantity })
    });

    if(!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'failed to update quantity')
    }

    const result = await response.json();
    
    alert('quantity updated successfully');
    fetchCartItems();
    document.querySelector('.message').innerHTML = result.message || result.error;
  } catch (err) {
    console.log(err.message);
  }
}

async function removeItem(id) {
  try {
    const response = await fetch(`http://localhost:3000/cart/product/${ id }`, {
      method: 'DELETE'
    });
  
    if(!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error)
    }
  
    await response.json();
    fetchCartItems();
    alert('item removed successfully');
  }catch(err) {
    alert(err.message);
  }
}
window.onload = fetchCartItems;