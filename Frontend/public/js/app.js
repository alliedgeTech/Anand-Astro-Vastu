const contactForm = document.getElementById('quoteForm');


const formSubmit = (e) => {
    e.preventDefault();
    console.log("done")
    const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const mobile = document.getElementById('mobile').value;
const help = document.getElementById('help').value;
const note = document.getElementById('note').value;


    const formData = {
        name: name,
        email: email,
        mobile: mobile,
        help: help,
        note: note
    };

    fetch('https://anand-astro-vastu.onrender.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.text())
      .then(responseText => {
        console.log("this is mine res : ",responseText);
        if (responseText === 'success') {
          alert('Your details sent to Astrologer');
          document.getElementById('name').value = '';
          document.getElementById('email').value = '';
          document.getElementById('mobile').value = '';
          document.getElementById('help').value = '';
          document.getElementById('note').value = '';
        } else {
          alert('Something went wrong');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong');
      });
};