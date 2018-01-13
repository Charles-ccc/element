export function saveToLocal(id,key,value) {
    let seller = window.localStorage.__seller__
    if(!seller) {
        // 在没创建seller的时候
        seller = {}
        seller[id] = {}
    }else{
        // 第二次就是拿到已经经过JSON.stringify的数据，然后再进行解析
        seller = JSON.parse(seller)
        if(!seller[id]) {
            seller[id] = {}
        }
    }
    seller[id][key] = value
    window.localStorage.__seller__ = JSON.stringify(seller)
    // JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串
}

export function loadFromLocal(id,key,def) {
    let seller = window.localStorage.__seller__
    if(!seller) {
        // 完全没有存取过，就直接返回默认值
        return def
    }
    // 如果有seller,就利用JSON.parse转化成json，并取商家id
    seller = JSON.parse(seller)[id]
    if(!seller){
        return def
    }
    // 如果取到了，就看商家的key，如果没有就返回默认值，如果有就返回ret
    let ret = seller[key]
    return ret || def
}