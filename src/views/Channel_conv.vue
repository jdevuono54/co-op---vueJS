<template>
    <div class="Channel_conv container-fluid">
        <div>
            <div v-for="(message,id) in conversation" v-bind:key="id">
                <div class="message" :class="[ message.member_id === $store.state.user.member.id ? 'user_message' : 'other_user_message']">
                    {{ message.message }}
                </div>
            </div>
        </div>
        <input type="text" v-model="message">
        <button type="button" @click="ajouterMessage">aaaa</button>
    </div>
</template>

<script>
    export default {
        name: "Channel_conv",
        data: function () {
            return {
                message: null,
                conversation: null
            }
        },
        mounted() {
            this.loadMessage()
        },
        methods: {
            makeToast(errorMsg) {
                this.$root.$bvToast.toast(errorMsg, {
                    title: "⚠ Erreur !",
                    variant: "danger",
                    noCloseButton: true
                })
            },
            loadMessage() {
                this.$http.get('channels/' + this.$route.params.id + '/posts?token=' + this.$store.state.user.token).then((response) => {
                    this.conversation = response.data
                    this.conversation.reverse("created_at")
                    // eslint-disable-next-line no-console
                    console.log(this.$store.state.user.member.id)
                }).catch((e) => {
                    this.makeToast(e.response.data.message)
                })

            },
            ajouterMessage() {
                this.$http.post('channels/' + this.$route.params.id + '/posts?token=' + this.$store.state.user.token, {
                    message: this.message,
                }).then((response) => {
                    this.$parent.conversations.push(response.data)
                    this.$bvModal.hide('modal-conversation')
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