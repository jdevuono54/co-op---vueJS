<template>
    <b-modal id="modal-profil" title="" hide-footer  v-if="member">
        <div class="row">
            <div class="col-sm">
                <img :src="'https://api.adorable.io/avatars/150/'+member.id">
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                {{ member.fullname }}
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                {{ member.email }}
            </div>
        </div>
        <div class="row" v-if="this.$store.state.user.member.id != member.id">
            <div class="col-sm">
                <button type="button" class="btn btn-danger" @click="deleteMember">Supprimer l'utilisateur</button>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <b-button variant="primary" @click="loadOldMessagesUser">
                    Voir les 10 derniers messages
                    <b-spinner small v-show="showSpinner"></b-spinner>
                </b-button>
            </div>
        </div>

        <ul>
            <li v-for="(message,id) in sortedUserMessages" v-bind:key="id">
                {{ message.message }} {{ message.created_at }}
            </li>
        </ul>
    </b-modal>
</template>

<script>
    export default {
        name: "profil_modal",
        props:["member","conversations"],
        data: function () {
            return {
                allMessagesUser: [],
                showSpinner:false
            }
        },
        computed:{
            sortedUserMessages(){
                let messages = this.allMessagesUser;

                if(messages.length) {
                    messages.sort((a, b) => {
                        new Date(b.created_at).toLocaleDateString() > new Date(a.created_at).toLocaleDateString();
                    });

                    if (messages.length > 10) {
                        messages.length = 10;
                    }
                }

                return messages;
            },
        },
        methods:{
            deleteMember(){
                this.$bvModal.hide('modal-profil')

                this.$http.delete('members/'+this.$props.member.id+'?token=' + this.$store.state.user.token).then(() => {
                    this.$parent.membres.splice(this.$parent.membres.indexOf(this.$props.member),1)
                }).catch((e) => {
                    this.$root.makeToast(e.response.data.message)
                })
            },
            loadOldMessagesUser(){
                this.showSpinner = true;
                this.allMessagesUser = []

                this.$http.get('channels?token=' + this.$store.state.user.token).then(response => {
                    let channels = response.data;
                    channels.forEach(channel => {
                        this.$http.get('channels/'+channel.id+'/posts?token=' + this.$store.state.user.token).then(response => {
                            let messages = response.data;
                            messages.forEach(message => {
                                if(message.member_id === this.member.id) {
                                    this.allMessagesUser.push(message);
                                }
                            })
                        });
                    })
                    this.showSpinner = false;
                });
            }
        }
    }
</script>

<style scoped>
    img{
        border-radius: 50%;
    }
    .row{
        text-align: center;
        margin-top: 1em;
    }
</style>