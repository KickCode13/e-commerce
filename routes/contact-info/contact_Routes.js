import e from 'express';

const routerContactInfo = e.Router();

routerContactInfo.get('/contact-me', (req, res) =>{
    res.render('contact/contact-page');
});

export default routerContactInfo;
