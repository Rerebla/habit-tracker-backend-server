export const splitStringIntoArray = (string: string, seperator: string = ";") => {
    return removeEmptyArrayElements(string.split(seperator));
};

export const arrayToString = (array: string[], seperator: string = ";") => {
    let string = "";
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        string += element.endsWith(seperator) ? element : element + seperator;
    }
    return string;
};
export const removeEmptyArrayElements = (array: any[]) => {
    return array.filter(Boolean);
};