"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_entity_1 = require("./entities/user.entity");
const common_1 = require("@nestjs/common");
const fireorm_1 = require("fireorm");
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");
const userRepository = fireorm_1.getRepository(user_entity_1.User);
let UserService = class UserService {
    async findOne(email) {
        return userRepository.whereEqualTo('email', email).findOne();
    }
    async findAll() {
        return userRepository.find();
    }
    signUp(email, password) {
        const user = new user_entity_1.User();
        user.displayName = 'Guest';
        user.email = email;
        user.password = bcrypt.hashSync(password, 15);
        user.createdAt = admin.firestore.Timestamp.now();
        user.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/socialape-52154.appspot.com/o/567950587.png?alt=media';
        user.bio = 'This is your bio! Customize this however you like!';
        user.website = 'your website';
        user.location = '';
        return userRepository.create(user);
    }
};
UserService = __decorate([
    common_1.Injectable()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map