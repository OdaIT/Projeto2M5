const pool = require("../db");

const checkUserId = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT id FROM users");
    const id_user = parseInt(req.params.id);
    const exists = rows.find((row) => row.id === id_user);
    if(!exists){
      return res.status(404).json({ message: "Id doesnt exist" })
    }else{
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "There was an issue acessing the DB", error: error.message }); 
  }
}

const checkEmail = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    const email = req.body.email;
    const id = parseInt(req.params.id);
    const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = validation.test(email);
    const exists = (rows.find((row) => row.email.toLowerCase() === email.toLowerCase() && row.id !== id));
    if(!valid){
      return res.status(400).json({ message: "Invalid email / format" });
    }else if(exists){
      return res.status(409).json({ message: "Email already exists" });
    }else{
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "There was an issue acessing the DB", error: error.message });
  }
}


module.exports = {checkUserId, checkEmail};

//redone