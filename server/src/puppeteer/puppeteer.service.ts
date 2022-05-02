import {Injectable} from "@nestjs/common";
import puppeteer from "puppeteer/lib/cjs/puppeteer/node-puppeteer-core";

@Injectable()
export class PuppeteerService {
    browser

    constructor() {
        this.init()
    }

    private async init() {
        this.browser = await puppeteer.launch();
    }

    private async takeMail() {

    }

    async createAccount() {
        const page = await this.browser.newPage();
        await page.goto('https://google.com');

        await this.browser.close();
    }
}