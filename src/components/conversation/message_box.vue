<template>
    <div class="message_box">
        <div v-for="(message,id) in $parent.conversation" v-bind:key="id">
            <div class="message" :class="[ message.member_id === $store.state.user.member.id ? 'user_message' : 'other_user_message']">
                {{ message.message }}
            </div>
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
    .message{
        background: yellow;
    }
    .user_message{
        color:blue
    }
    .other_user_message{
        color:red;
    }
</style>