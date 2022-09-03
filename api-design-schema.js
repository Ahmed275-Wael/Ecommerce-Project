/api/v1/user



___________________________________________
{
route:"/api/v1/user/signup"
METHOD:"POST",
body:{
email,
first name,
middle name,
last name,
mobilenumber
password,
gender,
cityId,
role:enum("user","admin", "superadmin") {User For Clients, admin For Employee, superadmin For CEO)
Response:{
statusCode:200,
message:"You Sucessfully Signed Up
}
/*
Tips
Only Supeadmin Can Create admin
user can create his own account
*/

route:"/api/v1/user/change"
METHOD:"PATCH"
body:{
//Options To Be Changed
}

Response:{
statusCode:200,
message:"You Sucessfully Signed Up
}
}

________________________________________________________________________

/api/v1/car/
{
route:"/api/v1/car"
METHOD:"POST",
body:{
cost,
startDate,
endDate,
visa_no
}

route:"/api/v1/car/:carId"
METHOD:"GET",
body:{
name,
model,
plateNo,
carStatus
}



route:"/api/v1/car/reserve"
METHOD:"POST",
body:{
carId,
startDate,
endDate,
user_demanding_id
}
Response:{
statusCode:200
body:{
 employee_id:x,
 employee_name:x,
 message:"Car Is Reserved Sucessfully",
 startDate,
 endDate
},
statusCode:404,
body:{
message:"Error Occured While Reserving This Car Please Try Again Later"
}
route:"/api/v1/car/reserve/:reserveId, /api/v1/car/reserver/my-reserves"
METHOD:"GET",
Response:{
statusCode:200
body:{
 employee_id:x,
 employee_name:x,
 carModel,
 carId
 startDate,
 endDate
}

}
 
/api/v1/pay/
_______________________________________
route:"/api/v1/pay/supplier",
METHOD:"POST"
AccessRoles:"admins",
body:{
    cost,
    visa_number
}

route:"/api/v1/pay/:reservationId" 
METHOD:"POST",
AccessRoles:"user",
body:{
    cost,
    visa_no,
    resId
}
}
