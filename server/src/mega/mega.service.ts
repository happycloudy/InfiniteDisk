import {Injectable} from '@nestjs/common';
import {Storage} from 'megajs'
import {AccountsService} from "../accounts/accounts.service";
import AccountsInfoInterface, {MailInfoInterface} from "./interfaces/accounts-info.interface";
import SizeFactorsEnum from "../global/sizeFactorsEnum";

@Injectable()
export class MegaService {
    private connections: Storage[] = [];

    constructor(
        private accountsService: AccountsService
    ) {
        this.initUsers().then(r => this.addFile())

    }

    async initUsers() {
        const accounts = await this.accountsService.getAll()
        for (const account of accounts) {
            const megaUser = await new Storage({
                email: account.email,
                password: account.password,
            }).ready
            this.connections.push(megaUser)
        }
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
            let file = this.connections[connectionNumber].root.children.find(file => file.nodeId === nodeId)
            file.download({}, (err, data) => {
                if (err === null) {
                    resolve(data)
                }
            })
        })
    }

    async collectInfoAll(): Promise<AccountsInfoInterface> {
        const info = {
            totalFiles: 0,
            totalSpace: 0,
            currentSpace: 0,
            mails: []
        }

        for (const connection of this.connections) {
            let connectionInfo = await connection.getAccountInfo()

            info.totalFiles += connection.root.children.length
            info.totalSpace += connectionInfo.spaceTotal / SizeFactorsEnum.Mb
            info.currentSpace += connectionInfo.spaceUsed / SizeFactorsEnum.Mb
            let mail: MailInfoInterface = {
                mail: connection.email,
                totalFiles: connection.root.children.length,
                currentSpace: connectionInfo.spaceUsed / SizeFactorsEnum.Mb,
                totalSpace: connectionInfo.spaceTotal / SizeFactorsEnum.Mb
            }
            info.mails.push(mail)
        }
        return info
    }

    //IN DEV
    async addFile(file: Express.Multer.File | void) {
        console.log('adding...')
        let info = await this.collectInfoAll()
        let relevantMail, minSpace = info.mails[0].currentSpace
        info.mails.forEach(mail => {
            if(minSpace > mail.currentSpace){
                relevantMail = mail
                minSpace = mail.currentSpace
            }
        })
        console.log(relevantMail, minSpace)
        return 123
    }
}
