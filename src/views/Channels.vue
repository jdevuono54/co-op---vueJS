<template>
    <div class="channel container-fluid">
        <Conversations></Conversations>
        <add-conversation></add-conversation>
    </div>
</template>

<script>
    import Conversations from "../components/channels/Conversations";
    import AddConversation from "../components/channels/addConversation";
    export default {
        name: "Channel",
        data: function(){
            return{
                conversations:null
            }
        },
        components: {AddConversation, Conversations}
    }
</script>

<style scoped>

</style>