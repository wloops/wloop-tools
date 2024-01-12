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
