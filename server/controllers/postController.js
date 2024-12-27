
const Post=require("../models/Post")

const addPost=async (req,res)=>{
    const {title,body}=req.body
   
     if(!title || !body)
        {
            return res.status(400).send("title and body are required")
        }
        const titleExists=await Post.findOne({title:title}).lean()
        if(titleExists){
            return res.status(400).send("title is alredy exists")
        }
        const post=await Post.create({title,body})
        const posts=await Post.find().lean()
        if(!posts)
            {
               return res.status(400).send("posts not found")
            }
        res.json(posts)
}

const getPost=async (req,res)=>{
    const {id}=req.params
    const post=await Post.findById(id).lean()
    if(!post)
        {
            return res.status(400).send("post not found")
        }
    res.json(post)
}

const getPosts=async (req,res)=>{
    const posts=await Post.find().lean()
    if(!posts)
        {
            return res.status(400).send("posts not found")
        }
    res.json(posts)
}

const updatePost=async (req,res)=>{
    const {id,title,body}=req.body
    const titleExists=await Post.findOne({title:title}).lean()
        if(titleExists&& titleExists._id!=id)
        {
            console.log("title exists")
            return res.status(400).send("title is alredy exists")
        
        }
    if(!title||!id||!body)
        {
            return res.status(400).send("title and id and body are required")
        }


    const post=await Post.findById(id).exec()
    if(!post)
        {
            return res.status(400).send("post not found")
        }
        post.title=title
        post.body=body
      
      const newPost = await post.save()
      const posts=await Post.find().lean()
        if(!posts)
            {
               return res.status(400).send("posts not found")
            }
        res.json(posts)
}

const deletePost=async (req,res)=>{
    const {id}=req.params
    if(!id)
        {
            return res.status(400).send("id is required")
        }

    const post=await Post.findById(id).exec()
    if(!post)
        {
            return res.status(400).send("post not found")
        }
      const result = await post.deleteOne()
      const posts=await Post.find().lean()
        if(!posts)
            {
               return res.status(400).send("posts not found")
            }
        res.json(posts)
}

module.exports={addPost,getPost,getPosts,updatePost,deletePost}