import {Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import GetFileDto from './dto/getFile.dto';
import {FilesService} from "./files.service";
import {FileInterceptor} from "@nestjs/platform-express";

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

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async loadFile(@UploadedFile() file: Express.Multer.File) {
        return await this.filesService.addFile(file)? 'Success' : ''
    }
}
