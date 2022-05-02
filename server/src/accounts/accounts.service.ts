import {Injectable} from "@nestjs/common";
import * as csv from 'csv';
import {createReadStream} from "fs";
import {resolve as fsResolve} from "path";

@Injectable()
export class AccountsService {
    async getAll() {
        let accounts = []
        let stream = createReadStream(fsResolve(process.cwd(), 'data/accounts.csv')).pipe(csv.parse({
            delimiter: ' ',
            columns: true
        })).on('data', (data) => {
            accounts.push(data)
        })
        return new Promise(resolve => {
            stream.on('end', () => {
                resolve(accounts)
            })
        })
    }
}