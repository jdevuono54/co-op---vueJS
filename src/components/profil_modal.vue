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
                <b-button variant="primary" @click="loadOldMessagesUser" :disabled="showSpinner">
                    Voir les 10 derniers messages
                    <b-spinner small v-show="showSpinner"></b-spinner>
                </b-button>
            </div>
        </div>

        <div class="row">
            <div class="col-sm">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Conversation</th>
                        <th scope="col">Message</th>
                        <th scope="col">Date d'envoi</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(message,id) in this.sortedUserMessages.slice(0,9)" v-bind:key="id">

                        <td @click="changConv(message.channel_id)">{{ message.channel }}</td>
                        <td>{{ message.message }}</td>
                        <td>{{ message.created_at }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </b-modal>
</template>

<script>
    export default {
        name: "profil_modal",
        props:["member","conversations"],
        data: function () {
            return {
                allMessagesUser: [],
                showSpinner:false,
                channels:[]
            }
        },
        computed:{
            sortedUserMessages(){
                this.setChannelName(this.allMessagesUser)
                return this._.orderBy(this.allMessagesUser, 'created_at',"desc")
            }
        },
        methods:{
            changConv(channel_id){
                this.$router.push({ name: 'channel_conv', params: { id: channel_id } })
                this.$router.go()
            },
            setChannelName(messages){
                let result = [];
                messages.forEach((message) => {
                    this.channels.forEach((channel) => {
                        if(channel.id === message.channel_id){
                            message.channel = channel.label
                        }
                    })
                    result.push(message)
                })
                return result
            },
            deleteMember(){
                this.$bvModal.hide('modal-profil')

                this.$http.delete('members/'+this.$props.member.id).then(() => {
                    this.$parent.membres.splice(this.$parent.membres.indexOf(this.$props.member),1)
                }).catch((e) => {
                    this.$root.makeToast(e.response.data.message)
                })
            },
            loadOldMessagesUser(){
                this.showSpinner = true;
                this.allMessagesUser = []

                this.$http.get('channels').then(response => {
                    this.channels = response.data;
                    this.channels.forEach(channel => {
                        this.$http.get('channels/'+channel.id+'/posts').then(response => {
                            let messages = response.data;
                            messages.forEach(message => {
                                if(message.member_id === this.member.id) {
                                    this.allMessagesUser.push(message);
                                }
                            })
                        });
                    })
                    this.showSpinner = false;
                }).catch((e) => {
                        this.$root.makeToast(e.response.data.message)
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
    table{
        table-layout: fixed;
    }
    td{
        overflow: hidden;
        font-size: 0.8em;
        padding: 0.1em;
    }
</style>