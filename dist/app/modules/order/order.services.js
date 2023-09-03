"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.create({
        data: {
            userId: payload.userId,
            orderedBooks: payload.orderedBooks,
        },
    });
    return result;
});
const getAllOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    role: true,
                    contactNo: true,
                    address: true,
                    profileImg: true,
                },
            },
        },
    });
    return result;
});
const getOrdersByCustomer = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield prisma_1.default.order.findMany({
        where: {
            userId,
        },
        include: {
            user: {
                select: {
                    name: true,
                },
            },
        },
    });
    return orders;
});
const getOrderByCustomer = (orderId, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === 'admin') {
        return prisma_1.default.order.findUnique({
            where: {
                id: orderId,
            },
        });
    }
    else if (user.role === 'customer') {
        const order = yield prisma_1.default.order.findUnique({
            where: {
                id: orderId,
            },
        });
        if (!order) {
            throw new ApiError_1.default(http_status_1.default.OK, 'Order not found');
        }
        if (order.userId === user.userId) {
            return order;
        }
    }
    throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unexpected condition');
});
exports.OrderServices = {
    createOrder,
    getAllOrder,
    getOrdersByCustomer,
    getOrderByCustomer,
};
