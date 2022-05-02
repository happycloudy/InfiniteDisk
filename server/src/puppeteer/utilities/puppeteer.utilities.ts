export class PuppeteerUtilities {
    chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    async generatePassword(length) {
        let password = ''
        for (let i = 0; i <= length; i++) {
            let randomNumber = Math.floor(Math.random() * this.chars.length);
            password += this.chars.substring(randomNumber, randomNumber +1);
        }
        return password
    }

}