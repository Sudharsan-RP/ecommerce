const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const path = require('path');
const { type } = require("os");

const app = express();
const PORT = 3000;

//middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(cors());

//db connection
mongoose.connect('mongodb://localhost:27017/global-ac')
  .then(() => {console.log('db connected successfully')})
  .catch((err) => {console.error(err.message)});

//create service schema
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productComplaint: {
    type: String,
    required: false
  },
  street: {
    type: String,
    required: true
  },
   district: {
    type: String,
    required: true
   },
   pincode: {
     type: Number,
     required: true
    },
    mobileNo: {
     type: Number,
     required: true
  }
})

const Service = mongoose.model('Service', serviceSchema);

app.post('/service', async(req, res) => {

  const { name, productName, productComplaint, address, street, district, pincode, mobileNo } = req.body;
  try {
    if (mobileNo.length < 10 && mobileNo.length > 10) {
      return res.status(400).json({error: 'enter a valid mobile number'})
    }

    if (pincode.length < 6 && pincode.length > 6) {
      return res.status(400).json({error: 'enter a valid mobile number'})
    }

    // const existUser = await Service.findOne({mobileNo});
    // if (existUser) {
    //   return res.status(400).json({ error: 'user already exists' })
    // }

    const service = new Service({ name, productName, productComplaint, address, street, district, pincode, mobileNo });
    await service.save();

    res.status(201).json({
      message: 'details saved successfully'
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

app.get('/service', async(req, res) => {
  try {
    const serviceDetails = await Service.find();

    res.status(200).json({
      serviceDetails
    })
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
});





//create a user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 18,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minLength: [8, 'password must be atleast 8 charectors long']
  },
  cPassword: {
    type: String,
    required: true,
    minLength: [8, 'password must be atleast 8 charectors long']
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async(req, res) => {
  const { name, age, email, password, cPassword, mobileNo } = req.body;

  try {
    //check email is valid

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        error: 'please enter valid email'
      })
    }

    //check password is valid

    if (password.length < 8) {
      return res.status(400).json({error: 'password must be atleast 8 charectors'})
    }

    if (password !== cPassword) {
      return res.status(400).json({ error: "password doesn't match" })
    }

    //mobile no validation

    if (mobileNo.length < 10 && mobileNo.length > 10) {
      return res.status(400).json({error: 'enter a valid mobile number'})
    }

    //check if user already exists

    const existUser = await User.findOne({email});
    if (existUser) {
      return res.status(400).json({ error: 'user already exists' })
    }

    //hash the password

    const hashPassword = await bcrypt.hash(password, 10);
    const hashcPassword = await bcrypt.hash(cPassword, 10);

    //create new user

    const user = new User({ name, age, email, password: hashPassword, cPassword: hashcPassword, mobileNo
    });
    await user.save();

    res.status(201).json({
        status: 'ok',
        message: "signup successfully",
        user
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
});

//login page

app.post('/login', async(req, res) => {
  const { email, password } = req.body;

  try {
    //find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'user not found' });
    }


    //compare passwords

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "password doesn't match"});
    }

    res.status(200).json({
        status: 'ok',
        message: '✔ login successfull'
    })
  } catch(err) {
    res.status(500).json({
      error: err.message
    })
  }

});




//create a product schema
const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  productName:{
    type: String,
    required: true,
    maxlength: 500 ,
    trim: true
  },
  productPrice: {
    type: Number
  },
  quantity: {
    type: Number,
    required: true
  },
  productImage: {
    type: String,
    required: true
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


//update product
app.put('/cart/product/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const update = await CartProduct.findByIdAndUpdate(
       id,
       { quantity },
       { new: true }
    );

    if(!update) {
      res.status(404).json({
        message: 'product not found'
      })
    }
    res.status(200).json({
      quantity,
      message: 'product updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})


//delete product
app.delete('/cart/product/:id', async(req, res) => {
  const { id } = req.params;

  try {
    const removeItem = await CartProduct.findByIdAndDelete( id );
    if(!removeItem) {
      return res.status(404).json({
        error: 'item not found'
      })
    };
    res.status(200).json({
      message: 'item removed',
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
