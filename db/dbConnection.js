import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conexão com o MongoDB bem-sucedida!');
  } catch (err) {
    console.log('Erro ao conectar ao MongoDB:', err);
    // Encerra o processo em caso de falha
  }
};

export default connectDB;
