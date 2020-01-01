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
        methods: {

        }
    }
</script>

<style scoped>
</style>