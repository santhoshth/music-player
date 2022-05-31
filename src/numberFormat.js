export const numberFormat = (value) => {
    return new Intl.NumberFormat('en-IN').format(value);
}

export const timeFormat = (value) => {
    const minutes = Math.round((parseInt(value) / 1000) / 60);
    const seconds = Math.round((value / 1000) % 60);

    const secondString = seconds <= 9 ? ('0' + seconds) : (seconds)
    return minutes + ':' + secondString;
}