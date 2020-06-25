function summing(array) {
    let sum = 0;
    array.forEach((el) => {
        sum += parseFloat(el.value);
    });
    return sum
}


export {
    summing
}