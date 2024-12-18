import commentModel from "../models/Comment_Model.js";

class Comment_Controller{
    static async toComment(req, res){
        const comment = req.body.comment;
       
        console.log(comment, req.user)
    }
}

export default Comment_Controller;