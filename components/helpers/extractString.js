export function extractStringBetweenWords(str, firstWord, secondWord) {
    const regex = new RegExp(`${firstWord}(.*?)${secondWord}`)
    const match = str.match(regex)
    return match ? match[1] : ''
}