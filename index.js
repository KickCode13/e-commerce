import e from "express";
import dotenv from "dotenv";
 
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from "./db/dbConnection.js";
connectDB();
import productSchema from "./models/Product_Model.js";
dotenv.config();


const app = e();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', __dirname + '/views');

 app.use(e.static('public'));
// Configura o caminho das views
console.log(__dirname);
app.set("view engine", "ejs");

import routerProduct from './routes/product/product_Routes.js';
import routerContactInfo from "./routes/contact-info/contact_Routes.js";
import routerCart from "./routes/cart/cart_Routes.js";

app.use('/product', routerProduct);
app.use('/contact', routerContactInfo);
app.use('/cart', routerCart);

app.get('/', (req, res)=>{
    res.render('home/index')
});

app.listen(process.env.PORT,()=>{
    console.log("Servidor ON")
});