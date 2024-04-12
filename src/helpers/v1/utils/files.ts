export function genUniqueNames(len: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const characterLength = characters.length

    let result = ''

    for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * characterLength))
    }

    return result
}


