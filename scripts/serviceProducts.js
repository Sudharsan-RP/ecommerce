
async function fetchCartItems() {
  try {
    const response = await fetch('http://localhost:3000/service');
    const details = await response.json();
    console.log(details.serviceDetails);

    const data = details.serviceDetails;
    let serviceDetails = document.querySelector('.service-details');
    let serviceHtml = '';

    data.forEach((id) => {
      console.log(id.name);
      Html = 
      `
      <div class="user-info">
        <div class="user"> <span>name</span> : ${id.name} </div>
        <div class="product-name"><span>product name : </span>${id.productName} </div>
        <div class="complaint"><span>complaint : </span>${id.productComplaint}</div>
        <div class="address">
          <div class="street"><span>street :</span> ${id.street}</div>
          <div class="district"><span>district :</span> ${id.district} </div>
          <div class="pincode"><span>pincode :</span> ${id.pincode}</div>
        </div>
        <div class="mobile-no"><span>mobile number : </span>${id.mobileNo}</div>
        <div>
          <input type="checkbox"> completed
        </div>
        <div class="message"></div>
      </div>
      `
      serviceHtml += Html;
      serviceDetails.innerHTML = serviceHtml
    })
  } catch (error) {
    console.log(error)
  }
}

window.onload = fetchCartItems;