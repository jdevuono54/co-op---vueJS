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
    </b-modal>
</template>

<script>
    export default {
        name: "profil_modal",
        props:["member"],
        methods:{
            deleteMember(){
                this.$bvModal.hide('modal-profil')

                this.$http.delete('members/'+this.$props.member.id+'?token=' + this.$store.state.user.token).then(() => {
                    this.$parent.membres.splice(this.$parent.membres.indexOf(this.$props.member),1)
                }).catch((e) => {
                    this.$root.makeToast(e.response.data.message)
                })
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