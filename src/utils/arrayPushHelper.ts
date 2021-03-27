export const arrayPushHelper = (array1: any[], array2: any[]) => {
    for (let index in array2) {
        array1.push(array2[index]);
    }
    return array1;
}