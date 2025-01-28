
async function fetchCartItems() {
  try {
    const response = await fetch('http://localhost:3000/cart');
    const cartItems = await response.json();
    console.log(cartItems.cartItems);

    const data = cartItems.cartItems;
    const bottom = document.querySelector('.bottom');
     if(data.length === 0) {
      bottom.innerHTML = `<h3> your cart is empty </h3>`
      return;
     }
    
     let cartHtml = '';

    data.forEach((item) => {
      console.log(item);

      cartHtml = 
      `<div class="bottom-container">
            <div class="img"><img src="${item.productImage}" alt="electronics"></div>

            <div class="details">
                <div class="name">
                    ${item.productName}
                </div>
                <div class="quantity">
                    <button> - </button>
                    <p class="count"> ${item.quantity} </p>
                    <button> + </button>
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
    const response = await fetch(`http://localhost:3000/cart/${itemId}`, {
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
  } catch (err) {
    console.log(err.message);
  }
}

async function removeItem(id) {
  try {
    const response = await fetch(`http://localhost:3000/cart/${ id }`, {
      method: 'DELETE'
    });
  
    if(!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error)
    }
  
    const result = await response.json();
    fetchCartItems();
    alert('item removed successfully');
  }catch(err) {
    alert(err.message);
  }
}
window.onload = fetchCartItems;