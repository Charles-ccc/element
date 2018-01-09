export function formatDate(date,fmt){
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4-RegExp.$1.length))
        //RegExp.$1 返回在模式匹配期间找到的，所存储的最近的九个部分
        //RegExp.$1 就匹配到yyyy，然后替换
        //(4-RegExp.$1.length) 年份是四位，所以用4减，从0开始截取
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for(let k in o){
        if(new RegExp(`(${k})`).test(fmt)){
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

//补零函数
function padLeftZero(str){
    return('00' + str).substr(str.length)
}