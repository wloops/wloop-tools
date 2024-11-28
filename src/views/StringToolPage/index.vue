<script setup>
import { Message } from '@arco-design/web-vue'
import { IconPaste, IconCopy, IconDelete } from '@arco-design/web-vue/es/icon'
import IcoTablerTextSize from '~icons/tabler/text-size'
import IconTablerList from '~icons/tabler/list'
import IconTablerCursorText from '~icons/tabler/cursor-text'
import IconTablerColumnInsertRight from '~icons/tabler/column-insert-right'
import IconTablerSelect from '~icons/tabler/select'
import IconTablerChartDots from '~icons/tabler/chart-dots'
import IconTablerSwitchHorizontal from '~icons/tabler/switch-horizontal'

const modeList = ref([
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
    label: '单词首字母大写转換 (TitIe Case)',
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
  }
])

const inputText = ref('')
const outputText = ref('')
const inputChange = value => {
  // 判断是否有<br>
  outputText.value = value
  if (value.indexOf(',') !== -1) {
    outputText.value = value.replace(/,/g, '\n')
  }
  updateTextStats()
}
const pasteText = () => {
  // 从剪贴板中粘贴到入框
  navigator.clipboard.readText().then(function (text) {
    console.log(text)
  })
}
const copyText = () => {
  // 复制到剪贴板
  let text = outputText.value
  console.log('copyText', text)
  if (text !== '') {
    // let input = document.createElement('input')
    // input.value = text
    // document.body.appendChild(input)
    // input.select()
    // document.execCommand('Copy')
    // input.remove()
    navigator.clipboard.writeText(text)
    Message.success('复制成功')
  }
}
const deleteText = () => {
  inputText.value = ''
  outputText.value = ''
}

const result = ref('')
const convert = value => {
  console.log('原始输入字符串:', inputText.value)
  const thenInputText = inputText.value.replace(/\n/g, ',')
  switch (value) {
    case 'sentence_case':
      // 将句子首字母大写转換
      result.value = thenInputText.replace(/(\b|^)[a-z]/g, function (m) {
        return m.toUpperCase()
      })
      inputChange(result.value)
      break
    case 'upper_case':
      // 全部字母转換为大写
      result.value = thenInputText.toUpperCase()
      inputChange(result.value)
      break
    case 'lower_case':
      // 全部字母转換为小写
      result.value = thenInputText.toLowerCase()
      inputChange(result.value)
      break
    case 'title_case':
      // 每个单词首字母大写转換
      result.value = thenInputText.replace(/(?:^|\b)(\w)/g, c =>
        c.toUpperCase()
      )
      inputChange(result.value)
      break
    case 'snake_case':
      // 蛇形命名法转換 空格/短横线/驼峰转换为下划线分割
      result.value = thenInputText
        .replace(/\s+/g, '_')
        .replace(/\-/g, '_')
        .replace(/\B([A-Z])/g, '_$1')
        .toLowerCase()

      inputChange(result.value)
      break
    case 'kebab_case':
      // 短横线命名法转換 空格/下划线/驼峰转换为短横线分割
      result.value = thenInputText
        .replace(/\s+/g, '-')
        .replace(/\_/g, '-')
        .replace(/\B([A-Z])/g, '-$1')
        .toLowerCase()

      inputChange(result.value)
      break
    case 'camel_case':
      // 驼峰转換 除了第一个单词,其余单词首字母大写
      result.value = thenInputText.replace(/[-_\s]+(.)?/g, function (match, c) {
        return c ? c.toUpperCase() : ''
      })
      inputChange(result.value)
      break
    case 'pascal_case':
      // 帕斯卡命名法转換
      result.value = thenInputText
        .replace(/[-_\s]+(.)?/g, function (match, c) {
          return c ? c.toUpperCase() : ''
        })
        .replace(/^[a-z]/, function (match) {
          return match.toUpperCase()
        })
      inputChange(result.value)
      break

    default:
      break
  }

  console.log('输出字符串:', result.value)
}

// 输入字符串中的换行符处理

// 添加新的响应式变量
const textStats = ref({
  length: 0,
  lines: 0,
  cursorPosition: { row: 1, col: 1 },
  selection: 0,
  selectionRange: { start: 0, end: 0 }
})

// 添加文本统计更新函数
const updateTextStats = () => {
  const text = inputText.value
  textStats.value.length = text.length
  textStats.value.lines = text ? text.split('\n').length : 0
}

