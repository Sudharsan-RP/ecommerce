document.getElementById('signup').addEventListener('click', async(e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const cPassword = document.getElementById('cPassword').value;
  const mobileNo = document.getElementById('mobileNo').value;

  const response = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, age, email, password, cPassword, mobileNo })
  });

  const data = await response.json();
  document.getElementById('json')
    .innerHTML = data.message || data.error;

  // data.forEach((element) => {
  //   document.getElementById('data').innerHTML += element; 
  // });

//   const table = document.getElementById('table')

//   const tr = document.createElement('tr')
//   const td = document.createElement('td')
//   td.innerHTML = `${data.name}, ${data.age}, ${data.email}, ${data.mobileNo}`
//   tr.appendChild(td);
//   table.appendChild(tr);
});

document.getElementById('show').addEventListener('click', () => {
  let password = document.getElementById('password')
  const type = password.getAttribute('type') === 'password'
    ? 'text' 
      : 'password';
  password.setAttribute('type', type)
})