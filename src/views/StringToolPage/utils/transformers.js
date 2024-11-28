export const textTransformers = {
  sentence_case: text => {
    return text.replace(/(\b|^)[a-z]/g, m => m.toUpperCase())
  },

  upper_case: text => {
    return text.toUpperCase()
  },

  lower_case: text => {
    return text.toLowerCase()
  },

  title_case: text => {
    return text.replace(/(?:^|\b)(\w)/g, c => c.toUpperCase())
  },

  snake_case: text => {
    return text
      .replace(/\s+/g, '_')
      .replace(/\-/g, '_')
      .replace(/\B([A-Z])/g, '_$1')
      .toLowerCase()
  },

  kebab_case: text => {
    return text
      .replace(/\s+/g, '-')
      .replace(/\_/g, '-')
      .replace(/\B([A-Z])/g, '-$1')
      .toLowerCase()
  },

  camel_case: text => {
    return text.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
  },

  pascal_case: text => {
    return text
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^[a-z]/, m => m.toUpperCase())
  },

  remove_empty_lines: text => {
    return text
      .split('\n')
      .filter(line => line.trim())
      .join('\n')
  },

  remove_duplicate_lines: text => {
    const seen = new Set()
    return text
      .split('\n')
      .filter(line => {
        const trimmed = line.trim()
        const isDuplicate = seen.has(trimmed)
        seen.add(trimmed)
        return !isDuplicate
      })
      .join('\n')
  },

  trim_spaces: text => {
    return text
      .split('\n')
      .map(line => line.trim())
      .join('\n')
  },

  add_line_numbers: text => {
    let lineNumber = 1
    return text
      .split('\n')
      .map(line => {
        if (line.trim()) {
          return `${lineNumber++}. ${line}`
        }
        return line
      })
      .join('\n')
  }
}
