export interface MailInfoInterface {
    mail: string,
    totalFiles: number,
    currentSpace: number,
    totalSpace: number,
}

export default interface AccountsInfoInterface {
    totalSpace: number,
    currentSpace: number,
    totalFiles: number,
    mails: MailInfoInterface[],
}