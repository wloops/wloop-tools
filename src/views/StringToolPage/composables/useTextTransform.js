import { textTransformers } from '../utils/transformers'

export function useTextTransform() {
  const transformText = (text, mode) => {
    const transformer = textTransformers[mode]
    return transformer ? transformer(text) : text
  }

  return {
    transformText
  }
}
