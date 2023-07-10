import * as NaiveUI from 'naive-ui'
import { isNullOrUndef } from '@/utils'
import { naiveThemeOverrides as themeOverrides } from '~/settings'
import { useAppStore } from '@/store/modules/app'

export function setupMessage(NMessage) {
    let loadingMessage = null
    class Message {
        /**
         * 规则：
         * * loading message 只會顯示一個，新的 message 會替換成正在顯示的loading message
         * * loading message 不會自動清除，除非替換成非 loading message，非 loading message 會在 2秒後自動關閉
         */

        removeMessage(message = loadingMessage, duration = 2000) {
            setTimeout(() => {
                if (message) {
                    message.destroy()
                    message = null
                }
            }, duration)
        }

        showMessage(type, content, option = {}) {
            if (loadingMessage && loadingMessage.type === 'loading') {
                // 如果存在则替换正在显示的loading message
                loadingMessage.type = type
                loadingMessage.content = content

                if (type !== 'loading') {
                    // 非loading message需设置自动清除
                    this.removeMessage(loadingMessage, option.duration)
                }
            } else {
                // 不存在正在显示的loading则新建一个message,如果新建的message是loading message则将message赋值存储下来
                let message = NMessage[type](content, option)
                if (type === 'loading') {
                    loadingMessage = message
                }
            }
        }

        loading(content) {
            this.showMessage('loading', content, { duration: 0 })
        }

        success(content, option = {}) {
            this.showMessage('success', content, option)
        }

        error(content, option = {}) {
            this.showMessage('error', content, option)
        }

        info(content, option = {}) {
            this.showMessage('info', content, option)
        }

        warning(content, option = {}) {
            this.showMessage('warning', content, option)
        }
    }

    return new Message()
}

export function setupDialog(NDialog) {
    NDialog.confirm = function (option = {}) {
        const showIcon = !isNullOrUndef(option.title)
        return NDialog[option.type || 'warning']({
            showIcon,
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: option.confirm,
            onNegativeClick: option.cancel,
            onMaskClick: option.cancel,
            ...option,
        })
    }

    return NDialog
}

export function setupNaiveDiscreteApi() {
    const appStore = useAppStore()
    const configProviderProps = computed(() => ({
        theme: appStore.isDark ? NaiveUI.darkTheme : undefined,
        themeOverrides,
    }))
    const { message, dialog, notification, loadingBar } = NaiveUI.createDiscreteApi(
        ['message', 'dialog', 'notification', 'loadingBar'],
        { configProviderProps }
    )
  
    window.$loadingBar = loadingBar
    window.$notification = notification
    window.$message = setupMessage(message)
    window.$dialog = setupDialog(dialog)
  }