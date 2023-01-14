const express=require('express');
const router=express.Router();

const { getAllBoards, createBoard, deleteBoard, updateBoard }=require('../controllers/board')

const {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
} = require('../controllers/task')

router.route('/').get(getAllBoards).post(createBoard)
router.route('/:id').delete(deleteBoard).patch(updateBoard)

router.route('/task/:boardId').get(getAllTasks).post(createTask)
router.route('/task/:boardId/:taskId').get(getTask).patch(updateTask).delete(deleteTask)







module.exports =router
