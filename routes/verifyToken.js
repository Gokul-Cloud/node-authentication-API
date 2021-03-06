import  Jwt from "jsonwebtoken";

const auth = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('access denied');

    try {
        const verified = Jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('invalid token')
    }
}

export default auth;