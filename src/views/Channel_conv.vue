<template>
    <div class="Channel_conv container-fluid">
        <div class="conv">
            <message_box :conversation="conversation"></message_box>
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
        beforeDestroy() {
            this.$bus.$off();
        },
        created() {
            this.$bus.$on('deleteMessage',(message) => {
                this.removeMessage(message)
            })
            this.$bus.$on('addMessage',(message) => {
                this.conversation.push(message)
            })
            this.$bus.$on('editMessage',() => {
                this.loadMessage()
            })
        },
        mounted: function() {
            this.loadMessage()
        },
        methods: {
            removeMessage(message){
                this.$http.delete('channels/' + message.channel_id + "/posts/" +message.id).then(() => {
                    this.conversation.splice(this.conversation.indexOf(message),1)
                }).catch((e) => {
                    this.$root.makeToast(e.response.data.message)
                })
            },
            loadMessage() {
                this.$http.get('channels/' + this.$route.params.id + '/posts').then((response) => {
                    this.conversation = response.data;
                    this.conversation.reverse("created_at")
                }).catch((e) => {
                    this.$root.makeToast(e.response.data.message)
                })
            },
        }
    }
</script>

<style scoped>
</style>