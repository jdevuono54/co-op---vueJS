<template>
    <div class="message_box">
        <div v-for="(message,id) in $parent.conversation" v-bind:key="id" class="row" :class="[ message.member_id === $store.state.user.member.id ? ['user_message','flex-row-reverse'] : 'other_user_message']">
            <p class="message">{{ message.message }}</p>
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
        padding: 1em 2em;
        max-height: 80vh;
        overflow-y: scroll;
    }
    .message{
        font-size: 1em;
        border-radius: 20px;
        padding: 8px 15px;
        max-width: 40%;
        word-break: break-word;
    }
    .message:not(:last-of-type){
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    .user_message > p{
        background-color: #009bd8;
        color:white;
    }
    .other_user_message > p{
        background-color: #eeeeee;
        color: black;
    }
</style>