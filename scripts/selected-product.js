window.onload = function() {
    let productData = localStorage.getItem("selectedProduct");
    if (productData) {
        productData = JSON.parse(productData);
        console.log(productData);
        
        let html = `
    <div class="img">
      <img src="${productData.image}" alt="fridge">
    </div>
    <div class="right">
        <div class="name">${productData.name}</div>
        <div class="ratings"> &#9733; &#9733; &#9733; &#9733;${productData.rating.stars}</div>
        <div class="price">${productData.price}</div>
        <h4>product-details</h4>
        <table>
            <tr>
                <td>Product Dimensions</td>
                <td>${productData.productInfo.productDimensions}</td>
            </tr>
            <tr>
                <td>Brand</td>
                <td>${productData.productInfo.brand}</td>
            </tr>
            <tr>
                <td>Capacity</td>
                <td>${productData.productInfo.capacity}</td>
            </tr>
            <tr>
                <td>Configuration</td>
                <td>${productData.productInfo.configuration}</td>
            </tr>
            <tr>
                <td>Energy Star</td>
                <td>${productData.productInfo.energyStar}</td>
            </tr>
        </table>
        <div class="about">
            <h4>About This Item</h4>
            <ul>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, consequatur.</li>
                <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic voluptatem rem exercitationem cupiditate quasi doloremque.</li>
                <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente est omnis nesciunt impedit architecto veniam enim corrupti, tempora incidunt voluptatibus.</li>
                <li>Lorem ipsum dolor sit amet.</li>
            </ul>
        </div>
    </div>
        `
        document.querySelector('.container').innerHTML = html
    } else {
        console.log("product data not found");
    }
};