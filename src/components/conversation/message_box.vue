<template>
    <div class="message_box">
        <div v-for="(message,id) in $parent.conversation" v-bind:key="id" class="message row" :class="[ message.member_id === $store.state.user.member.id ? 'user_message' : 'other_user_message']">
            {{ message.message }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "message_box",
        data: function () {
            return {
            }
        },
        mounted() {
            this.loadMessage()
        },
        methods: {
            loadMessage() {
                this.$http.get('channels/' + this.$route.params.id + '/posts?token=' + this.$store.state.user.token).then((response) => {
                    this.$parent.conversation = response.data
                    this.$parent.conversation.reverse("created_at")
                }).catch((e) => {
                    this.makeToast(e.response.data.message)
                })

            }
        }
    }
</script>

<style scoped>
    .message_box{
        padding: 1em;
        max-height: 80vh;
        overflow-y: scroll;
    }
    .message{
        font-size: 1em;
        padding: 0.5em;
    }
    .message:not(:last-of-type){
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    .user_message{
        color:blue
    }
    .other_user_message{
        color:red;
    }
</style>