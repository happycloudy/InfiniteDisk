import {Module} from '@nestjs/common';
import {MegaService} from './mega.service';
import {MegaController} from "./mega.controller";

@Module({
    providers: [MegaService],
    exports: [MegaService],
    controllers: [MegaController]
})
export class MegaModule {}
