import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
export declare function Unique(Class: any, field: any, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
export declare class UniqueValidator implements ValidatorConstraintInterface {
    validate<E>(value: string, args: ValidationArguments): Promise<boolean>;
    defaultMessage(validationArguments?: ValidationArguments): string;
}
