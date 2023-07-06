const userModel = require("../users/users-model")

function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  let URL = req.originalUrl;
  let method = req.method;
  let timestamp = new Date().toLocaleString();

  console.log(`${method} -- ${URL} -- ${timestamp}`);
}

async function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    const user = await userModel.getById(req.params.id);
    if (!user) {
      res.status(404).json({ mesaj: "kullanıcı bulunamadı" });
    } else {
      req.currentUser = user;
      next();
    }
  } catch (error) {
      next(error);
  }
  
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    let {name} = req.body;
    if(!name){
      res.status(400).json({message:"gerekli name alanı eksik"});
    }else{
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    let text = req.body.text;
    if(!text) {
      res.status(400).json({message:"gerekli text alanı eksik"});
    }else{
      next();
    }
  } catch (error) {
    next(error);
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}