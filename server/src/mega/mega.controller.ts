import {Controller, Get} from "@nestjs/common";
import {MegaService} from "./mega.service";

@Controller('mega')
export class MegaController {
    constructor(private megaService: MegaService) {}

    @Get('/info')
    async getInfo() {
        return this.megaService.collectInfoAll()
    }
}