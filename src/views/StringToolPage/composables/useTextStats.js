import { ref } from 'vue'

export function useTextStats() {
  const textStats = ref({
    length: 0,
    lines: 0,
    cursorPosition: { row: 1, col: 1 },
    selection: 0,
    selectionRange: { start: 0, end: 0 }
  })

  const updateTextStats = text => {
    textStats.value.length = text.length
    textStats.value.lines = text ? text.split('\n').length : 0
  }

  const handleTextareaSelect = event => {
    const target = event.target
    const text = target.value
    const cursorPos = target.selectionStart

    // 计算光标位置
    const textBeforeCursor = text.substring(0, cursorPos)
    const row = textBeforeCursor.split('\n').length
    const lastNewLine = textBeforeCursor.lastIndexOf('\n')
    const col = lastNewLine === -1 ? cursorPos + 1 : cursorPos - lastNewLine

    textStats.value.cursorPosition = { row, col }

    // 更新选择信息
    const selectionStart = target.selectionStart
    const selectionEnd = target.selectionEnd
    textStats.value.selection = Math.abs(selectionEnd - selectionStart)

    if (textStats.value.selection > 0) {
      const textBeforeStart = text.substring(0, selectionStart)
      const textBeforeEnd = text.substring(0, selectionEnd)
      const startRow = textBeforeStart.split('\n').length
      const endRow = textBeforeEnd.split('\n').length

      textStats.value.selectionRange = {
        start: Math.min(startRow, endRow),
        end: Math.max(startRow, endRow)
      }
    } else {
      textStats.value.selectionRange = { start: 0, end: 0 }
    }
  }

  const handleCursorMove = handleTextareaSelect

  return {
    textStats,
    updateTextStats,
    handleTextareaSelect,
    handleCursorMove
  }
}
