const Todo=require("../models/Todo")

const addTodo=async (req,res)=>{
    const {title,tags}=req.body
    const tagsArr=tags.split(",")
    if(!title || !tags)
        {
            return res.status(400).send("title and tags are required")
        }
        const titleExists=await Todo.findOne({title:title}).lean()
        if(titleExists)
        {
            return res.status(400).send("title is alredy exists")
        
        }
        const todo=await Todo.create({title,tags:tagsArr})
        const todos=await Todo.find().lean()
        if(!todos){
            return res.status(400).send("todos not found")

        }
        res.json(todos)
}

const getTodo=async (req,res)=>{
    const {id}=req.params
    const todo=await Todo.findById(id).lean()
    if(!todo)
        {
            return res.status(400).send("todo not found")
        }
    res.json(todo)
}

const getTodos=async (req,res)=>{
    const todos=await Todo.find().lean()
    if(!todos)
        {
            return res.status(400).send("todos not found")
        }
    res.json(todos)
}

const updateTodo=async (req,res)=>{
    const {id,title,tags,completed}=req.body
    const titleExists=await Todo.findOne({title:title}).lean()
    if(titleExists&& titleExists._id!=id) {
        return res.status(400).send("title is alredy exists")
    
    }
    if(!title || !id || !tags){
            return res.status(400).send("title and id are required")
    }
    const todo=await Todo.findById(id).exec()
    if(!todo){
            return res.status(400).send("todo not found")
        }
        todo.title=title
        if(typeof(tags)===typeof("str"))
        todo.tags=tags.split(",")
        else
        todo.tags=tags
        todo.completed=completed
      const newTodo = await todo.save()
      const todos=await Todo.find().lean()
      if(!todos){
          return res.status(400).send("todos not found")
      }
      res.json(todos)
}

const deleteTodo=async (req,res)=>{
    const {id}=req.params
    if(!id)
        {
            return res.status(400).send("id is required")
        }

    const todo=await Todo.findById(id).exec()
    if(!todo)
        {
            return res.status(400).send("todo not found")
        }
      const result = await todo.deleteOne()
      const todos=await Todo.find().lean()
      if(!todos){
          return res.status(400).send("todos not found")
      }
      res.json(todos)
}

module.exports={addTodo,getTodo,getTodos,updateTodo,deleteTodo}