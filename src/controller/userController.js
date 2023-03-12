const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createUser = async function (req, res) {
    try {
        let user = req.body
        if (Object.keys(user).length == 0) return res.status(400).send({ message: "Please provide data", error: "body can't be empty" })

        let { name, phone, email, password } = user;

        // creating user :-
        let userCreated = await userModel.create(user);
        res.status(201).send({ status: true, message: "Success", data: userCreated });
    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
}



//Login :-



const userLogin = async function (req, res) {
    try {
        let data = req.body;
       
         const { email, password } = data
         
        // check email for user
        let user = await userModel.findOne({ email: email });
        if (!user) return res.status(400).send({ status: false, message: "Email is not correct, Please provide valid email" });

        if (!(password)) {
            return res.status(400).send({ status: false, message: "Password is required!!" })
        }

        // check password of existing user
        let pass = await userModel.findOne({ password: password });
        if (!pass) return res.status(400).send({ status: false, message: "Password is not correct, Please provide valid password" });

        let userid = await userModel.findOne({ email: email, password: password })

        
        // using jwt for creating token
        let token = jwt.sign(
            {
                userId: userid._id.toString(),
            },
            "LOGINASSIGNMENT"   //signature key
        );

        res.status(200).send({ status: true, message: "Success", token: token });
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err.message });
    }
}


//Updateuser :-



const Updateuser = async function(req,res){
    try{
         const userIdByparam = req.params.userId;
         const userIdbytoken = req.userId;
           

        let { name, phone, email, password } = req.body;
        
        if (Object.keys(req.body).length == 0) {
          return res.status(400).send({status:false,message:"Body can't be empty"})
        }  
        
        //authorization :-
        if (userIdByparam !== userIdbytoken) 
        return res.status(403).send({ status: false, message: "Unauthorized user" });
    
        let updatedData = await userModel.findOneAndUpdate(
         { _id:userIdbytoken },
         { $set: { name,phone,email,password} },
         { new: true }
        );
    res.status(200).send({ status: true,message:"successfully update", data: updatedData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {createUser ,userLogin,Updateuser}
