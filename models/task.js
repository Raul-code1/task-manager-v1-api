const { Schema,model, Types }=require('mongoose')



const TaskSchema= new Schema({
    title:{
        type:String,
        required:[true,'Please provide a task title'],
        trim:true
    },
    description:{
        type:String,
        default:null,
    },
    status:{
        type:String,
        enum:['to do','in process','done'],
        default:'to do'
    },
    boardId:{
        type:Types.ObjectId,
        ref:'Board',
        required:true,
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    }
},{
    timestamps:true,
});




module.exports=model('Task',TaskSchema)



