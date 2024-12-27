
const User=require("../models/User")

const addUser=async (req,res)=>{
    const {name,username,email,address,phone}=req.body


     if(!name || !username || !email || !address)
        {
            return res.status(400).send("name and username and email and address are required")
        }
        const usernameExists=await User.findOne({username:username}).lean()
        if(usernameExists)
        {
            return res.status(400).send("username is alredy exists")
        
        }

        const user=await User.create({name,username,email,address,phone})
        const users=await User.find().lean()
        if(!users)
        {
            return res.status(400).send("users not found")
        }
        res.json(users)
}

const getUser=async (req,res)=>{
    const {id}=req.params
    const user=await User.findById(id).lean()
    if(!user)
        {
            return res.status(400).send("user not found")
        }
    res.json(user)
}

const getUsers=async (req,res)=>{
    const users=await User.find().lean()
    if(!users)
        {
            return res.status(400).send("users not found")
        }
    res.json(users)
}

const updateUser=async (req,res)=>{
    const {id,name,username,email,address,phone}=req.body
const usernameExists=await User.findOne({username:username}).lean()
if(usernameExists && usernameExists._id!=id)
{
    return res.status(400).send("username is alredy exists")

}
    if(!name||!id)
        {
            return res.status(400).send("name and id are required")
        }
        
    const user=await User.findById(id).exec()
    if(!user)
        {
            return res.status(400).send("user not found")
        }
      user.name=name
      user.username=username
      user.email=email
      user.address=address
      user.phone=phone
      const newUser = await user.save()
      const users=await User.find().lean()
      if(!users)
      {
          return res.status(400).send("users not found")
      }
      res.json(users)
}

const deleteUser=async (req,res)=>{
    console.log("1")
    const {id}=req.params
    if(!id)
        {
            return res.status(400).send("id is required")
        }

    const user=await User.findById(id).exec()
    if(!user)
        {
            return res.status(400).send("user not found")
        }
      const result = await user.deleteOne()
      const users=await User.find().lean()
      if(!users)
      {
        return res.status(400).send("users not found")
      }
      res.json(users)
}

module.exports={addUser,getUser,getUsers,updateUser,deleteUser}