export class SFTPFile {
    type: string
    name: string // file name
    size: number // file size
    modifyTime: number // file timestamp of modified time
    accessTime: number // file timestamp of access time
    rights: {
        user: string
        group: string
        other: string
    }
    owner: number // user ID
    group: number // group ID
    longname: string // like ls -l line
}