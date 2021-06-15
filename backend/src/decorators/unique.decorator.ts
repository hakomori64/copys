import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getRepository } from 'fireorm';

export function Unique(Class, field, validationOptions?: ValidationOptions) {
	return (object: any, propertyName: string) => {
			registerDecorator({
					target: object.constructor,
					propertyName,
					options: validationOptions,
					constraints: [Class, field],
					validator: UniqueValidator,
			});
	};
}

@ValidatorConstraint({ name: 'Unique', async: true})
export class UniqueValidator implements ValidatorConstraintInterface {
	public async validate<E>(value: string, args: ValidationArguments) {
		const [Class, field] = args.constraints;
		const repository = getRepository(Class);

		if ((await repository.whereEqualTo(field, value).findOne()) != null) {
			return false;
		}
		return true;
	}

	defaultMessage(validationArguments?: ValidationArguments): string {
		return `email ${validationArguments.property} is already used`;
	}
} 