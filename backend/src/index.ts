import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import  * as functions from 'firebase-functions';
import * as helmet from 'helmet';
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';


import * as serviceAccount from './firebaseServiceAccount.json';
import { ValidationPipe } from '@nestjs/common';

const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUri: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

const server = express();

export const createNestServer = async (expressInstance) => {

  if (!admin.apps.length) {
    const db = admin.initializeApp({
      credential: admin.credential.cert(firebase_params)
    }).firestore();
    fireorm.initialize(db);
  }

	const app = await NestFactory.create(
		AppModule,
		new ExpressAdapter(expressInstance),
	);
	app.useGlobalPipes(new ValidationPipe());
	app.use(helmet());
	app.enableCors();

	return app.init();
}

createNestServer(server)
	.then(v => console.log('Nest Ready'))
	.catch(err => console.error('Nest broken', err));

export const api = functions.https.onRequest(server);