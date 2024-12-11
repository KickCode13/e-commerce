const userGetStatusLogin =(req, res)=>{
    const user = req.user;
    return user;
}
export default userGetStatusLogin;