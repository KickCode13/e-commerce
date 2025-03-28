import express from "express";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from "./db/dbConnection.js";
connectDB();
import Product_Model from "./models/Product_Model.js";
dotenv.config();
import cookieParser from "cookie-parser";
import userGetStatusLogin from "./utils/userGetStatusLogin.js";
const app = express();


// Middleware para analisar dados do corpo da requisição
app.use(express.json()); // Para requisições com conteúdo JSON
app.use(express.urlencoded({ extended: true })); // Para requisições com conteúdo URL-encoded (como formulários HTML)
app.use(cookieParser())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', __dirname + '/views');

 app.use(express.static('public'));
// Configura o caminho das views
console.log(__dirname);
app.set("view engine", "ejs");
import ProductController from "./controllers/productController.js";
//routes
import routerProduct from './routes/product/product_Routes.js';
import routerContactInfo from "./routes/contact-info/contact_Routes.js";
import routerCart from "./routes/cart/cart_Routes.js";

import routerUser from "./routes/user/user_Routes.js";
import commentRouter from "./routes/comment/comment_Routes.js";
import userAuthentication from './middlewares/userAuthenticationJWT.js'
app.use('/product', routerProduct);
app.use('/contact', routerContactInfo);
app.use('/cart', routerCart);
app.use('/user', routerUser);
app.use('/comment', commentRouter);

app.get('/',userAuthentication, (req, res)=>{
    ProductController.getAllProducts(req, res);
    
});



app.listen(process.env.PORT,()=>{
    console.log("Servidor ON")
});