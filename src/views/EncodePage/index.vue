<script setup>
import { Message } from '@arco-design/web-vue'
import { IconPaste, IconCopy, IconDelete } from '@arco-design/web-vue/es/icon'

const useMode = ref('encoder')
const convert = value => {
  useMode.value = value
  let result = value === 'encoder' ? '编码' : '解码'
  Message.info(`已切换为【${result}】模式`)
  console.log('convert')
  if (outputText.value !== '') {
    let text = outputText.value
    inputChange(text)
  }
}

const inputText = ref('')
const outputText = ref('')
const inputChange = value => {
  if (value === '') {
    outputText.value = ''
  } else {
    inputText.value = value
    console.log('inputChange', useMode.value, value)
    let result =
      useMode.value === 'encoder'
        ? encodeURIComponent(value)
        : decodeURIComponent(value)
    outputText.value = result
  }
}
const pasteText = () => {
  // 从剪贴板中粘贴到输入框
  navigator.clipboard.readText().then(function (text) {
    console.log(text)
    inputChange(text)
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
</script>

<template>
  <div class="encode-page">
    <div class="operationOptionsBar w-full">
      <h2 class="m-5">功能设置</h2>
      <div class="flex flex-row m-5">
        <a-card hoverable w-full>
          <a-card-meta>
            <template #description>
              <div class="flex justify-between w-full">
                <div class="functionTitle">
                  <icon-tabler:switch-horizontal
                    class="text-[var(--color-neutral-6)] mr-5px"
                  />
                  <span>转换模式</span>
                </div>
                <div>
                  <a-radio-group
                    type="button"
                    v-model="useMode"
                    @change="convert"
                  >
                    <a-radio value="encoder">编码</a-radio>
                    <a-radio value="decoder">解码</a-radio>
                  </a-radio-group>
                </div>
              </div>
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </div>
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
          @input="inputChange"
        />
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
            <a-button>
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
</template>

<style scoped>
.encode-page {
  @apply w-full px-4 py-2 box-border overflow-x-hidden;
}
.functionTitle {
  @apply text-shadow-sm font-600 text-lg flex items-center;
}

/* 可选：如果需要自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
