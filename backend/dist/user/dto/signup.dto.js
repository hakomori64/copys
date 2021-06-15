"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const login_dto_1 = require("./login.dto");
const match_decorator_1 = require("../../decorators/match.decorator");
const unique_decorator_1 = require("../../decorators/unique.decorator");
const user_entity_1 = require("../entities/user.entity");
class SignupDTO extends login_dto_1.LoginDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.IsEmail(),
    unique_decorator_1.Unique(user_entity_1.User, 'email'),
    __metadata("design:type", String)
], SignupDTO.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.MinLength(4),
    class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' }),
    __metadata("design:type", String)
], SignupDTO.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(4),
    match_decorator_1.Match('password'),
    __metadata("design:type", String)
], SignupDTO.prototype, "confirmPassword", void 0);
exports.SignupDTO = SignupDTO;
//# sourceMappingURL=signup.dto.js.map