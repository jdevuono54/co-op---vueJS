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

        <div class="col alert alert-danger" role="alert" v-show="error">
            {{ error }}
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
       description:null,
       error:null
      }
     },
        methods:{
            ajouterConversation(){
                this.$http.post('channels?token='+this.$store.state.user.token, {
                    label: this.titre,
                    topic: this.description,
                }).then((response) => {
                    this.$parent.conversations.push(response.data)
                    this.$bvModal.hide('modal-conversation')
                }).catch((e) => {
                    this.error = e.response.data.message
                })

            }
        }
    }
</script>

<style scoped>

</style>