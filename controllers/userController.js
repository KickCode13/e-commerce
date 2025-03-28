import UserModel from "../models/User_Model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userGetStatusLogin from "../utils/userGetStatusLogin.js";

dotenv.config();
class User {
  static async getRegisterUser(req, res) {
    const statusUser= userGetStatusLogin(req,res);//vai ser undefined pois ainda não tem o valor do req.user pois o token ainda não foi gerado
    
    res.render("user/registerPage",{user: statusUser});
  }

  static async postRegisterUser(req, res) {
    try {
      const { name, email, cpf, number, password } = req.body;
      const salt = bcryptjs.genSaltSync(10);
      const hashPassword = bcryptjs.hashSync(password, salt);
      const newUser = new UserModel({
        name,
        email,
        cpf,
        number,
        password:hashPassword
      });
      await newUser.save();
      res.render('user/successRegisterPage', {user:userGetStatusLogin})
    } catch (err) {}
  }

  static async getLoginUser(req, res){
    res.render('user/loginPage', {user:userGetStatusLogin});
  }

  static async postLoginUser(req, res){
    try {
      const{email, password} = req.body;
      const user = await UserModel.findOne({email});
      console.log(email);
      console.log(user.email);
      if(bcryptjs.compareSync(password, user.password)){
        const userToken = jwt.sign(
          { id: user._id, email: user.email }, // Payload
          process.env.JWT_SECRET, // Chave secreta
          { expiresIn: '1h' } // Tempo de expiração
      );
        res.cookie('userToken', userToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Usar somente em HTTPS
          maxAge: 3600000, // Tempo de expiração em milissegundos (1 hora)
      });
        res.render('user/successLoginPage', {user:userGetStatusLogin});
      }
      else{
        console.log('deu bo')
      }

    } catch (err) {
      console.log('erro', err)
    }
   


  }
}

export default User;
