import mongoose, {Schema} from "mongoose";
const userModel = mongoose.model("User", 
    new Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        cpf:{
            type:String,
            required: true
        },
        number:{
            type:String,
            required: true
        },
        password:{
            type:String,
            required:true
        },
       
    })
)

export default userModel;