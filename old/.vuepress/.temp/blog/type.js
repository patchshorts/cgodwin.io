export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-0e586f10","v-b51a03fc","v-eec7c5b0"]}},"encrypted":{"/":{"path":"/encrypted/","keys":[]}},"slide":{"/":{"path":"/slide/","keys":[]}},"star":{"/":{"path":"/star/","keys":[]}},"timeline":{"/":{"path":"/timeline/","keys":["v-0e586f10","v-b51a03fc","v-eec7c5b0"]}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  })
}
