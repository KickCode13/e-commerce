import express from "express";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from "./db/dbConnection.js";
connectDB();
import Product_Model from "./models/Product_Model.js";
dotenv.config();


const app = express();

// Middleware para analisar dados do corpo da requisição
app.use(express.json()); // Para requisições com conteúdo JSON
app.use(express.urlencoded({ extended: true })); // Para requisições com conteúdo URL-encoded (como formulários HTML)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', __dirname + '/views');

 app.use(express.static('public'));
// Configura o caminho das views
console.log(__dirname);
app.set("view engine", "ejs");
import ProductController from "./controllers/productController.js";

import routerProduct from './routes/product/product_Routes.js';
import routerContactInfo from "./routes/contact-info/contact_Routes.js";
import routerCart from "./routes/cart/cart_Routes.js";

app.use('/product', routerProduct);
app.use('/contact', routerContactInfo);
app.use('/cart', routerCart);

app.get('/', (req, res)=>{
    ProductController.getAllProducts(req, res);
});

app.listen(process.env.PORT,()=>{
    console.log("Servidor ON")
});