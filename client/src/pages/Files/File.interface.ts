export default interface FileInterface {
    name: string,
    size: number | string,
    email: string,
    timestamp: number,
    nodeId: number,
    label: string,
    connectionNumber?: number,
}