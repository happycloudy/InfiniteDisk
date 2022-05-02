import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MegaModule } from './mega/mega.module';
import { FilesModule } from './files/files.module';
import {AccountsModule} from "./accounts/accounts.module";
import {PuppeteerModule} from "./puppeteer/puppeteer.module";

@Module({
  imports: [MegaModule, FilesModule, AccountsModule, PuppeteerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
