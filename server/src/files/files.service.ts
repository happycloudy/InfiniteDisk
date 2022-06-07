import {Injectable, StreamableFile} from '@nestjs/common';
import {MegaService} from "../mega/mega.service";
import GetFileDto from './dto/getFile.dto';

@Injectable()
export class FilesService {
    constructor(private megaService: MegaService) {
    }

    async getAll() {
        return this.megaService.getAllFiles()
    }

    async getFile(file: GetFileDto){
        return this.megaService.getFile(file.connectionNumber, file.nodeId)
    }

    async addFile(file: Express.Multer.File) {
        return this.megaService.addFile(file)
    }
}
