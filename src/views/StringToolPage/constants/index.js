export const textModes = [
  {
    label: '句子首字母大写转換 (Sentence case)',
    value: 'sentence_case'
  },
  {
    label: '大写转換 (UPPER CASE)',
    value: 'upper_case'
  },
  {
    label: '小写转換 (lower case)',
    value: 'lower_case'
  },
  {
    label: '单词首字母大写转換 (Title Case)',
    value: 'title_case'
  },
  {
    label: '蛇形命名法转換 (snake_case)',
    value: 'snake_case'
  },
  {
    label: '短横线命名法转換 (kebab-case)',
    value: 'kebab_case'
  },
  {
    label: '驼峰转换 (camelCase)',
    value: 'camel_case'
  },
  {
    label: '帕斯卡转換 (PascalCase)',
    value: 'pascal_case'
  },
  {
    label: '移除空行',
    value: 'remove_empty_lines'
  },
  {
    label: '移除重复行',
    value: 'remove_duplicate_lines'
  },
  {
    label: '移除首尾空格',
    value: 'trim_spaces'
  },
  {
    label: '添加行号',
    value: 'add_line_numbers'
  }
]

export const functionCategories = [
  {
    id: 'case',
    title: '大小写转换',
    icon: 'ri-text-wrap',
    modes: ['sentence_case', 'upper_case', 'lower_case', 'title_case']
  },
  {
    id: 'naming',
    title: '命名格式',
    icon: 'ri-code-box-line',
    modes: ['snake_case', 'kebab_case', 'camel_case', 'pascal_case']
  },
  {
    id: 'clean',
    title: '清理优化',
    icon: 'ri-format-clear',
    modes: [
      'remove_empty_lines',
      'remove_duplicate_lines',
      'trim_spaces',
      'add_line_numbers'
    ]
  }
]
