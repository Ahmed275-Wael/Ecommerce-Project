const conn = require("../db");
const authTools = require("../utilis/authTools");
const util = require("util");
function userModel(user) {
    //Error Handling 

    //End Error Handling
    this.carCount=user.carCount;
    this.userRole=user.userRole;
    this.pid = user.pid;
    this.firstname = user.firstname;
    this.middlename = user.middlename;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.gender = user.gender;
    this.role = user.role;
    this.cityId = user.cityId;
    this.phoneNumber = user.phoneNumber;
    this.visaNo = user.visaNo;
    this.enrolled_date=user.enrolled_date;
   
}


userModel.create = function(user) {
     //Hash My Password
    const hashedPw = authTools.hashPassword(user.password);
    user.password = hashedPw;
 
    //End Hashing
    
}

userModel.findById = function (id) {
   

}

userModel.find = function(conditionsObject) {
   let conditions = "";
   var counter = 1;
for (const property in conditionsObject) {
    if (counter > 1) {
        conditions += ' AND ';
    }
    counter++;
  conditions += `${property} = '${conditionsObject[property]}'`
}
    const sql = `SELECT * FROM person WHERE ${conditions}`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);
}
userModel.findAll = function () {

}

userModel.findPayByPeriod = function (start_date,end_date) {

}
userModel.updateById = function(id,conditionsObject) {
    let conditions = "";
   var counter = 1;
for (const property in conditionsObject) {
    if (counter > 1) {
        conditions += ' AND ';
    }
    counter++;
  conditions += `${property} = '${conditionsObject[property]}'`
}
    const sql = `UPDATE  person SET ${conditions} WHERE pid = ${id}`
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);


}

userModel.deleteById = function (id) {    

}




module.exports = userModel;