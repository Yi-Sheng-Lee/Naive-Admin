module.exports = {
    disableEmoji: false, // 是否禁用 emoji
    // format: '{type}{scope}: {emoji}{subject}',
    // types: [ // Commit 類型的清單
    //     {
    //         name: 'chore',
    //         description: '增加或修改第三方套件(輔助工具)等 (maintain)', // Commit 類型的描述
    //         emoji: '🤖', // Commit 類型的 emoji
    //         value: 'Chore' // Commit 類型的值
    //     },
    //     {
    //         name: 'ci',
    //         description: 'CI 相關更動(Continuous Integration)',
    //         emoji: '🎡',
    //         value: 'Ci'
    //     },
    //     {
    //         name: 'docs',
    //         description: '修改/新增文件 (documentation)',
    //         emoji: '✏️',
    //         value: 'Docs'
    //     },
    //     {
    //         name: 'feat',
    //         description: '新增/修改功能 (Feature)',
    //         emoji: '🎸',
    //         value: 'Feat'
    //     },
    //     {
    //         name: 'fix',
    //         description: '修正 Bug (bug fix)',
    //         emoji: '🐛',
    //         value: 'Fix'
    //     },
    //     {
    //         name: 'perf',
    //         description: '提高效能的程式碼修正',
    //         emoji: '⚡️',
    //         value: 'Perf'
    //     },
    //     {
    //         name: 'refactor',
    //         description: '重構 or 優化，不屬於 bug 也不屬於新增功能等',
    //         emoji: '💡',
    //         value: 'Refactor'
    //     },
    //     {
    //         name: 'release',
    //         description: '新增正式釋出的 release commit 訊息',
    //         emoji: '🏹',
    //         value: 'Release'
    //     },
    //     {
    //         name: 'style',
    //         description: '修改程式碼格式或風格，不影響原有運作，例如 ESLint (formatting, missing semi colons, …)',
    //         emoji: '💄',
    //         value: 'Style'
    //     },
    //     {
    //         name: 'test',
    //         description: '增加測試功能 (when adding missing tests)',
    //         emoji: '💍',
    //         value: 'Test'
    //     },
    // ],
    types: [
        { value: 'feat',      name:'feat:      新增功能' },
        { value: 'fix',       name:'fix:       修正 bug' },
        { value: 'docs',      name:'docs:      文件變更' },
        { value: 'style',     name:'style:     程式格式（不影響功能，例如空格、分號等格式修正）' },
        { value: 'refactor',  name:'refactor:  程式重構（不包括 bug 修正、功能新增）' },
        { value: 'perf',      name:'perf:      效能優化' },
        { value: 'test',      name:'test:      新增、修改測試案例' },
        { value: 'build',     name:'build:     建構流程、外部套件依賴變更（如升级 npm、修改套件配置等）' },
        { value: 'ci',        name:'ci:        修改 CI 腳本、配置' },
        { value: 'chore',     name:'chore:     对构建过程或辅助工具和库的更改（不影响源文件、测试用例）' },
        { value: 'revert',    name:'revert:    還原 commit' },
        { value: 'wip',       name:'wip:       開發中 (work in process)' },
        { value: 'mod',       name:'mod:       不確定分類的修改' },
        { value: 'release',   name:'release:   發佈' },
    ],
    scopes: [],
    messages: {
        type: '請選擇要 Commit 的類型(必選)：',
        customScope: '選擇此次 Commit 影響的範圍(可選，若無，請按 Enter 略過):',
        subject: '簡短描述 Commit 的修正範圍(必填)：\n',
        body: '更詳細的 Commit 說明(可選，若無，請按 Enter 略過):\n ',
        breaking: '列出所有重大更改(可選，若無，請按 Enter 略過):\n',
        footer: '此次 Commit 會關閉的 Issues, e.g #123(可選，若無，請按 Enter 略過):',
        confirmCommit: '請確認本次 Commit 描述。\n',
    },
    allowBreakingChanges: ['feat', 'fix'],
    subjectLimit: 100,
    breaklineChar: '|'
}
