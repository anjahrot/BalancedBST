export function arrayRandom(length, maxValue){
    let array = [];
    for(let i=0;i<length;i++){
        array.push(numberRandom(1, maxValue));
    }
    return array;
}

export function numberRandom(min, max){
    return Math.floor(Math.random()*(max-min))+min;
}
