export const categoryMap = {"category":{"/":{"path":"/category/","map":{"Management":{"path":"/category/management/","keys":["v-eec7c5b0"]}}}},"tag":{"/":{"path":"/tag/","map":{"software development":{"path":"/tag/software-development/","keys":["v-eec7c5b0"]},"devsecops engineering":{"path":"/tag/devsecops-engineering/","keys":["v-eec7c5b0"]}}}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogCategory) {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ categoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  })
}
