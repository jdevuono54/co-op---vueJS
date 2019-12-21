<template>
    <b-modal id="modal-conversation" title="Créer une conversation" hide-footer>

        <div class="input-group mb-2">
            <div class="input-group-prepend">
                <div class="input-group-text"><font-awesome-icon icon="heading" class="icon alt"/></div>
            </div>
            <input type="text" class="form-control" v-model="titre" placeholder="Saisir le titre">
        </div>

        <div class="input-group mb-2">
            <div class="input-group-prepend">
                <div class="input-group-text"><font-awesome-icon icon="bars" class="icon alt"/></div>
            </div>
            <input type="text" class="form-control" v-model="description" placeholder="Saisir la description">
        </div>

        <hr/>

        <div class="row">
            <div class="col-sm-6">
                <button type="button" class="btn btn-secondary btn-block" @click="$bvModal.hide('modal-conversation')">Annuler</button>
            </div>
            <div class="col-sm-6">
                <button type="button" class="btn btn-primary btn-block" :disabled="!titre || !description" @click="ajouterConversation">Valider</button>
            </div>
        </div>
    </b-modal>
</template>

<script>
    export default {
        name: "addConversation",
     data:function () {
      return{
       titre:null,
       description:null
      }
     },
        methods:{
            ajouterConversation(){
                this.$http.post('channels', {
                    label: this.titre,
                    topic: this.description,
                    session_token: this.$store.state.user.token
                }).then((e) => {
                    // eslint-disable-next-line no-console
                    console.log(e.response)
                }).catch((e) => {
                    // eslint-disable-next-line no-console
                    console.log(e.response)
                })

            }
        }
    }
</script>

<style scoped>

</style>