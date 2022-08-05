

export function setLocal(itemName, data) {
    return window.localStorage.setItem(itemName, JSON.stringify(data))
}

export function getLocal(itemName) {
    return JSON.parse(window.localStorage.getItem(itemName))
}