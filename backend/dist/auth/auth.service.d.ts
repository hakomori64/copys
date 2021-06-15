import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PartialBy } from 'fireorm';
import { LoginDTO } from 'src/user/dto/login.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<PartialBy<User, 'password'>>;
    login(loginDTO: LoginDTO): Promise<{
        access_token: string;
    }>;
}
