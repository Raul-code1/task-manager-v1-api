const { StatusCodes } = require("http-status-codes");

const Board = require("../models/board");
const { BadRequestError, NotFoundError } = require("../errors");

//*Controllers
const getAllBoards = async (req, res) => {
  const { userId } = req.user;
  const boards = await Board.find({ createdBy: userId }).sort('-createdAt')
  res.status(StatusCodes.OK).json({ boards });
};

const createBoard = async (req, res) => {
  const { userId } = req.user;
  const { name } = req.body;
  if (!name) {
    throw new BadRequestError("Please provide a board name");
  }
  const board = await Board.create({ name, createdBy: userId });
  res.status(StatusCodes.CREATED).json({ board });
};

const deleteBoard = async (req, res) => {
  const { id: boardId } = req.params;
  const { userId } = req.user;

  const board = await Board.findByIdAndDelete({
    _id: boardId,
    createdBy: userId,
  });
  if (!board) {
    throw new NotFoundError(`No board with id ${boardId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Deleted successfully" });
};

const updateBoard = async (req, res) => {
  const { id: boardId } = req.params;
  const { userId } = req.user;
  const { name } = req.body;
  if (!name) {
    throw new BadRequestError("Please provide a board name");
  }

  const board = await Board.findByIdAndUpdate(
    {
      _id: boardId,
      createdBy: userId,
    },
    req.body,
    { new:true, runValidators: true}
  );

  if (!board) {
    throw new NotFoundError(`No board with id ${boardId}`);
  }

  res.status(StatusCodes.OK).json({ board });
};





module.exports = {
  getAllBoards,
  createBoard,
  deleteBoard,
  updateBoard,
};
