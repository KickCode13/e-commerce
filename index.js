import e from "express";
import dotenv from "dotenv";
 
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();


const app = e();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', __dirname + '/views');

 app.use(e.static('public'));
// Configura o caminho das views
console.log(__dirname);
app.set("view engine", "ejs");

app.get('/', (req, res)=>{
    res.render('product/products-page')
});

app.listen(process.env.PORT,()=>{
    console.log("Servidor ON")
});