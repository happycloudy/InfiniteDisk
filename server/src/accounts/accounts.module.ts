import {Module} from "@nestjs/common";
import {AccountsController} from "./accounts.controller";
import {AccountsService} from "./accounts.service";
import {PuppeteerModule} from "../puppeteer/puppeteer.module";

@Module({
    imports: [PuppeteerModule],
    controllers: [AccountsController],
    providers: [AccountsService],
})
export class AccountsModule{}