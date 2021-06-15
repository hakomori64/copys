"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.createNestServer = void 0;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const express = require("express");
const functions = require("firebase-functions");
const helmet = require("helmet");
const admin = require("firebase-admin");
const fireorm = require("fireorm");
const serviceAccount = require("./firebaseServiceAccount.json");
const common_1 = require("@nestjs/common");
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
const createNestServer = async (expressInstance) => {
    if (!admin.apps.length) {
        const db = admin.initializeApp({
            credential: admin.credential.cert(firebase_params)
        }).firestore();
        fireorm.initialize(db);
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressInstance));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(helmet());
    app.enableCors();
    return app.init();
};
exports.createNestServer = createNestServer;
exports.createNestServer(server)
    .then(v => console.log('Nest Ready'))
    .catch(err => console.error('Nest broken', err));
exports.api = functions.https.onRequest(server);
//# sourceMappingURL=index.js.map