
export const makeClassByNum = (className: string, prex: string, Num: number, pr = '-') => {
    if (Num === 0) {
        return `${className} ${prex}${pr}auto`;
    }
    if (0 < Num && Num <= 12) {
        return `${className} ${prex}${pr}${Num}`;
    }
    return className;
}

export const makeClassByName = (className: string, prex: string, value: string | number, pr = '-') => {
    if (value !== '') {
        return `${className} ${prex}${pr}${value}`;
    }
    return className;
}
export const makeValueByData = (data: any, field: string, isDefaultData = true) => {
    if (data && field) {
        return data[field] ?? data;
    }
    if (isDefaultData) {
        return data;
    }
    return null;
}
export const isFunction = (functionToCheck: any) => {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
export const isArray = (obj: any) => Array.isArray(obj);
export const FixJson = (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
}