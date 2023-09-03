"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const book_controllers_1 = require("./book.controllers");
const router = express_1.default.Router();
router.post('/create-book', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controllers_1.BookControllers.createBook);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controllers_1.BookControllers.updateBook);
router.get('/', book_controllers_1.BookControllers.getAllBook);
router.get('/:categoryId/category', book_controllers_1.BookControllers.getBookByCategoryId);
router.get('/book/:id', book_controllers_1.BookControllers.getBookById);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controllers_1.BookControllers.deleteBook);
exports.BookRoutes = router;
