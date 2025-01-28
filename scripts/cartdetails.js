
async function fetchCartItems() {
  try {
    const response = await fetch('http://localhost:3000/cart');
    const cartItems = await response.json();
    console.log(cartItems.cartItems);

    const data = cartItems.cartItems;
    
     if(data.length === 0) {
      container.innerHTML = `<h3> your cart is empty </h3>`
      return;
     }
    
     let cartHtml = '';

    data.forEach((item) => {
      console.log(item);

      cartHtml = 
      `<h1> cart page </h1>
        <img src="${item.productImage}" alt="image" />
        <p> ${item.productName} </p>
        <p> ${item.productPrice} </p>
        <p> ${item.quantity} </p>
        <button onclick="increaseQuantity(${item._id}, ${item.quantity})"> add </button>
        <button onclick="removeItem(${item._id})"> remove </button>

        <div id="message"> </div>
      `
      document.querySelector('.container')
        .innerHTML += cartHtml;
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