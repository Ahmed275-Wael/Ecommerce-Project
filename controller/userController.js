const userModel = require("../model/userModel");
const carModel = require("../model/carModel");
const clientPayCompanyModel = require("../model/clientPayCompanyModel");
const authTools = require("../utilis/authTools");
const catchAsync = require("../utilis/catchAsync");
exports.signUp = catchAsync(async function (req, res, next) {
    let user = {};
     
     user.firstname = req.body.firstname;
     user.middlename = req.body.middlename;
     user.lastname = req.body.lastname;
     user.email= req.body.email;
     user.password = req.body.password;
     user.gender = req.body.gender;
     user.role= "user";
     user.userRole = req.body.userRole;
     user.carCount = req.body.carCount;
     user.cityId = req.body.cityId;
     user.phoneNumber =req.body.phoneNumber;
     user.visaNo=req.body.visaNo;
     user.enrolled_date=req.body.enrolled_date;

     const user1 = await userModel.find(user.email);
     const currentUser = user1[0];
    if (currentUser) {

       return next("Existing Email Bitch !!!");
    }
    const user2 = await userModel.find(user.password);
    const currentpass = user[0];
    if (currentpass) {

       return next("Existing Password Bitch !!! : ");
    }
     const newUser = await userModel.create(user);
     
     const jwt = authTools.generateToken({username:newUser.firstname});
     res.cookie("jwt", jwt);
    res.json({
        status:200,
        message:"Success",
        jwt
    });



    const newUser2 = await userModel.createDemanderOrSupplierOrEmp(user);
     
     const jwt2 = authTools.generateToken({username:newUser2.firstname});
     res.cookie("jwt", jwt2);
    res.json({
        status:200,
        message:"Success",
        jwt2
    });

});
exports.findAllPayByPeriod = catchAsync(async function (req, res, next) {
    let dates = {};
     //reserve.Eid = req.body.Eid;
    dates.start_date=req.body.start_date;
    dates.end_date=req.body.end_date;
     const newUser = await userModel.findPayByPeriod(dates.start_date,dates.end_date);
     res.status(202).json({
         statusCode:202,
         message:"sucess"
        // carId:newReserve.insertId
     });
 
 
 
 
 
 });

exports.signIn = catchAsync(async function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        next("Please Enter Email And Password");
    }
    const user = await userModel.find({email});
    const currentUser = user[0];
    if (!currentUser) {

       return next("Please Enter Correct Email And Password");
    }
     
    const isPasswordTrue = authTools.verifyPassword(password, currentUser.PASSWORD)
     if (!isPasswordTrue) {
       return next("Please Enter Correct Email And Password");
     }
     const jwt = authTools.generateToken({id:currentUser.pid});
     res.cookie("jwt", jwt);
    res.json({
        status:202,
        message:"Success",
        jwt
    });
});

exports.signOut = catchAsync(async function (req, res ,next) {
    //2 Approaches (Remove It From Client) Or (Invalid That Jwt)
    //We Will Use Removing It From The Client
    res.cookie("jwt", "");
    res.status(200).json({
        statusCode:202,
        message:"You Logged Out"
    });

});

//Authentication
exports.protectRoute = catchAsync(async (req, res, next) => {
    const token =  req.cookies.jwt;
    if (!token) return next(new AppError("Please Sign In"), 404);
    const tokenVeri = await authTool.tokenVerify(token); 
    if (!tokenVeri) return next(new AppError("Please Sign In Again", 404) );
    const user = await userModel.findOne({_id: tokenVeri.id});
    if (!user) return next(new AppError("Please sign in again error token is invalid", 404))
    if (user.passwordUpdated) { 
    if (tokenVeri.iat * 1000 < user.passwordUpdatedAt) return next(new AppError("Please Sign In Again as your pw changed recently"), 404);
    }
    req.user = user;
    next();
 });


//Authorization
exports.restrictedTo = (...roles) => {

    return (req, res, next) => {
       const role = req.user.role;
       if (!req.user) return next("Please Login To Join This Route As it has restrictions");
       if (!roles.includes(role)) return next("You are not authorized to enter that route");
       next();
 
    }
 }