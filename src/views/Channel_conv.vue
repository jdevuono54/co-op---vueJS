<template>
    <div class="Channel_conv container-fluid">
        <div class="conv">
            <message_box></message_box>
            <message_send></message_send>
        </div>
    </div>
</template>

<script>
    import message_box from "../components/conversation/message_box";
    import message_send from "../components/conversation/message_send";
    export default {
        name: "Channel_conv",
        components: {message_send, message_box},
        data: function () {
            return {
                conversation: null
            }
        },
        created() {
            this.$bus.$on('deleteMessage',(message) => {
                this.removeMessage(message)
            })
            this.$bus.$on('loadMessage',(message) => {
                this.conversation = message;
                this.conversation.reverse("created_at")
            })
        },
        methods: {
            removeMessage(message){
                this.$http.delete('channels/' + message.channel_id + "/posts/" +message.id).then(() => {
                    this.conversation.splice(this.conversation.indexOf(message),1)
                }).catch((e) => {
                    this.$root.makeToast(e.response.data.message)
                })
            },
        }
    }
</script>

<style scoped>
</style>