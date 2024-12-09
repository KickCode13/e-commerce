import UserModel from "../models/User_Model.js";

class User {
  static async getRegisterUser(req, res) {
    res.render("user/registerPage");
  }

  static async postRegisterUser(req, res) {
    try {
      const { name, email, cpf, number } = req.body;
      const newUser = new UserModel({
        name,
        email,
        cpf,
        number,
      });
      await newUser.save();
      res.render('user/successRegisterPage')
    } catch (err) {}
  }
}

export default User;
