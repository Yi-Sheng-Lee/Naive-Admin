import dayjs from 'dayjs'
import { isNullOrUndef } from '@/utils'

/**
 * @desc  正規化時間
 * @param {(Object|string|number)} time
 * @param {string} format
 * @returns {string | null}
 */
export function formatDateTime(
    time = undefined,
    format = 'YYYY-MM-DD HH:mm:ss'
) {
    return dayjs(time).format(format)
}

export function formatDate(date = undefined, format = 'YYYY-MM-DD') {
    return formatDateTime(date, format)
}

/**
 * @desc  函數節流(Throttle)
 * @param {Function} fn
 * @param {Number} wait
 * @returns {Function}
 */
export function throttle(fn, wait) {
    var context, args
    var previous = 0

    return function () {
        var now = +new Date()
        context = this
        args = arguments
        if (now - previous > wait) {
            fn.apply(context, args)
            previous = now
        }
    }
}

/**
 * @desc  函數防抖(Debounce)
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(method, wait, immediate) {
    let timeout
    return function (...args) {
        let context = this
        if (timeout) {
            clearTimeout(timeout)
        }
        // 立即執行需要兩個條件，一是 immediate=true，二是 timeout 未被賦值或被設為 null
        if (immediate) {
            /**
             * 如果定時器不存在，則立即執行，並設置一個定時器，wait 毫秒後將定時器設為 null
             * 這樣可以確保啟動定時器 wait 毫秒內不會被再次觸發
             */
            let callNow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            if (callNow) {
                method.apply(context, args)
            }
        } else {
            // 如果 immediate＝false，則函式 wait 毫秒後執行
            timeout = setTimeout(() => {
                /**
                 * args 是一個類數組 object，所以使用 fn.apply
                 * 也可寫作 method.call(context, ...args)
                 */
                method.apply(context, args)
            }, wait)
        }
    }
}

// 排序，可
export function sortByString(dataA, dataB, type='string') {
    let paramA = null
    let paramB = null
    
    if (type == 'string') {
        paramA = dataA.toUpperCase()
        paramB = dataB.toUpperCase()
    } else if (type == 'datetime') {
        paramA = new Date(dataA)
        paramB = new Date(dataB)
    }
    
    if (paramA < paramB) return -1
    if (paramA > paramB) return 1
    return 0
}

// 深層拷貝
export function deepClone (data) {
    if (isNullOrUndef(data)) return
    return JSON.parse(JSON.stringify(data))
}