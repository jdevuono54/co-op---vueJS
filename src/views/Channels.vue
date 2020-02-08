<template>
    <div class="channel container-fluid">
        <Conversations></Conversations>
        <add-conversation></add-conversation>
    </div>
</template>

<script>
    import Conversations from "../components/channels/Conversations";
    import AddConversation from "../components/channels/addConversation";
    export default {
        name: "Channel",
        data: function(){
            return{
                conversations:null
            }
        },
        created() {
            this.$bus.$on('deleteConv',(conversation) => {
                this.removeConv(conversation)
            })
        },
        methods:{
          removeConv(conversation){
                this.$http.delete('channels/' + conversation.id).then(() => {
                    this.conversations.splice(this.conversations.indexOf(conversation),1)
                }).catch((e) => {
                    this.$root.makeToast(e.response.data.message)
                })
            }
        },
        components: {AddConversation, Conversations}
    }
</script>

<style scoped>

</style>