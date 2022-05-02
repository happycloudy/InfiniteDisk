enum sizes {
    KB = 1024,
    MB = 1048576
}

const getStringSize = (size: number) => {
    if (size > sizes.MB) {
        return `${(size / sizes.MB).toFixed(1)} Кб`
    } else if (size >= sizes.KB) {
        return `${(size / sizes.KB).toFixed(1)} Кб`
    }
    return `${size} Б`
}

export default getStringSize