
export const moduleToRouter = (modules: any, pageDefault: any) => {
    return Object.keys(modules).map((key) => {
        const item = modules[key];
        if (item.page) {
            return {
                path: `/${key}`,
                name: item.name ?? key,
                meta: {
                    module: key,
                },
                props: { module: item },
                component: item.page,
            }
        } else {
            return {
                path: `/${key}`,
                name: item.name ?? key,
                meta: {
                    module: key,
                },
                props: { module: item },
                component: pageDefault,
            }
        }

    })
}

export const getArrayRange = (start: Number, end: Number) => {
    let arrInit: any = [];
    let i: any = start;
    for (; i <= end; i++) {
        arrInit = [...arrInit, i];
    }
    return arrInit;
}