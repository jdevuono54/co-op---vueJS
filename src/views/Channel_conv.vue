<template>
    <div class="Channel_conv container-fluid">
        <message_box></message_box>
        <message_send></message_send>
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
        methods: {
            makeToast(errorMsg) {
                this.$root.$bvToast.toast(errorMsg, {
                    title: "⚠ Erreur !",
                    variant: "danger",
                    noCloseButton: true
                })
            }
        }
    }
</script>

<style scoped>
</style>