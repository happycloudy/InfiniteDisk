import {Controller, Get} from "@nestjs/common";
import {MegaService} from "./mega.service";

@Controller('mega')
export class MegaController {
    constructor(private dropboxService: MegaService) {}

    // @Get('')
    // async AuthAll() {
    //     return this.dropboxService.authAll()
    // }
}