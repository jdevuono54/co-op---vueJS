<template>
    <div class="channel container-fluid">
        <Conversations :conversations="conversations"></Conversations>
        <add-conversation :editConv="editConv"></add-conversation>
    </div>
</template>

<script>
    import Conversations from "../components/channels/Conversations";
    import AddConversation from "../components/channels/modalConversations";
    export default {
        name: "Channel",
        data: function(){
            return{
                conversations:null,
                editConv:null
            }
        },
        mounted() {
            this.getConversations()
            this.$bus.$on('deleteConv',(conversation) => {
                this.removeConv(conversation)
            })
            this.$bus.$on('showEditConvModal',(editConv) => {
                this.editConv = editConv
                this.$bvModal.show("modal-conversation");
            })
            this.$bus.$on('showAddConvModal',() => {
                this.editConv = null
                this.$bvModal.show("modal-conversation");
            })
            this.$bus.$on('createConv',(titre,description) => {
                this.addConv(titre,description)
            })
            this.$bus.$on('editConv',(id,titre,description) => {
                this.modifierConv(id,titre,description)
            })
        },
        beforeDestroy() {
            this.$bus.$off("deleteConv");
        },
        methods:{
            getConversations(){
                this.$http.get('channels').then((e) => {
                    this.conversations = this._.orderBy(e.data,"created_at",'asc')
                }).catch((e) => {
                    this.error = e.response.data.message
                    alert(this.error);
                })
            },
          removeConv(conversation){
                this.$http.delete('channels/' + conversation.id).then(() => {
                    this.conversations.splice(this.conversations.indexOf(conversation),1)
                }).catch((e) => {
                    this.$root.makeToast(e.response.data.message)
                })
            },
            addConv(titre,description){
                this.$http.post('channels', {
                    label: titre,
                    topic: description,
                }).then((response) => {
                    this.conversations.push(response.data)
                    this.$bvModal.hide('modal-conversation')
                }).catch((e) => {
                    this.$root.makeToast(e.response.data.message)
                })
            },
            modifierConv(id,titre,description){
                this.$http.put('channels/'+id, {
                    label: titre,
                    topic: description,
                }).then((response) => {
                    let ancienneConv = this._.find(this.conversations, ['id', id]);
                    this.conversations[this.conversations.indexOf(ancienneConv)] = response.data
                    this.$bvModal.hide('modal-conversation')
                }).catch((e) => {
                    this.$root.makeToast(e.response.data.message)
                })
            }
        },
        components: {AddConversation, Conversations}
    }
</script>

<style scoped>

</style>