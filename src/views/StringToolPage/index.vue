<script setup>
import { Message } from '@arco-design/web-vue'
import { IconPaste, IconCopy, IconDelete } from '@arco-design/web-vue/es/icon'
import { useTextStats } from './composables/useTextStats'
import { useTextTransform } from './composables/useTextTransform'
import { useClipboard } from './composables/useClipboard'
import { textModes } from './constants'
import { icons } from './icons'

// 文本状态管理
const inputText = ref('')
const outputText = ref('')

// 组合式函数
const { textStats, updateTextStats, handleTextareaSelect, handleCursorMove } =
  useTextStats()
const { transformText } = useTextTransform()
const { copyToClipboard, pasteFromClipboard } = useClipboard()

// 文本变更处理
const handleInputChange = value => {
  outputText.value = value
  if (value.includes(',')) {
    outputText.value = value.replace(/,/g, '\n')
  }
  updateTextStats(value)
}

// 文本转换处理
const handleConvert = mode => {
  const result = transformText(inputText.value, mode)
  outputText.value = result
  updateTextStats(result)
}

// 剪贴板操作
const handlePaste = async () => {
  const text = await pasteFromClipboard()
  if (text) {
    inputText.value = text
    updateTextStats(text)
  }
}

const handleCopy = async () => {
  if (outputText.value) {
    await copyToClipboard(outputText.value)
    Message.success('复制成功')
  }
}

// 清空操作
const handleClear = () => {
  inputText.value = ''
  outputText.value = ''
  updateTextStats('')
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
                <a-button @click="handlePaste">
                  <template #icon>
                    <icon-paste />
                  </template>
                  <template #default>粘贴</template>
                </a-button>
                <a-button @click="handleClear">
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
              @input="handleInputChange"
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
                <a-button @click="handleCopy">
                  <template #icon>
                    <icon-copy />
                  </template>
                  <template #default>复制</template>
                </a-button>
                <a-button @click="handleClear">
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
                <div v-for="item in textModes">
                  <a-button type="dashed" @click="handleConvert(item.value)">{{
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
