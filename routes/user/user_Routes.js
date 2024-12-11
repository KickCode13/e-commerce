import express from 'express'
import User from '../../controllers/userController.js'

const routerUser = express.Router();

routerUser.get('/register', (req, res)=>{
    User.getRegisterUser(req, res);
});

routerUser.post('/register', (req, res)=>{
    User.postRegisterUser(req, res);
});

routerUser.get('/login', (req, res)=>{
    User.getLoginUser(req, res);
});

routerUser.post('/login', (req, res)=>{
    User.postLoginUser(req, res);
});
routerUser.get('/logout', (req, res) => {
    res.clearCookie('usertToken'); // Substitua 'token' pelo nome do seu cookie
    res.redirect('/'); // Redireciona para a página inicial ou outra página desejada
});
export default routerUser;