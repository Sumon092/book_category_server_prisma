"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const category_controllers_1 = require("./category.controllers");
const router = express_1.default.Router();
router.post('/create-category', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controllers_1.CategoryControllers.createCategory);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controllers_1.CategoryControllers.updateCategory);
router.get('/', category_controllers_1.CategoryControllers.getAllCategory);
router.get('/:id', category_controllers_1.CategoryControllers.getSingleCategory);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controllers_1.CategoryControllers.deleteCategory);
exports.CategoryRoutes = router;
