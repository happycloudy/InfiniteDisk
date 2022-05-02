import {Injectable, StreamableFile} from '@nestjs/common';
import {MegaService} from "../mega/mega.service";
import GetFileDto from './dto/getFile.dto';

@Injectable()
export class FilesService {
    constructor(private dropboxService: MegaService) {
    }

    async getAll() {
        return this.dropboxService.getAllFiles()
    }

    async getFile(file: GetFileDto){
        return this.dropboxService.getFile(file.connectionNumber, file.nodeId)
    }
}
