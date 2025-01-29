document.getElementById('submit').addEventListener('click', async(e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const productName = document.getElementById('productName').value;
  const productComplaint = document.getElementById('complaint').value;
  const street = document.getElementById('street').value;
  const district = document.getElementById('district').value;
  const pincode = document.getElementById('pincode').value;
  const mobileNo = document.getElementById('mobileNo').value;

  const response = await fetch('http://localhost:3000/service', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, productName, productComplaint, street, district, pincode, mobileNo })
  });

  const result = await response.json();
  document.getElementById('json')
    .innerHTML = result.message || result.error;
})