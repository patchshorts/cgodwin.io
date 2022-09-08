export const categoryMap = {"category":{"/":{"path":"/category/","map":{"Google Cloud":{"path":"/category/google-cloud/","keys":["v-ad7fe8b0"]},"Technology":{"path":"/category/technology/","keys":["v-ad7fe8b0","v-b51a03fc"]},"Management":{"path":"/category/management/","keys":["v-eec7c5b0"]}}}},"tag":{"/":{"path":"/tag/","map":{"study guide":{"path":"/tag/study-guide/","keys":["v-ad7fe8b0"]},"google cloud":{"path":"/tag/google-cloud/","keys":["v-ad7fe8b0"]},"gcp":{"path":"/tag/gcp/","keys":["v-ad7fe8b0"]},"GCCPCA":{"path":"/tag/gccpca/","keys":["v-ad7fe8b0"]},"software development":{"path":"/tag/software-development/","keys":["v-b51a03fc","v-eec7c5b0"]},"jam-stack":{"path":"/tag/jam-stack/","keys":["v-b51a03fc"]},"devsecops engineering":{"path":"/tag/devsecops-engineering/","keys":["v-eec7c5b0"]}}}}}

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
