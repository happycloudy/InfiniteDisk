import {Injectable} from "@nestjs/common";
import puppeteer from "puppeteer/lib/cjs/puppeteer/node-puppeteer-core";
import {Browser} from "puppeteer/lib/cjs/puppeteer/common/Browser";
import {Page} from "puppeteer/lib/cjs/puppeteer/common/Page";
import AccountInterface from "./interfaces/account.interface";
import {PuppeteerUtilities} from "./utilities/puppeteer.utilities";

@Injectable()
export class PuppeteerService {
    puppeteerUtilities: PuppeteerUtilities
    browser: Browser
    mailPage: Page
    megaPage: Page
    mail: string

    constructor() {
        this.puppeteerUtilities = new PuppeteerUtilities()
    }

    private async createMail() {
        this.mailPage = await this.browser.newPage();
        await this.mailPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36.')

        await this.mailPage.goto('https://10minemail.com/ru/', {
            waitUntil: 'domcontentloaded'
        })

        let mailRes = await this.mailPage.waitForResponse('https://web2.10minemail.com/mailbox')
        await this.mailPage.waitForResponse('https://web2.10minemail.com/messages')
        this.mail = (await mailRes.json()).mailbox
        return this.mail
    }

    private async registerAccount(mail: string): Promise<AccountInterface> {
        let inputDelay = 20

        this.megaPage = await this.browser.newPage();
        await this.megaPage.goto('https://mega.nz/register')
        await this.megaPage.waitForSelector('.mega-input-title')
        await this.megaPage.waitForSelector('#register-firstname-registerpage2')
        await this.megaPage.waitForTimeout(1000)

        let nameInput = await this.megaPage.$('#register-firstname-registerpage2')
        await nameInput.type('infiniteDisk', {delay: inputDelay})

        let surnameInput = await this.megaPage.$('#register-lastname-registerpage2')
        await surnameInput.type('infiniteDisk', {delay: inputDelay})

        let mailInput = await this.megaPage.$('#register-email-registerpage2')
        await mailInput.type(mail, {delay: inputDelay})

        let password = await this.puppeteerUtilities.generatePassword(12)
        await this.megaPage.click('#register-password-registerpage2')
        await this.megaPage.waitForTimeout(300)
        await this.megaPage.keyboard.type(password, {delay: inputDelay})

        await this.megaPage.click('#register-password-registerpage3')
        await this.megaPage.waitForTimeout(300)
        await this.megaPage.keyboard.type(password, {delay: inputDelay})

        let checkboxPass = await this.megaPage.$('#register_form div.understand-check.checkboxOff.checkbox.v-top > input')
        await checkboxPass.click()

        let checkboxRules = await this.megaPage.$('#register-check-registerpage2')
        await checkboxRules.click()

        await this.megaPage.waitForTimeout(2000)
        let submitButton = await this.megaPage.$('#register_form > button > span')
        await submitButton.click()

        await this.megaPage.waitForTimeout(1000)

        return {
            email: mail,
            password: password,
        }
    }

    private async submitAccount(account: AccountInterface) {
        await this.mailPage.bringToFront()
        await this.mailPage.waitForResponse(async res =>
            {
                let json = await res.json()
                return res.url() === 'https://web2.10minemail.com/messages' && json.messages.length && json.messages.find(item => item.from.toLowerCase().includes('mega'))
            }
        )


        let messageNode = await this.mailPage.$(`.maillist span[title='welcome@mega.nz']`)
        let url = await messageNode.evaluate(node => node.parentElement.getAttribute('href'))


        const messagePage = await this.browser.newPage()
        await messagePage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36.')
        await messagePage.goto(url, {
            waitUntil: 'domcontentloaded'
        })

        let submitBtn = await messagePage.waitForSelector('table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > a')
        let submitUrl = await submitBtn.evaluate(node => node.getAttribute('href'))


        await messagePage.goto(submitUrl, {
            waitUntil: 'domcontentloaded'
        })
        let passwordInput = await messagePage.waitForSelector('#login-password2')
        await messagePage.screenshot({fullPage: true, path: 'example.jpg'})
        await passwordInput.click()
        await messagePage.keyboard.type(account.password)

        submitBtn = await messagePage.$('#login_form > button > span')
        await submitBtn.click()

        let freeBtn = await messagePage.waitForSelector('.free-button span')
        await freeBtn.click()

        return true
    }

    async createAccount() {
        this.browser = await puppeteer.launch({headless: true});

        await this.createMail()
        let account = await this.registerAccount(this.mail)
        let isSubmitted = await this.submitAccount(account)

        if(isSubmitted){
            await this.browser.close();
            return account
        }
    }
}