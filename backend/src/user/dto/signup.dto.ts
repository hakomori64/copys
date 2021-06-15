import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { LoginDTO } from './login.dto';
import { Match } from 'src/decorators/match.decorator';
import { Unique } from 'src/decorators/unique.decorator';
import { User } from 'src/user/entities/user.entity';

export class SignupDTO extends LoginDTO {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	@Unique(User, 'email')
	readonly email: string

	@ApiProperty()
	@MinLength(4)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
	readonly password: string


	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MinLength(4)
	@Match('password')
	readonly confirmPassword: string
}