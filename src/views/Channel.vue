<template>
    <div class="channel container-fluid">
        <Conversations></Conversations>
        <add-conversation></add-conversation>
    </div>
</template>

<script>
    import Conversations from "../components/channel/Conversations";
    import AddConversation from "../components/channel/addConversation";
    export default {
        name: "Channel",
        components: {AddConversation, Conversations}
    }
</script>

<style scoped>

</style>