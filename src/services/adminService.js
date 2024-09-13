const admin = require("../models/admin");

async function seedDefaultAdmin() {
    try {
      const adminCount = await admin.count()
      if(adminCount > 0){
          return
      }
      return admin.create({
        username:"admin",
        password: "P4ssword"
      })
      
    } catch (err) {
      console.error("failed to seed the admins data:", err);
    }
  }
  module.exports = { 
    seedDefaultAdmin
  }
  
  