import {Controller, Get, Post} from "@nestjs/common";
import {AccountsService} from "./accounts.service";
import {PuppeteerService} from "../puppeteer/puppeteer.service";
import AccountInterface from "../puppeteer/interfaces/account.interface";
import {resolve as fsResolve} from "path";
import * as fs from "fs";

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService,
                private puppeteerService: PuppeteerService) {
    }

    //TODO: удалить
    @Get()
    async getAll() {
        return this.accountsService.getAll()
    }

    @Post()
    async createAccount() {
        let account = await this.puppeteerService.createAccount()

        let dataPath = fsResolve(process.cwd(), 'data/accounts.csv')
        await fs.promises.appendFile(dataPath, `${account.email} ${account.password}\n`)

        return 'Created'
    }
}