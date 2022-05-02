import {Injectable} from '@nestjs/common';
import {Storage} from 'megajs'
import {AccountsService} from "../accounts/accounts.service";

@Injectable()
export class MegaService {
    private connections: Storage[] = [];

    constructor(
        private accountsService: AccountsService
    ) {
        this.initUsers()
    }

    async initUsers() {
        const accounts = await this.accountsService.getAll()
        for (const account of accounts) {
            const megaUser = await new Storage({
                email: 'infinedisk.test@gmail.com',
                password: '123a123A!!',
            }).ready
            this.connections.push(megaUser)
        }
    }

    async getAllFiles() {
        const files = []
        let connectionNumber = 0
        for (const connection of this.connections) {
            console.log(connectionNumber)
            connection.root.children.map(file => {
                console.log(file.name, file.size)
            })
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
        // return Object.keys(this.conn ections[0].root.children[0])
    }

    async getFile(connectionNumber: number, nodeId): Promise<Buffer> {
        return new Promise(resolve => {
            let file = this.connections[connectionNumber].root.children.find(file => file.nodeId === nodeId)
            file.download({}, (err, data) => {
                if(err === null){
                    resolve(data)
                }
            })
        })
    }
}
