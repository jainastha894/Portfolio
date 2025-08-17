import express from 'express';
import nodemailer from 'nodemailer';
const app = express();
const port=process.env.PORT || 3000
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jainastha894@gmail.com',
    pass:'bdbc bvzo gmuh zbnd'
  }
});

app.post("/contact", (req, res) => {
  // Handle contact form submission
  const { name, email, message } = req.body;
  const mailOptions = {
    from: email,
    to: 'jainastha894@gmail.com',
    subject: `Message from ${name} via portfolio`,
    text: message,
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  });
});



app.get('/', (req, res) => {
  res.render('index', { title: 'My Portfolio' });
});
app.listen(port, () => {
  console.log('Server is running on port 3000');
});
