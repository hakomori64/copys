import { LoginDTO } from './login.dto';
export declare class SignupDTO extends LoginDTO {
    readonly email: string;
    readonly password: string;
    readonly confirmPassword: string;
}
