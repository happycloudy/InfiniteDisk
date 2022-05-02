import {Module} from '@nestjs/common';
import {MegaService} from './mega.service';
import {MegaController} from "./mega.controller";
import {AccountsModule} from "../accounts/accounts.module";

@Module({
    providers: [MegaService],
    exports: [MegaService],
    controllers: [MegaController],
    imports: [AccountsModule]
})
export class MegaModule {}
