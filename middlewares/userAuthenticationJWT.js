import jwt from "jsonwebtoken";
import userGetStatusLogin from "../utils/userGetStatusLogin.js";
const authenticateToken = (req, res, next) => {
  // Extrair o token do cookie
  const userToken = req.cookies.userToken;

  if (!userToken) {
    return res.render("user/loginPage", { user: userGetStatusLogin(req, res) });
  }

  try {
    // Verifica e decodifica o token usando a chave secreta
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
    req.user = decoded; // Adiciona os dados do usuário decodificado ao objeto `req`
    next(); // Chama o próximo middleware ou rota
  } catch (err) {
    res.status(401).send("Token inválido ou expirado.");
  }
};

export default authenticateToken;
