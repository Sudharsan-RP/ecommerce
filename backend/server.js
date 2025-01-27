const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();

//middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cors());

//db connection
mongoose.connect("mongodb://localhost:27017/ecommerce-cart")
    .then(() => console.log('db connected successfully'))
    .catch((err) => {console.log(err)});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    id: {
        type: String,
        unique: true
    },
    quantity: {
        type: Number,
        min: 1
    },
});

const CartProduct = mongoose.model('CartProduct', productSchema);

app.post('/cart', async(req, res) => {
    const { name, id, quantity } = req.body;

    try{
        const cartProduct = new CartProduct({ name, id, quantity });
        await cartProduct.save();

        res.status(201).json({
        message: 'product saved successfully'
     })
    }catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
});

app.listen(3000, () => {
    console.log(`server running on port http://localhost:${3000}`)
})