<template>
    <div class="sending_box">
        <input type="text" v-model="message">
        <button type="button" @click="ajouterMessage">aaaa</button>
    </div>
</template>

<script>
    export default {
        name: "message_send",
        data: function () {
            return {
                message: null,
            }
        },
        methods: {
            ajouterMessage() {
                this.$http.post('channels/' + this.$route.params.id + '/posts?token=' + this.$store.state.user.token, {
                    message: this.message,
                }).then((response) => {
                    this.$parent.conversations.push(response.data)
                    this.$bvModal.hide('modal-conversation')
                }).catch((e) => {
                    this.$parent.makeToast(e.response.data.message)
                })

            }
        }
    }
</script>

<style scoped>

</style>