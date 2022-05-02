import {Injectable} from '@nestjs/common';
import {Storage} from 'megajs'
import {isNull} from "util";
// import {Dropbox} from "mega";
// import * as fs from "fs";

@Injectable()
export class MegaService {
    private connections: Storage[] = [];

    constructor() {
        this.initUsers()
    }

    async initUsers() {
        const megaUser = await new Storage({
            email: 'infinedisk.test@gmail.com',
            password: '123a123A!!',
        }).ready
        this.connections.push(megaUser)
    }

    async getAllFiles() {
        const files = []
        let connectionNumber = 0
        for (const connection of this.connections) {
            files.push(...connection.root.children.map(file => ({
                name: file.name,
                size: file.size,
                email: file.owner,
                timestamp: file.timestamp,
                nodeId: file.nodeId,
                label: file.label,
                connectionNumber: connectionNumber
            })))
            connectionNumber++
        }
        return files
        // file keys
        // return Object.keys(this.connections[0].root.children[0])
    }

    async getFile(connectionNumber: number, nodeId): Promise<Buffer> {
        return new Promise(resolve => {
            let file = this.connections[0].root.children.find(file => file.nodeId === nodeId)
            file.download({}, (err, data) => {
                if(err === null){
                    resolve(data)
                }
            })
        })
    }
}
