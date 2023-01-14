const { StatusCodes }=require('http-status-codes');

const Task= require('../models/task')
const { BadRequestError,NotFoundError }=require('../errors')

//*Controllers
const getAllTasks = async(req,res) =>{
    const{ user:{userId},params:{boardId} }=req
    
    const tasks= await Task.find({boardId,createdBy:userId})
    
    res.status(StatusCodes.OK).json({tasks})
}


const getTask = async(req,res) =>{
    const{ user:{userId},params:{boardId,taskId} }=req

    const task= await Task.findOne({createdBy:userId,boardId,_id:taskId})

    if (!task) {
        throw new NotFoundError(`No task with id ${taskId}`)
    }


    res.status(StatusCodes.OK).json({task})
}



const createTask = async(req,res) =>{
    const{ user:{userId},params:{boardId} }=req
    const { title,status,description }=req.body

    if (!title) {
        throw new BadRequestError('Please provide valid values')
    }

    const task= await Task.create({
        title,
        status,
        description,
        boardId,
        createdBy:userId
    })

    res.status(StatusCodes.CREATED).json({task})
}


const deleteTask = async(req,res) =>{
    const{ user:{userId},params:{boardId,taskId} }=req
    
    const task = await Task.findByIdAndRemove({_id:taskId,boardId,createdBy:userId})
    
    if (!task) {
        throw new NotFoundError(`No task with id ${taskId}`)
        
    }
    
    res.status(StatusCodes.OK).json({msg:'Deleted successfully'})
}


const updateTask = async(req,res) =>{

    const{ user:{userId},params:{boardId,taskId} }=req
    const { title,status,description }=req.body
    
    

    if (!title ||!status ) {
        throw new BadRequestError('Please provide valid values')
    }

    const task= await Task.findOneAndUpdate({_id:taskId,boardId,createdBy:userId},{
        title,
        status,
        description
    },{
        new: true,runValidators:true
    })

    if (!task) {
        throw new NotFoundError(`No task with id ${taskId}`)
    }

    res.status(StatusCodes.OK).json({task})


}







module.exports={
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
}