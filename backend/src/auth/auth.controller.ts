import { Controller, Body, Post, Get } from '@nestjs/common';
import { SignupDTO } from 'src/user/dto/signup.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { PartialBy } from 'fireorm';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly userService: UserService
	) {}

	@Post('signup')
	signUp(@Body() signupDTO: SignupDTO): Promise<PartialBy<User, "password">> {
		return this.userService.signUp(signupDTO.email, signupDTO.password);
	}

	@Get()
	findAll(): Promise<PartialBy<User, "password">[]> {
		return this.userService.findAll();
	}
}
