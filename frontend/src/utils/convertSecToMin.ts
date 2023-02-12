export function secToMin(value: number): string {
    const day = Math.floor(value / (24 * 3600));
 
    value = value % (24 * 3600);
    const hour = Math.floor(value / 3600);

    value %= 3600;
    const minutes = Math.floor(value / 60);

    value %= 60;
    const seconds = value;
 
        
    if(day>0) return `${day} day, ${hour} hours, ${minutes} minutes,${seconds} seconds`;
    if(hour>0) return `${hour} hours, ${minutes} minutes,${seconds} seconds`;
    if(minutes>0) return `${minutes} minutes, ${seconds} seconds`;
    return `${seconds} seconds`
}

const addZero = (number: number): string => number>9 ? String(number) : '0'+String(number);

export function secToMinMobile(value: number): string {

    const day = Math.floor(value / (24 * 3600));
 
    value = value % (24 * 3600);
    const hour = Math.floor(value / 3600);

    value %= 3600;
    const minutes = Math.floor(value / 60);

    value %= 60;
    const seconds = value;
 
        
    if(day>0) return `${day} day ${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`;
    if(hour>0) return `${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`;
    if(minutes>0) return `${addZero(minutes)}:${addZero(seconds)}`;
    return `${seconds}s`
}