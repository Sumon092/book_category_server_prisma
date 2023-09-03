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
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
// function exclude<User, Key extends keyof User>(
//   user: User,
//   keys: Key[]
// ): Omit<User, Key> {
//   const result: Partial<User> = {};
//   for (const key of Object.keys(user) as Key[]) {
//     if (!keys.includes(key)) {
//       result[key] = user[key];
//     }
//   }
//   return result as Omit<User, Key>;
// }
const signUp = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = userData, userInfo = __rest(userData, ["password"]);
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, userInfo), { password: hashedPassword }),
    });
    return result;
});
const login = (email, providedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.OK, 'User no found');
    }
    const isPasswordValid = yield bcrypt_1.default.compare(providedPassword, user.password);
    const { role, id: userId } = user;
    if (isPasswordValid) {
        const accessToken = jwtHelpers_1.jwtHelpers.createToken({ role, userId }, config_1.default.jwt.secret, config_1.default.jwt.jwt_expires);
        return accessToken;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Password does not match');
    }
});
exports.AuthServices = {
    signUp,
    login,
};
