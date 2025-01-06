<template>
  <div class="page-container">
    <div class="text-escape-container">
      <div class="control-panel">
        <div class="control-group">
          <div class="control-row">
            <a-button-group>
              <a-button type="primary" @click="escapeText">
                <template #icon>
                  <icon-code />
                </template>
                转义
              </a-button>
              <a-button @click="unescapeText">
                <template #icon>
                  <icon-code />
                </template>
                反转义
              </a-button>
            </a-button-group>

            <a-button type="outline" @click="copyResult">
              <template #icon>
                <icon-copy />
              </template>
              复制结果
            </a-button>
          </div>
        </div>
      </div>

      <div class="input-output-wrapper">
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title-group">
              <span class="panel-title">输入文本</span>
            </div>
            <div class="panel-actions">
              <a-button size="small" @click="clearAll">
                <template #icon>
                  <icon-delete />
                </template>
                清空
              </a-button>
            </div>
          </div>
          <div class="panel-content">
            <a-textarea
              v-model="inputText"
              :auto-size="{
                minRows: 25,
                maxRows: 25
              }"
              placeholder="请输入需要转义的文本"
            />
          </div>
        </div>

        <div class="panel">
          <div class="panel-header">
            <div class="panel-title-group">
              <span class="panel-title">转义结果</span>
            </div>
            <div class="panel-actions">
              <a-button size="small" @click="copyResult">
                <template #icon>
                  <icon-copy />
                </template>
                复制
              </a-button>
            </div>
          </div>
          <div class="panel-content">
            <a-textarea
              v-model="outputText"
              :auto-size="{
                minRows: 25,
                maxRows: 25
              }"
              :readonly="true"
              placeholder="转义后的文本将显示在这里"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Message } from '@arco-design/web-vue'
import { IconCode, IconCopy, IconDelete } from '@arco-design/web-vue/es/icon'

const inputText = ref('')
const outputText = ref('')

// 监听输入变化，自动转义
watch(inputText, newValue => {
  if (!newValue.trim()) {
    outputText.value = ''
    return
  }
  outputText.value = newValue
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\f/g, '\\f')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
})

const escapeText = () => {
  if (!inputText.value.trim()) {
    Message.warning('请输入需要转义的文本')
    return
  }
  outputText.value = inputText.value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\f/g, '\\f')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
  Message.success('转义成功')
}

const unescapeText = () => {
  if (!inputText.value.trim()) {
    Message.warning('请输入需要反转义的文本')
    return
  }
  outputText.value = inputText.value
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\f/g, '\f')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, '\\')
  Message.success('反转义成功')
}

const copyResult = async () => {
  if (!outputText.value) {
    Message.warning('没有可复制的内容')
    return
  }

  try {
    await navigator.clipboard.writeText(outputText.value)
    Message.success('复制成功')
  } catch (error) {
    Message.error('复制失败')
  }
}

const clearAll = () => {
  inputText.value = ''
  outputText.value = ''
}
</script>

<style scoped>
.page-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.text-escape-container {
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.control-panel {
  background-color: var(--color-bg-2);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 16px;
  flex-shrink: 0;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: center;
}

.input-output-wrapper {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  height: 0;
}

.panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-bg-2);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg-1);
  flex-shrink: 0;
}

.panel-title-group {
  display: flex;
  align-items: center;
}

.panel-title {
  font-weight: 500;
  color: var(--color-text-1);
}

.panel-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel-content {
  flex: 1;
  padding: 12px;
  position: relative;
  display: flex;
  overflow: hidden;
}

.panel-content :deep(.arco-textarea-wrapper) {
  flex: 1;
}

.panel-content :deep(.arco-textarea) {
  height: 100%;
}

:deep(.arco-textarea) {
  font-family: monospace;
}
</style>
