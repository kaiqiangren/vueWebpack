<template>
    <div class="fontRed">
        Vue Webpack Test
    </div>
</template>
<style scoped lang="less">
    body{
        width:100%;
        height:100%;
        .fontRed{
            color: red;
            transform: translate(50px,50px);
        }
    }
</style>
<script>
    export default{
        name: '',
        data(){
            return {
                msg:'a message!'
            }
        },
        methods: {
            printMessage(){

            }
        },
        mounted: function () {


        }
    }

</script>