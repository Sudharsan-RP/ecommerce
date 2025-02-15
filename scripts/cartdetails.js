//display the datas

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

      cartHtml = 
      `<div class="bottom-container">
            <div class="img"><img src="${item.productImage}" alt="electronics"></div>

            <div class="details">
                <div class="name">
                    ${item.productName}
                </div>
                <div class="quantity">
                    <button onclick="decreaseQuantity('${item._id}')"> - </button>
                    <p class="count count-${item._id}"> ${item.quantity} </p>
                    <button onclick="increaseQuantity('${item._id}')"> + </button>
                </div>
            </div>
        </div>
        <div class="price">
            <p>${item.productPrice}</p>
        </div>
      `
        
      document.querySelector('.bottom')
        .innerHTML += cartHtml;

      total(); //show total when data feching
    })
  } catch(err) {
    console.log('error fetching cart items :', err);
  }
};

//show total
function total() {
  let totalQuantity = document.querySelectorAll('.count');
  let total = 0;
  totalQuantity.forEach((item) => {
    total += parseInt(item.textContent);
  });
  document.getElementById('total-quantity').innerText = total;
}


//increase quantity
async function increaseQuantity(itemId) {
  let quantityElement = document.querySelector(`.count-${itemId}`);
  let currentQuantity = parseInt(quantityElement.textContent);
  let newQuantity = currentQuantity + 1;
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
    console.log('edited', result);
    
    // alert('quantity updated successfully');
    quantityElement.textContent = newQuantity;

    total() //update total when quantity increase

  } catch (err) {
    console.log(err.message);
  }
}

//decrease quantity
async function decreaseQuantity(itemId) {
  let quantityElement = document.querySelector(`.count-${itemId}`);
  let currentQuantity = parseInt(quantityElement.textContent);
  let newQuantity = currentQuantity - 1;
  try {
    
    if(newQuantity >= 1) {
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
      console.log('edited', result);
      
      // alert('quantity updated successfully');
      quantityElement.textContent = newQuantity;
  
      total() //update total when quantity increase
    }else {
      deleteItem(itemId);
    };
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteItem(id) {
  try {
    const response = await fetch(`http://localhost:3000/cart/product/${ id }`, {
      method: 'DELETE'
    });
  
    if(!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error)
    }
  
    document.querySelector('.bottom')
        .innerHTML = " ";

    fetchCartItems();
    alert('item removed successfully');
  }catch(err) {
    alert(err.message);
  }
}


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
window.onload = fetchCartItems;