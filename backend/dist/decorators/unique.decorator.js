"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueValidator = exports.Unique = void 0;
const class_validator_1 = require("class-validator");
const fireorm_1 = require("fireorm");
function Unique(Class, field, validationOptions) {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [Class, field],
            validator: UniqueValidator,
        });
    };
}
exports.Unique = Unique;
let UniqueValidator = class UniqueValidator {
    async validate(value, args) {
        const [Class, field] = args.constraints;
        const repository = fireorm_1.getRepository(Class);
        if ((await repository.whereEqualTo(field, value).findOne()) != null) {
            return false;
        }
        return true;
    }
    defaultMessage(validationArguments) {
        return `email ${validationArguments.property} is already used`;
    }
};
UniqueValidator = __decorate([
    class_validator_1.ValidatorConstraint({ name: 'Unique', async: true })
], UniqueValidator);
exports.UniqueValidator = UniqueValidator;
//# sourceMappingURL=unique.decorator.js.map