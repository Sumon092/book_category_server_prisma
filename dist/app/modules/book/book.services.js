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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServices = void 0;
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const book_constants_1 = require("./book.constants");
const createBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data: bookData,
        include: {
            category: {
                select: {
                    title: true,
                },
            },
        },
    });
    return result;
});
const getAllBook = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: book_constants_1.bookSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    // const filterConditions = Object.keys(filterData).map(key => {
    //   if (key === 'category') {
    //     return {
    //       category: {
    //         title: (filterData as any)[key],
    //       },
    //     };
    //   } else if (key === 'minPrice') {
    //     return {
    //       price: {
    //         gte: parseFloat((filterData as any)[key]),
    //       },
    //     };
    //   } else if (key === 'maxPrice') {
    //     return {
    //       price: {
    //         lte: parseFloat((filterData as any)[key]),
    //       },
    //     };
    //   } else if (bookRelationalFields.includes(key)) {
    //     return {
    //       [bookRelationalFieldsMapper[key]]: {
    //         id: (filterData as any)[key],
    //       },
    //     };
    //   } else {
    //     return {
    //       [key]: {
    //         equals: (filterData as any)[key],
    //       },
    //     };
    //   }
    // });
    const filterConditions = Object.keys(filterData)
        .map(key => {
        if (key === 'category') {
            return {
                category: {
                    title: filterData[key],
                },
            };
        }
        else if (key === 'minPrice') {
            return (0, book_constants_1.generateNumericFilterCondition)(key, filterData[key], 'gte');
        }
        else if (key === 'maxPrice') {
            return (0, book_constants_1.generateNumericFilterCondition)(key, filterData[key], 'lte');
        }
        else {
            return {
                [key]: {
                    equals: filterData[key],
                },
            };
        }
    })
        .filter(condition => condition !== null);
    andConditions.push({
        AND: filterConditions,
    });
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : undefined;
    const result = yield prisma_1.default.book.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
        include: {
            category: true,
        },
    });
    const total = yield prisma_1.default.book.count();
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: result,
    };
});
const getBookByCategoryId = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId,
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.book.count({
        where: {
            categoryId,
        },
    });
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.BookServices = {
    createBook,
    getAllBook,
    getBookByCategoryId,
    getSingleBook,
    updateBook,
    deleteBook,
};
