import {Injectable, StreamableFile} from '@nestjs/common';
import {Dropbox} from "dropbox";
import * as fs from "fs";
import {createReadStream} from "fs";

@Injectable()
export class DropboxService {
    private connections: any[] = [];

    constructor() {
        const dropbox = new Dropbox({
            accessToken: 'sl.BGsAAbANQt321Vtl4xkaOHvDxjX8KGF5HSMfBRZtJa6lmz_ehrmI6WF3DVOI6cOBg_YxDXr2WaWp63KghMUpsFK704H47ZpO3j35H8y5dmsOhbZcSnaV21ECXZdkQGh2XpZfRQSe1gGn'
        })

        this.connections.push(dropbox)
    }

    async getAll() {
        const files = []
        let connectionNumber = 0
        for (const connection of this.connections) {
            let filesPart = await connection.filesListFolder({
                path: ''
            })
            filesPart.result.entries = filesPart.result.entries.map(entry => {
                entry.connectionNumber = connectionNumber
                return entry
            })
            files.push(...filesPart.result.entries)

            connectionNumber++
        }

        return files
    }

    async getFile(connectionNumber: number, path: string): Promise<StreamableFile> {
        let {result} = await this.connections[connectionNumber].filesDownload({path: path})
        fs.access('tmp', (err) => {
            if (err) {
                fs.mkdir('tmp', () => {
                    fs.writeFile(`tmp/${result.name}`, result.fileBinary, {encoding: 'binary'}, (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log('created tmp/')
                    });
                })
            } else {
                fs.writeFile(`tmp/${result.name}`, result.fileBinary, {encoding: 'binary'}, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
        })

        const file = createReadStream(`tmp/${result.name}`);
        return new StreamableFile(file);
    }
}
