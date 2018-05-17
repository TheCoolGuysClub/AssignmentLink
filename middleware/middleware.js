const validdateUser=(req,res,next)=>{
  if(req.session.userId){
    console.log("this was hit");
    next();
  }else{
    req.flash(`errorMessages`,{message:"please login!"});
    res.redirect(`/login`);
  }
}
module.exports={validdateUser}
