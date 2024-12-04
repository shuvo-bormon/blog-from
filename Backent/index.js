const express = require("express");
const app = express();
const {connectDb} = require("./DB/Dbconfig")
const blogModel = require("./DB/Model/Blog.model")
const cors = require("cors")

connectDb()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post("/createblog", async(req,res)=>{
    try{
        const {tittle,description,admin} = req.body;
 
        if(!tittle){
            return res.status(404).json({
                success:false,
                data:null,
                Message:"Tittle Misssing",
                error:true
            })
        }
        if(!description){
            return res.status(404).json({
                success:false,
                data:null,
                Message:"description Misssing",
                error:true
            })
        }
        if(!admin){
            return res.status(404).json({
                success:false,
                data:null,
                Message:"admin Misssing",
                error:true
            })
        }
        const existBlog = await blogModel.find({tittle:tittle})
        if(existBlog?.length){
            return res.status(200).json({
                success:false,
                data:null,
                Message:`${tittle} is already exsit`,
                error:true
            })
        }
        const afterSaveData =await new blogModel({
            tittle:tittle,
            description: description,
            admin:admin
        }).save()
        if(afterSaveData){
            return res.status(200).json({
                success:true,
                data:afterSaveData,
                Message:"Blog Upload successful",
                error:false
            })
        }
        
        
    }catch(error){
            console.log("Error form error controler")
        }
    
})

app.get("/getallblog", async(req, res)=>{
    
    try {
        const allData = await blogModel.find({})
        if(allData){

            res.status(200).json({
                success: true,
                data:allData,
                Message: "Get All blog successful",
                error: false
            })
        }
        
    } catch (error) {
        console.log("error from getallblog controler")
    }
})

app.patch("/updateblog/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const {tittle,description,admin} = req.body
        const updateData = await blogModel.findOneAndUpdate({_id:id},{
            ...(tittle && {tittle: tittle}),
            ...(description && {description:description}),
            ...(admin && {admin: admin})
        },
        {
            new:true
        })
        if(updateData){

            res.status(200).json({
                success: true,
                data:updateData,
                message: "updated successfully"
            })
        }
      
    } catch (error) {
        console.error("error from update conteroler")
    }
})

app.delete("/deleteblog/:id",async(req,res)=>{
    try {
        const { id} = req.params
        const deleteItem = await blogModel.findOneAndDelete({_id: id})
        res.status(200).json({
            success: true,
            data: deleteItem,
            message: "item delete successfuly",
            error: false
        })
        
    } catch (error) {
        console.log("error form delete controler",error)
    }
})

app.listen(4000,()=>{
    console.log(`server running on port ${4000}`)
})