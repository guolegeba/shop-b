<template>
<div>
    <el-button type="primary" @click="getContent">获取内容</el-button>
    <el-button type="success" @click="setContent">设置内容</el-button>
    <el-divider />
    <vueWangeditor ref="editor" id="editor" v-model="text" width="100%" />
</div>
    

</template>

<script>
import vueWangeditor from 'vue-wangeditor';
export default {
    components: {
        vueWangeditor
    },
    data() {
        return {
            text : '<h1><font color="#008080" size="6">富文本编辑器</font></h1>'
        }
    },
    methods:{
        getContent(){
            const content=this.$refs.editor.getHtml();
            console.log(content);
        },
        setContent(){
            const content=`<h1><font size="4" color="#808000">请输入内容</font></h1>`
            this.$refs.editor.setHtml(content);
        }
    }
}
</script>

<style>

</style>