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
  document.getElementById('json')
    .innerHTML = result.message || result.error;

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