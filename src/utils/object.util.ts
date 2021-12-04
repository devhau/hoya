
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
export const getArrayRange = (start: Number, end: Number) => {
    let arrInit: any = [];
    let i: any = start;
    for (; i <= end; i++) {
        arrInit = [...arrInit, i];
    }
    return arrInit;
}
export const FixJson = (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
}
export const isUndefined = (value: any) => {
    return value === undefined;
}

export const isNull = (value: any) => {
    return value === null;
}

export const isBoolean = (value: any) => {
    return typeof value === 'boolean';
}

export const isObject = (value: any) => {
    return value === Object(value);
}

export const isDate = (value: any) => {
    return value instanceof Date;
}

export const isBlob = (value: any) => {
    return (
        value &&
        typeof value.size === 'number' &&
        typeof value.type === 'string' &&
        typeof value.slice === 'function'
    );
}

export const isFile = (value: any) => {
    return (
        isBlob(value) &&
        typeof value.name === 'string' &&
        (typeof value.lastModifiedDate === 'object' ||
            typeof value.lastModified === 'number')
    );
}

export const initCfg = (value: any) => {
    return isUndefined(value) ? false : value;
}

export const serializeFormData = (obj: any, cfg: any, fd: any, pre: any) => {
    cfg = cfg || {};
    fd = fd || new FormData();

    cfg.indices = initCfg(cfg.indices);
    cfg.nullsAsUndefineds = initCfg(cfg.nullsAsUndefineds);
    cfg.booleansAsIntegers = initCfg(cfg.booleansAsIntegers);
    cfg.allowEmptyArrays = initCfg(cfg.allowEmptyArrays);
    cfg.noFilesWithArrayNotation = initCfg(cfg.noFilesWithArrayNotation);

    if (isUndefined(obj)) {
        return fd;
    } else if (isNull(obj)) {
        if (!cfg.nullsAsUndefineds) {
            fd.append(pre, '');
        }
    } else if (isBoolean(obj)) {
        if (cfg.booleansAsIntegers) {
            fd.append(pre, obj ? 1 : 0);
        } else {
            fd.append(pre, obj);
        }
    } else if (isArray(obj)) {
        if (obj.length) {
            obj.forEach((value: any, index: number) => {
                let key = pre + '[' + (cfg.indices ? index : '') + ']';

                if (cfg.noFilesWithArrayNotation && isFile(value)) {
                    key = pre;
                }

                serializeFormData(value, cfg, fd, key);
            });
        } else if (cfg.allowEmptyArrays) {
            fd.append(pre + '[]', '');
        }
    } else if (isDate(obj)) {
        fd.append(pre, obj.toISOString());
    } else if (isObject(obj) && !isFile(obj) && !isBlob(obj)) {
        Object.keys(obj).forEach((prop) => {
            const value = obj[prop];

            if (isArray(value)) {
                while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
                    prop = prop.substring(0, prop.length - 2);
                }
            }

            const key = pre ? pre + '[' + prop + ']' : prop;

            serializeFormData(value, cfg, fd, key);
        });
    } else {
        fd.append(pre, obj);
    }

    return fd;
}