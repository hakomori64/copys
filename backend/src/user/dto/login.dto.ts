import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	readonly email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly password: string;
}