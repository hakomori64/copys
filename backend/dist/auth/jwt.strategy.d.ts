import { Strategy } from 'passport-jwt';
import { LoginDTO } from 'src/user/dto/login.dto';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: LoginDTO): Promise<LoginDTO>;
}
export {};
