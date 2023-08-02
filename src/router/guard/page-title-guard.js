import { i18n } from '@/i18n'

const baseTitle = import.meta.env.VITE_TITLE


export function createPageTitleGuard(router) {
    router.afterEach((to) => {
        const pageTitle = to.meta?.title
        if (pageTitle) {
            document.title =
                `${pageTitle.length > 1 ? i18n.global.t(pageTitle[0], { name: i18n.global.t(pageTitle[1])}) : i18n.global.t(pageTitle[0]) } | ${baseTitle}`
        } else {
            document.title = baseTitle
        }
    })
}
