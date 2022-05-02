import {Controller, Get, Post} from "@nestjs/common";
import {AccountsService} from "./accounts.service";
import {PuppeteerService} from "../puppeteer/puppeteer.service";

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService,
                private puppeteerService: PuppeteerService) {}

    @Get()
    getAll() {
        return this.accountsService.getAll()
    }

    @Post()
    createAccount() {
        return this.puppeteerService.createAccount()
    }
}