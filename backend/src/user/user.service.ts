import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { getRepository, PartialBy } from 'fireorm';
import bcrypt = require('bcrypt');
import * as admin from 'firebase-admin';

const userRepository = getRepository(User);

@Injectable()
export class UserService {
	async findOne(email: string): Promise<User | undefined> {
		return userRepository.whereEqualTo('email', email).findOne();
	}

	async findAll(): Promise<PartialBy<User, "password">[] | undefined> {
		return userRepository.find();
	}

	signUp(email: string, password: string): Promise<PartialBy<User, "password">> {
		const user = new User();
		user.displayName = 'Guest';
		user.email = email;
		user.password = bcrypt.hashSync(password, 15);
		user.createdAt = admin.firestore.Timestamp.now();
		user.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/socialape-52154.appspot.com/o/567950587.png?alt=media';
		user.bio = 'This is your bio! Customize this however you like!';
		user.website = 'your website';
		user.location = '';

		return userRepository.create(user);
	}
}
