function cached(fn: any) {
    const cache = Object.create(null);
    return function cachedFn(str: string) {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}

const regex = /-(\w)/g;
const camelize = cached((str: string) => str.replace(regex, (_, c) => c.toUpperCase()));

export { camelize };