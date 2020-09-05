import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import * as httpSignature from 'http-signature';
import { Request } from 'express';


@Injectable()
export class HttpSignatureService {
    public verifyRequest(req: Request): boolean {
        const PUBLIC_KEY = fs.readFileSync(__dirname + '/khoury-public-key.pem', 'ascii');
        const parsedRequest = httpSignature.parseRequest(req);
        return httpSignature.verifySignature(parsedRequest, PUBLIC_KEY);
    }
}
