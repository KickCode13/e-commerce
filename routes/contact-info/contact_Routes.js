import e from 'express';

const routerContactInfo = e.Router();
import userAuthenticateJWT from '../../middlewares/userAuthenticationJWT.js';
import userGetStatusLogin from '../../utils/userGetStatusLogin.js';
routerContactInfo.get('/contact-me', userAuthenticateJWT,(req, res) =>{
    res.render('contact/contact-page',{user: userGetStatusLogin});
});

export default routerContactInfo;
