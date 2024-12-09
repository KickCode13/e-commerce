import express from 'express'
import User from '../../controllers/userController.js'

const routerUser = express.Router();

routerUser.get('/register', (req, res)=>{
    User.getRegisterUser(req, res);
});

routerUser.post('/register', (req, res)=>{
    User.postRegisterUser(req, res);
})
export default routerUser;