import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import {MegaModule} from "../mega/mega.module";

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [MegaModule]
})
export class FilesModule {}
