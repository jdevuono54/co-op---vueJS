<template>
    <div class="message_box">
        <div v-for="(message,id) in $parent.conversation" v-bind:key="id" class="row" :class="[ message.member_id === $store.state.user.member.id ? ['user_message','flex-row-reverse'] : 'other_user_message']" @mouseleave="hover = null" @mouseover="hover = message.id">
            <img :src="'https://api.adorable.io/avatars/40/'+message.member_id" @click="userSelected(message.member_id)"><p class="message">{{ message.message }}</p>
            <span v-if="hover === message.id">
                <font-awesome-icon @click="editMessage(message)" class="icon alt iconEdit" icon="edit" v-if="message.member_id === $store.state.user.member.id"/>
                <font-awesome-icon @click="deleteMessage(message)" class="icon alt iconDelete" icon="trash" v-if="message.member_id === $store.state.user.member.id"/>
            </span>
        </div>
        <profil_modal :member="user_select"></profil_modal>
    </div>
</template>

<script>
    import profil_modal from "../profil_modal";
    export default {
        name: "message_box",
        components:{profil_modal},
        data: function () {
            return {
                membres:null,
                user_select:" ",
                hover:null
            }
        },
        mounted() {
            this.loadMembres()
        },
        methods: {
            userSelected(id_selected){
                this.membres.forEach((membre) => {
                    if(membre.id === id_selected){
                        this.user_select = membre
                        this.$bvModal.show("modal-profil")
                }})
            },
            loadMembres(){
                this.$http.get('members').then((e) => {
                    this.membres = e.data
                }).catch((e) => {
                    this.$root.makeToast(e.response.data.message)
                })
            },
            deleteMessage(message){
                if (confirm("Êtes-vous sûr ?") === true) {
                    this.$bus.$emit('deleteMessage', message)
                }
            },
            editMessage(message){
                this.$bus.$emit('editMessage', message)
            }
        }
    }
</script>

<style scoped>

    .message_box{
        padding: 1em 2em;
        max-height: 80vh;
        height: 80vh;
        overflow-y: auto;
    }

    .message{
        font-size: 1em;
        border-radius: 20px;
        padding: 8px 15px;
        max-width: 40%;
        word-break: break-word;
    }
    .user_message > img, .other_user_message > img{
        border-radius: 50%;
        max-width: 30px;
        max-height: 30px;
        align-self: end;
    }
    .message:not(:last-of-type){
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    .user_message > p{
        background-color: #009bd8;
        color:white;
        margin-right: 0.5em;
    }
    .other_user_message > p{
        background-color: #eeeeee;
        color: black;
        margin-left: 0.5em;
    }
    .iconDelete{
        margin-right: 1em;
        vertical-align: bottom;
    }
    .iconEdit{
        margin-right: 0.5em;
        vertical-align: bottom;
    }
</style>