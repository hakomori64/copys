import { User } from './entities/user.entity';
import { PartialBy } from 'fireorm';
export declare class UserService {
    findOne(email: string): Promise<User | undefined>;
    findAll(): Promise<PartialBy<User, "password">[] | undefined>;
    signUp(email: string, password: string): Promise<PartialBy<User, "password">>;
}
