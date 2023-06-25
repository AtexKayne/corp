export const isEqual = (arr, elem2) => {
    let isEqual = false
    arr.forEach(elem1 => {
        if (elem1.id !== elem2.id) return
        elem1.values.forEach((item, index) => {
            if (item.value === elem2.values[0].value) {
                // console.log(elem1, elem2);
                const count = elem1.values[0].basket
                isEqual = { elem1, item, index, count }
            }
        })
    })
    return isEqual
}