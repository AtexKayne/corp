export const word = (n, forms) => {  
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return `${n} ${forms[2]}` }
    if (n1 > 1 && n1 < 5) { return `${n} ${forms[1]}` }
    if (n1 == 1) { return `${n} ${forms[0]}` }
    return `${n} ${forms[2]}`
}