const express = require('express');
const cors = require('cors');
const path = require('path'); // Add this line
require('./db/config');
const User = require('./db/users');
const Product = require('./db/Product');
const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build'))); // Add this line

app.post('/signup', async (req, resp) => {
  try {
    let user = new User(req.body);
    let result = await user.save();

    // Remove the password field from the result
    result = result.toObject();
    delete result.password;

    resp.status(201).send(result);
  } catch (error) {
    console.error('Error during user signup:', error.message);
    resp.status(500).send({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, resp) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (user && user.password === password) {
      // Remove password before sending response
      user = user.toObject();
      delete user.password;
      resp.send(user);
    } else {
      resp.status(400).send({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during user login:', error.message);
    resp.status(500).send({ error: 'Internal Server Error' });
  }
});


app.post('/add-product', async (req, res) => {
  try {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
  } catch (error) {
    console.error('Error during adding product:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
