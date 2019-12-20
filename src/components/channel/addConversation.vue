<template>
    <b-modal id="modal-conversation" title="Créer une conversation" hide-footer>

        <div class="input-group mb-2">
            <div class="input-group-prepend">
                <div class="input-group-text">🔑</div>
            </div>
            <input type="text" class="form-control" v-model="titre" placeholder="Saisir le titre">
        </div>

        <div class="input-group mb-2">
            <div class="input-group-prepend">
                <div class="input-group-text">🔑</div>
            </div>
            <input type="text" class="form-control" v-model="description" placeholder="Saisir la description">
        </div>

        <hr/>

        <div class="row">
            <div class="col-sm-6">
                <button type="button" class="btn btn-secondary btn-block">Annuler</button>
            </div>
            <div class="col-sm-6">
                <button type="button" class="btn btn-primary btn-block">Valider</button>
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
     }
    }
</script>

<style scoped>

</style>