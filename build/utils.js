import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

/**
 * * 項目根路徑
 * @descrition 結尾不帶/
 */
export function getRootPath() {
    return path.resolve(process.cwd())
}

/**
 * * 項目 src 路徑
 * @param srcName src 目錄名稱(default: "src")
 * @descrition 結尾不帶斜杠
 */
export function getSrcPath(srcName = 'src') {
    return path.resolve(getRootPath(), srcName)
}

// const httpsReg = /^https:\/\//

export function convertEnv(envOptions) {
    const result = {}
    if (!envOptions) return result

    for (const envKey in envOptions) {
        let envVal = envOptions[envKey]
        if (['true', 'false'].includes(envVal)) envVal = envVal === 'true'

        if (['VITE_PORT'].includes(envKey)) envVal = +envVal

        result[envKey] = envVal
    }
    return result
}

/**
 * 取得當前環境下生效的配置文件名
 */
function getConfFiles() {
    const script = process.env.npm_lifecycle_script
    const reg = new RegExp('--mode ([a-z_\\d]+)')
    const result = reg.exec(script)
    if (result) {
        const mode = result[1]
        return ['.env', '.env.local', `.env.${mode}`]
    }
    return ['.env', '.env.local', '.env.production']
}

export function getEnvConfig(match = 'VITE_', confFiles = getConfFiles()) {
    let envConfig = {}
    confFiles.forEach((item) => {
        try {
            if (fs.existsSync(path.resolve(process.cwd(), item))) {
                const env = dotenv.parse(
                    fs.readFileSync(path.resolve(process.cwd(), item))
                )
                envConfig = { ...envConfig, ...env }
            }
        } catch (e) {
            console.error(`Error in parsing ${item}`, e)
        }
    })
    const reg = new RegExp(`^(${match})`)
    Object.keys(envConfig).forEach((key) => {
        if (!reg.test(key)) {
            Reflect.deleteProperty(envConfig, key)
        }
    })
    return envConfig
}
