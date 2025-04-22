import cartModel from "../models/Cart_Model.js";
import productModel from "../models/Product_Model.js";
import userGetStatusLogin from '../utils/userGetStatusLogin.js';
class Cart_Conbtroller{
    static async addToCart(req, res) {    
        try {
            const productID = req.params.id;
            const userID = req.user.id;
    
            // Verifica se o item já existe no carrinho do usuário
            const existingItem = await cartModel.findOne({ User: userID, Product: productID });
            console.log("DADOS DO ITEM E QUAITIDADE",existingItem);
            if (!existingItem) {
                // Se não existir, cria um novo item no carrinho
                const newProductCart = new cartModel({
                    User: userID,
                    Product: productID,
                    quantity: Number(1) // Inicializa a quantidade
                })
                
               
                const savedProductCart = await newProductCart.save();
                
                console.log("Carrinho salvo:", savedProductCart);
                return res.status(201).json(savedProductCart);
            } else {
                // Se já existir, incrementa a quantidade
                existingItem.quantity += 1;
                console.log("DADOS DO ITEM E QUAITIDADE2",existingItem);
                await existingItem.save();
                return res.status(200).json(existingItem);
            }
        } catch (err) {
            console.log("Ocorreu um erro:", err);
            return res.status(500).json({ error: "Erro ao adicionar ao carrinho" });
        }
    }
    

    static async seeMyCart(req, res){
        try {
            const userID = req.user.id;
            const myItemsCart = await cartModel.find({User: userID}).populate('Product');
            console.log(myItemsCart);
            res.render('cart/shoppingCart', {user: userGetStatusLogin(req,res),myItemsCart});
        } catch (err) {
            
        }
    }
    static async removeProductCart(req, res) {
        console.log("Entrou no remove")
        const id = req.params.id;
        console.log(id);
        try {
            const deletedProduct = await cartModel.findByIdAndDelete(id);
            if (!deletedProduct) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }
            console.log("Produto removido:", deletedProduct);
            return res.status(200).json({ message: "Produto excluído com sucesso" });
        } catch (err) {
            console.error("Erro ao remover o produto:", err);
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
      }
}

export default Cart_Conbtroller;