// 修改光标位置和选择处理函数
const handleTextareaSelect = event => {
  const target = event.target
  const text = target.value
  const cursorPos = target.selectionStart

  // 计算当前行号
  const textBeforeCursor = text.substring(0, cursorPos)
  const row = textBeforeCursor.split('\n').length

  // 计算当前列号
  const lastNewLine = textBeforeCursor.lastIndexOf('\n')
  const col = lastNewLine === -1 ? cursorPos + 1 : cursorPos - lastNewLine

  textStats.value.cursorPosition = { row, col }

  // 更新选择信息
  const selectionStart = target.selectionStart
  const selectionEnd = target.selectionEnd
  textStats.value.selection = Math.abs(selectionEnd - selectionStart)

  if (textStats.value.selection > 0) {
    // 计算选择范围的行号
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

// 添加监听光标移动事件
const handleCursorMove = event => {
  handleTextareaSelect(event)
}
</script>

<template>
  <div class="operationOptionsBar w-full">
    <div class="flex justify-between">
      <div w-full>
        <div class="w-full m-5">
          <div class="w-full flex justify-between items-center">
            <h2 class="m-5">输入文本</h2>
            <div class="buttons mr-5">
              <a-space>
                <a-button @click="pasteText">
                  <template #icon>
                    <icon-paste />
                  </template>
                  <template #default>粘贴</template>
                </a-button>
                <a-button @click="deleteText">
                  <template #icon>
                    <icon-delete />
                  </template>
                  <!-- Use the default slot to avoid extra spaces -->
                  <template #default>清空</template>
                </a-button>
              </a-space>
            </div>
          </div>
          <div class="pl-5 pr-5">
            <a-textarea
              v-model="inputText"
              placeholder=""
              allow-clear
              :auto-size="{
                minRows: 8,
                maxRows: 8
              }"
              @select="handleTextareaSelect"
              @click="handleCursorMove"
              @keyup="handleCursorMove"
              @input="inputChange"
            />
            <div class="text-stats-bar">
              <span class="stat-item">
                <icon-tabler-text-size class="stat-icon" />
                长度: {{ textStats.length }}
              </span>
              <span class="stat-item">
                <icon-tabler-list class="stat-icon" />
                行数: {{ textStats.lines }}
              </span>
              <span class="stat-item">
                <icon-tabler-cursor-text class="stat-icon" />
                行: {{ textStats.cursorPosition.row }}
              </span>
              <span class="stat-item">
                <icon-tabler-column-insert-right class="stat-icon" />
                列: {{ textStats.cursorPosition.col }}
              </span>
              <span
                class="stat-item"
                :class="{ 'stat-highlight': textStats.selection > 0 }"
              >
                <icon-tabler-select class="stat-icon" />
                已选择: {{ textStats.selection }}
                <template v-if="textStats.selection > 0">
                  |
                  {{
                    textStats.selectionRange.end -
                    textStats.selectionRange.start +
                    1
                  }}行
                </template>
              </span>
            </div>
          </div>
        </div>
        <div class="w-full m-5">
          <div class="w-full flex justify-between items-center">
            <h2 class="m-5">输出结果</h2>
            <div class="buttons mr-5">
              <a-space>
                <a-button @click="copyText">
                  <template #icon>
                    <icon-copy />
                  </template>
                  <template #default>复制</template>
                </a-button>
                <a-button @click="deleteText">
                  <template #icon>
                    <icon-delete />
                  </template>
                  <!-- Use the default slot to avoid extra spaces -->
                  <template #default>清空</template>
                </a-button>
              </a-space>
            </div>
          </div>
          <div class="pl-5 pr-5">
            <a-textarea
              v-model="outputText"
              placeholder=""
              allow-clear
              :auto-size="{
                minRows: 8,
                maxRows: 8
              }"
            />
          </div>
        </div>
      </div>
      <div class="w-full">
        <h2 class="m-5">实用功能</h2>
        <div class="flex flex-col m-5 gap-4">
          <a-card hoverable>
            <a-card-meta>
              <template #description>
                <div class="flex justify-between w-full">
                  <div class="functionTitle">
                    <icon-tabler-switch-horizontal
                      class="text-[var(--color-neutral-6)] mr-5px"
                    />
                    <span>转换模式</span>
                  </div>
                </div>
              </template>
            </a-card-meta>
            <div mt-8 flex>
              <a-space wrap>
                <div v-for="item in modeList">
                  <a-button type="dashed" @click="convert(item.value)">{{
                    item.label
                  }}</a-button>
                </div>
              </a-space>
            </div>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.functionTitle {
  @apply text-shadow-sm font-600 text-lg flex items-center;
}
.text-stats-bar {
  @apply flex items-center gap-3 mt-2;
}

.stat-item {
  @apply flex items-center text-sm;
  color: var(--color-neutral-6);
}

.stat-highlight {
  color: var(--color-primary-6);
  font-weight: 600;
  background-color: var(--color-primary-light-1);
  padding: 0px 8px;
  border-radius: 4px;
  /* 添加过渡效果 */
  transition: all 0.2s ease;
}

.stat-highlight .stat-icon {
  color: var(--color-primary-6);
}

.stat-icon {
  @apply mr-1 text-current;
}
</style>
