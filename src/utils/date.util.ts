export const isLeapYear = (year: number) => {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};
export const getDaysInMonth = (year: number, month: number) => {
    return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};
export const addDays = (date: Date, days: number) => {
    let dateClone = new Date(date.getTime())
    dateClone.setDate(dateClone.getDate() + days);
    return dateClone;
}
export const addMonths = (date: Date, month: number) => {
    let dateClone = new Date(date.getTime())
    var n = dateClone.getDate();
    dateClone.setDate(1);
    dateClone.setMonth(dateClone.getMonth() + month);
    dateClone.setDate(Math.min(n, getDaysInMonth(dateClone.getFullYear(), dateClone.getMonth())));
    return dateClone;
}
export const getArrayDateInRange = (startDate: Date, endDate: Date) => {
    let arrDay: any = [];
    let i = 0;
    for (; (addDays(startDate, i)) <= endDate; i++) {
        arrDay = [...arrDay, addDays(startDate, i)];
    }
    return arrDay;
}

export const getNumberDateInRange = (startDate: Date, endDate: Date) => {
    let i = 0;
    if (startDate < endDate) {
        let i = 0;
        for (; (addDays(startDate, i)) <= endDate; i++) { }
        return i;
    }
    for (; (addDays(endDate, i)) <= startDate; i++) { }

    return 0 - i;
}
export const formatDate: any = (date: any, format: any = 'yyyy-MM-dd') => {
    let dateClone = new Date(date)
    var z: any = {
        M: dateClone.getMonth() + 1,
        d: dateClone.getDate(),
        h: dateClone.getHours(),
        m: dateClone.getMinutes(),
        s: dateClone.getSeconds()
    };
    format = format.replace(/(M+|d+|h+|m+|s+)/g, (v: any) => {
        return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
    });

    return format.replace(/(y+)/g, (v: any) => {
        return dateClone.getFullYear().toString().slice(-v.length)
    });
}