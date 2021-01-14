
export const timefmt = (timer)=>{
    const time = new Date(Number(timer));
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const mm = time.getMinutes();
    const s = time.getSeconds();
    return `${y}-${m}-${d} ${h}:${mm}:${s}`;
}