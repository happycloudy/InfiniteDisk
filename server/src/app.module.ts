import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DropboxModule } from './dropbox/dropbox.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [DropboxModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
