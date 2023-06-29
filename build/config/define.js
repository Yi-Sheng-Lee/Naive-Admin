import dayjs from 'dayjs'

/**
 * * 定義全域參數，啟動或打包後加入到 window 中
 * https://vitejs.cn/config/#define
 */

// 项目构建时间
const _BUILD_TIME_ = JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss'))

export const viteDefine = {
    _BUILD_TIME_,
}
