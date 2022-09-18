export const stopEventPropagation = (e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    e.nativeEvent.stopPropagation();
}

export const getRegions: any = (countries: any) => {
    const regions = countries.map((c: any) => c.region)
    return [...new Set(regions)].sort()
}

export const getLanguanges = (Obj: any) => {
    const languages = []
    for (var key in Obj) {
        languages.push(Obj[key]);   
    }
    return languages
}

export const getCurrencies = (Obj: any) => {
    const currencies = []
    for (var key in Obj) {
        currencies.push(Obj[key].name);   
    }
    return currencies
}

export const getNativeName = (Obj: any) => {
    const names = []
    for (var key in Obj) {
        names.push(Obj[key].common);   
    }
    return names[names.length-1]
}