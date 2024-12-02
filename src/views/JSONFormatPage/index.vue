<template>
  <div class="page-container">
    <div class="json-format-container">
      <div class="control-panel">
        <div class="control-group">
          <div class="control-row">
            <a-button-group>
              <a-button type="primary" @click="formatJSON">
                <template #icon>
                  <icon-code />
                </template>
                格式化
              </a-button>
              <a-button @click="compressJSON">
                <template #icon>
                  <icon-minus-circle />
                </template>
                压缩
              </a-button>
            </a-button-group>

            <div class="indent-controls">
              <span class="control-label">缩进空格:</span>
              <a-input-number
                v-model="indentSize"
                :min="1"
                :max="8"
                size="small"
                style="width: 60px"
              />
            </div>

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
              <span class="panel-title">输入 JSON</span>
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
              v-model="inputJson"
              :auto-size="{
                minRows: 25,
                maxRows: 25
              }"
              placeholder="请输入需要格式化的 JSON 字符串"
            />
          </div>
        </div>

        <div class="panel">
          <div class="panel-header">
            <div class="panel-title-group">
              <span class="panel-title">格式化结果</span>
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
              v-model="outputJson"
              :auto-size="{
                minRows: 25,
                maxRows: 25
              }"
              :readonly="true"
              placeholder="格式化后的 JSON 将显示在这里"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import {
  IconCode,
  IconCopy,
  IconDelete,
  IconMinusCircle
} from '@arco-design/web-vue/es/icon'

const inputJson = ref('')
const outputJson = ref('')
const indentSize = ref(2)

const formatJSON = () => {
  try {
    if (!inputJson.value.trim()) {
      Message.warning('请输入需要格式化的 JSON 字符串')
      return
    }

    const parsedJson = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsedJson, null, indentSize.value)
    Message.success('格式化成功')
  } catch (error) {
    Message.error('无效的 JSON 字符串')
  }
}

const compressJSON = () => {
  try {
    if (!inputJson.value.trim()) {
      Message.warning('请输入需要格式化的 JSON 字符串')
      return
    }

    const parsedJson = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsedJson)
    Message.success('压缩成功')
  } catch (error) {
    Message.error('无效的 JSON 字符串')
  }
}

const copyResult = async () => {
  if (!outputJson.value) {
    Message.warning('没有可复制的内容')
    return
  }

  try {
    await navigator.clipboard.writeText(outputJson.value)
    Message.success('复制成功')
  } catch (error) {
    Message.error('复制失败')
  }
}

const clearAll = () => {
  inputJson.value = ''
  outputJson.value = ''
}
</script>

<style scoped>
.page-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.json-format-container {
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

.indent-controls {
  display: flex;
  align-items: center;
  gap: 8px;
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

.control-label {
  color: var(--color-text-2);
  font-size: 13px;
}

:deep(.arco-textarea) {
  font-family: monospace;
}
</style>
