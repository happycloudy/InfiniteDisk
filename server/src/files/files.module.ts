import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import {DropboxModule} from "../dropbox/dropbox.module";

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [DropboxModule]
})
export class FilesModule {}
