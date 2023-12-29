<script setup>
import { Message } from '@arco-design/web-vue'
import { IconPaste, IconCopy, IconDelete } from '@arco-design/web-vue/es/icon'

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
  }
])

const inputText = ref('')
const outputText = ref('')
const inputChange = value => {
  outputText.value = value
}
const pasteText = () => {
  // 从剪贴板中粘贴到输入框
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
  result.value = value
  switch (value) {
    case 'sentence_case':
      // 将句子首字母大写转換
      result.value = inputText.value.replace(/(\b|^)[a-z]/g, function (m) {
        return m.toUpperCase()
      })
      inputChange(result.value)
      break
    case 'upper_case':
      // 全部字母转換为大写
      result.value = inputText.value.toUpperCase()
      inputChange(result.value)
      break
    case 'lower_case':
      // 全部字母转換为小写
      result.value = inputText.value.toLowerCase()
      inputChange(result.value)
      break
    default:
      break
  }
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
                  <div></div>
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
</style>
