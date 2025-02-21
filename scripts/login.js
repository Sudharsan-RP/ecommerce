document.getElementById('login').addEventListener('click', async(e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json(); 

  //toast message
  document.querySelector('#json')
  .innerHTML = `<div class="json">${result.message || result.error}</div>`;

  setTimeout(() => {
  document.querySelector('#json')
   .innerHTML = ' ';
  }, 2000)

    console.log(result.status);
    if(result.status == 'ok') {
        setTimeout(() =>  window.location.href = 'global-home.html', 2000);
        document.querySelector('.json').style.color = 'green'
    }

    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
  });

function toggle() {
  let show = document.getElementById('password')
  if (show) {
    document.getElementById('password').setAttribute('type', 'text')
  } else{
    document.getElementById('password')
  }
}

document.getElementById('show').addEventListener('click', () => {
  let password = document.getElementById('password')
  const type = password.getAttribute('type') === 'password'
    ? 'text' 
      : 'password';
  password.setAttribute('type', type)
})