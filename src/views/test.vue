<template>
    <vue-live2d :modelPath="modelPath"></vue-live2d>
</template>
<script>
export default {
  name: 'test',
  data() {
    return {
      modelPath: [
        {
          order: 1,
          path: "/static/live2d/live2d-widget-model-z16/assets/z16.model.json",
        }
      ]
    }
  }
}
</script>