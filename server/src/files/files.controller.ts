import {Body, Controller, Get, Post} from '@nestjs/common';
import GetFileDto from './dto/getFile.dto';
import {FilesService} from "./files.service";

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) {}

    @Get()
    getAll() {
        return this.filesService.getAll()
    }

    @Post('/download')
    getFile(@Body() file: GetFileDto) {
        return this.filesService.getFile(file)
    }
}
