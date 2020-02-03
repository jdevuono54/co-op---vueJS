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
                <button type="button" class="btn btn-primary" @click="loadOldMessages">Voir les 10 derniers messages</button>
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
                AllMessages: []
            }
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
            loadOldMessages(){
                this.AllMessages = []
                this.loadChannels()
            },
            loadChannels(){
                this.$http.get('channels?token=' + this.$store.state.user.token).then((e) => {
                    e.data.forEach( (channel) => {
                        this.loadAllMessageChannel(channel.id)
                    })
                    this.sortUserMessage(this.AllMessages)
                }).catch((e) => {
                    this.error = e.response.data.message
                    alert(this.error);
                })
            },
            loadAllMessageChannel(idChannel) {
                this.$http.get('channels/' + idChannel + '/posts?token=' + this.$store.state.user.token).then((response) => {
                    this.AllMessages.push(response.data)
                }).catch((e) => {
                    this.$root.makeToast(e.response.data.message)
                })

            },
            sortUserMessage(AllMessages){
                // eslint-disable-next-line no-console
                console.log(AllMessages)
                AllMessages.forEach((conv) => {
                    conv.forEach((message) => {
                        if(message.member_id === this.member.id){
                            // eslint-disable-next-line no-console
                            console.log("ok")
                        }
                    })
                })
            },
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