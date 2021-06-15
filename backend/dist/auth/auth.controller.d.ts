import { SignupDTO } from 'src/user/dto/signup.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { PartialBy } from 'fireorm';
export declare class AuthController {
    private readonly userService;
    constructor(userService: UserService);
    signUp(signupDTO: SignupDTO): Promise<PartialBy<User, "password">>;
    findAll(): Promise<PartialBy<User, "password">[]>;
}
