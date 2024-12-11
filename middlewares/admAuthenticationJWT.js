import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  // Extrair o token do cookie
  const admToken = req.cookies.token;

  if (!admToken) {
    return res.render('user/loginPage');
  }

  try {
    // Verifica e decodifica o token usando a chave secreta
    const decoded = jwt.verify(admToken, process.env.JWT_SECRET);
    req.user = decoded; // Adiciona os dados do usuário decodificado ao objeto `req`
    
    next(); // Chama o próximo middleware ou rota
  } catch (err) {
    res.status(401).send("Token inválido ou expirado.");
  }
};

export default authenticateToken;
