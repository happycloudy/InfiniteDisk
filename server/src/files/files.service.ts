import {Injectable} from '@nestjs/common';
import {DropboxService} from "../dropbox/dropbox.service";
import GetFileDto from './dto/getFile.dto';

@Injectable()
export class FilesService {
    constructor(private dropboxService: DropboxService) {
    }

    async getAll() {
        return this.dropboxService.getAll()
    }

    async getFile(file: GetFileDto) {
        return this.dropboxService.getFile(file.connectionNumber, file.path)
    }
}
