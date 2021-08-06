import { Injectable } from "@nestjs/common";
import util from "util";
import crypto from "crypto";

const pbkdf2Promise = util.promisify(crypto.pbkdf2);

@Injectable()
export class ApiService {


}
