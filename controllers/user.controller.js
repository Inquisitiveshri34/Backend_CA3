import User from "../models/user.model.js"

const registerUser = async (req,res)=>{
    const {username,email,password,dateOfBirth} = req.body;
    if (!username || username.trim() == ""){
        return res.status(400).send("Username cannot be empty")
    }
    if (!email || email.trim() == ""){
        return res.status(400).send("Email cannot be empty")
    }
    if (password.length < 8 || password.length > 16 ){
        return res.status(400).send("Password length should be greater than 8 or less than or equal to 16.")
    }
    const existingUser = await User.findOne({ $or : [{username},{email}]})
    if (existingUser){
        return res.status(400).send("User Pre-Exists")
    }
    const user = new User({
        username, email,password,dateOfBirth
    })
    const newUser = await user.save()
    res.send(newUser)
}

export {registerUser}