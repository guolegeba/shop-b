<template>
  <vueWangeditor id="editor" v-model="text" width="100%"/>
</template>

<script>
import vueWangeditor from 'vue-wangeditor';
export default {
    components: {
        vueWangeditor
    },
    data() {
        return {
            text : '<h1>富文本编辑器</h1>'
        }
    }
}
</script>

<style>

</style>