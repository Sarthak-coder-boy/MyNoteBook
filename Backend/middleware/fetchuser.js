const jwt =  require('jsonwebtoken')
const JWT_SECRET = "Sarthakisagoodcoder";

const fetchuser  = (req,res,next)=>{
    // Get the user from the jwt token and id to req object
   const token = req.header('auth-token');
   if(!token){
    res.staus(401).send({error:"Please authenticate using valid token"})
   }
   try {
       const data = jwt.verify(token , JWT_SECRET);
       req.user = data.user;
       next(); 
   } catch (error) {
    res.staus(401).send({error:"Please authenticate using valid token"})
   }
}

module.exports = fetchuser;