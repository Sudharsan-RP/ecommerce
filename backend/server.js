const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

//middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(cors());

//db connection
mongoose.connect('mongodb://localhost:27017/cart-products')
  .then(() => {console.log('db connected successfully')})
  .catch((err) => {console.error(err.message)});

//create a schema
const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    require: true
  },
  productName:{
    type: String,
    require: true,
    trim: false
  },
  productPrice: {
    type: Number
  },
  quantity: {
    type: Number,
    require: true
  },
  productImage: {
    type: String,
    require: true
  }
});

//create a model
const CartProduct = new mongoose.model('CartProduct', productSchema);

//create a post request
app.post('/cart', async(req, res) => {
  const { productId, productName, productPrice, quantity, productImage } = req.body;
  try {

    const cartProduct =await new CartProduct({ productId, productName, productPrice, quantity, productImage });
    await cartProduct.save();

   res.status(201).json({
    message: 'data stored in db'
   });
  } catch(err) {
    res.status(500).json({
      error: err.message
    });
  };
});

app.get('/cart', async(req, res) => {
  try {
    const cartItems = await CartProduct.find();

    res.status(200).json({
      cartItems
    })
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
});

app.put('/cart/:id', async(req, res) => {

  const { id } = req.params;

  //validate the item id
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: 'invalid item id'
    })
  }

  //validate the quantity
  if(typeof quantity !== 'number' || quantity < 1) {
    return res.status(400).json({
      error: 'invalid item id'
    })
  }
  const { quantity } = req.body;
  try {
    const updatedItem = await CartProduct.findByIdAndUpdate(
      id,
      { $set: { quantity }},
      { new: true }
    );

    if(!updatedItem) {
      return res.status(404).json({
        error: 'item not found'
      })
    };
    res.status(200).json({
      message: 'Quantity updated successfully', updatedItem
    })
  } catch(err) {
    res.status(500).json({
      error: err.message
    });
  };
});

app.delete('/cart/:id', async(req, res) => {
  const { id } = req.params;

  try {
    const removeItem = await CartProduct.findByIdAndDelete( id );
    if(!removeItem) {
      return res.status(404).json({
        error: 'item not found'
      })
    };res.status(200).json({
      message: 'Quantity updated successfully', updatedItem
    })
  } catch(err) {
    res.status(500).json({
      error: err.message
    });
  };
})

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
