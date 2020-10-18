//----------------------------------------------------------
// Form
//----------------------------------------------------------

// Get the elements.
var subscribeButtons = document.querySelectorAll('.subscribe')

// Handle submit functions.
subscribeButtons.forEach((el) => {
  el.addEventListener('submit', (e) => {
    e.preventDefault()
    var formId = 1747454
    var name = e.target.elements.name.value
    var email = e.target.elements.email.value
    document
      .querySelectorAll('.subscribed')
      .forEach((el) => el.classList.remove('hidden'))
    document
      .querySelectorAll('.subscribe .content')
      .forEach((el) => el.classList.add('invisible'))
    fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: '2jnVrugk1S7PzsMPVIhMVg',
        first_name: name,
        email,
        email_address: email,
      }),
    })
  })
})
