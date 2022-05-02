import { Controller, Get, Param, Res} from '@nestjs/common';
import GetFileDto from './dto/getFile.dto';
import {FilesService} from "./files.service";

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) {
    }

    @Get()
    getAll() {
        return this.filesService.getAll()
    }

    @Get('/download/:nodeId/:connectionNumber')
    async getFile(@Param() file: GetFileDto, @Res() res) {
        let buffer = await this.filesService.getFile(file)
        return res.send(Buffer.from(buffer))
    }
}
