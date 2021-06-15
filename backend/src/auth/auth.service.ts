import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { PartialBy } from 'fireorm';
import { LoginDTO } from 'src/user/dto/login.dto';


@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, pass: string): Promise<PartialBy<User, 'password'>> {
		const user: User = await this.userService.findOne(email);
		if (user && bcrypt.compareSync(pass, user.password)) {
			return user;
		}
		return null;
	}

	async login(loginDTO: LoginDTO) {
		return {
			access_token: this.jwtService.sign(loginDTO)
		}
	}
}
