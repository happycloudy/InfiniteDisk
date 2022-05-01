export default interface FileInterface {
    id: number,
    size: number | string,
    path_display: string,
    path_lower: string,
    connectionNumber?: number,
}