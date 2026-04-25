const adminAuth = (req,res)=>{
  const token ="xyz";

  const isAuthorized = token === "xyz";
  
  if(isAuthorized){
    res.send("Welcome Admin");
  }else{
    res.status(403).send("Unauthorized Access");
  }
}
module.exports = adminAuth;