

export let updateObjectInArray = <T extends {[key: string]: unknown }>(items: Array<T>, itemID: number, objPropName: string, newObjectProps: object) => {
    return items.map(i => i[objPropName] === itemID ? {...i, ...newObjectProps} : i)
}
