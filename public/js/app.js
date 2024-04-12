const contactForm = document.getElementById('quoteForm');


contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
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

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.responseText == 'success') {
            alert('Your details sent to Astrologer');
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('mobile').value = '';
            document.getElementById('help').value = '';
            document.getElementById('note').value = '';
        } else {
            alert("Something went wrong");
        }
    };
    xhr.send(JSON.stringify(formData));
});