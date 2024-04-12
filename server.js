const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const fs = require('fs').promises;

const PORT = process.env.PORT || 5000;

// Set up Express middleware
app.use(express.static('public/'));
app.use(express.json());

// Read the email.html template (optional for client email)
const readEmailTemplate = async () => {
  try {
    const data = await fs.readFile(__dirname + '/public/email.html', 'utf8');
    return data;
  } catch (error) {
    console.error('Error reading email template:', error);
    return null;
  }
};

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/', async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'n03544571@gmail.com', // Replace with your email
      pass: 'krydprmexkdthpae' // Replace with your password (avoid storing in code)
    }
  });

  // Read the email.html template (optional for client email)
  let emailTemplate;
  try {
    emailTemplate = await readEmailTemplate();
  } catch (error) {
    console.error('Email template not found (client email might be affected)');
  }

  const mailOptionsToOwner = {
    from: req.body.email, // Replace with your email
    to: 'n03544571@gmail.com', // Your email address (business owner)
    subject: 'New Inquiry Received',
    text: `A new inquiry has been received from:
            Name: ${req.body.name}
            Email: ${req.body.email}
            Mobile: ${req.body.mobile}
            Service: ${req.body.help}
            Note: ${req.body.note}`
  };

  const mailOptionsToClient = {
    from: 'n03544571@gmail.com', // Replace with your email
    to: req.body.email, // User's email address (client)
    subject: 'Thank You for Your Inquiry',
    html: emailTemplate // Send the entire email template as HTML content (if available)
  };

  try {
    // Send email to business owner
    await transporter.sendMail(mailOptionsToOwner);
    console.log('Email to owner sent');

    // Send email to client (user)
    await transporter.sendMail(mailOptionsToClient);
    console.log('Email to client sent');

    res.send('success');
  } catch (error) {
    console.error('Error:', error);
    res.send('error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
