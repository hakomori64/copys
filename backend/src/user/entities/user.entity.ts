import { Collection } from 'fireorm';

@Collection()
export class User {
	id: string;
	displayName: string;
	email: string;
	password: string;
	createdAt: FirebaseFirestore.Timestamp;
	imageUrl: string; // 'https://firebasestorage.googleapis.com/v0/b/socialape-52154.appspot.com/o/567950587.png?alt=media'
	bio: string;
	website: string;
	location: string;
}