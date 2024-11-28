export function useClipboard() {
  const copyToClipboard = async text => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      console.error('复制失败:', error)
      return false
    }
  }

  const pasteFromClipboard = async () => {
    try {
      return await navigator.clipboard.readText()
    } catch (error) {
      console.error('粘贴失败:', error)
      return null
    }
  }

  return {
    copyToClipboard,
    pasteFromClipboard
  }
}
