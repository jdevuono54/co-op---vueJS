<template>
    <b-modal id="modal-conversation" :title="editConv === null ? 'Créer une conversation' : 'Modifier la conversation'" hide-footer>

        <div class="input-group mb-2">
            <div class="input-group-prepend">
                <div class="input-group-text"><font-awesome-icon icon="heading" class="icon alt"/></div>
            </div>
            <input type="text" class="form-control" v-model="title" placeholder="Saisir le titre">
        </div>

        <div class="input-group mb-2">
            <div class="input-group-prepend">
                <div class="input-group-text"><font-awesome-icon icon="bars" class="icon alt"/></div>
            </div>
            <input type="text" class="form-control" v-model="descript" placeholder="Saisir la description">
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
                <button type="button" class="btn btn-primary btn-block" :disabled="!titre || !description" @click="ajouterConversation" v-if="editConv === null">Valider</button>
                <button type="button" class="btn btn-primary btn-block" :disabled="!editConv.label || !editConv.topic" @click="modifierConversation" v-else>Modifier</button>
            </div>
        </div>
    </b-modal>
</template>

<script>
    export default {
        name: "addConversation",
        props:["editConv"],
        data:function () {
      return{
       titre:null,
       description:null,
       error:null
      }
     },
        computed: {
            title: {
                get: function() {
                    return this.editConv === null ?  this.titre :  this.editConv.label
                },
                set: function(newValue) {
                    this.titre = newValue
                }
            },
            descript: {
                get: function() {
                    return this.editConv === null ?  this.description :  this.editConv.topic
                },
                set: function(newValue) {
                    this.description = newValue
                }
            }
        },
        methods:{
            ajouterConversation(){
                this.$bus.$emit('createConv',this.titre,this.description)
            },
            modifierConversation(){
                this.$bus.$emit('editConv',this.editConv.id,this.titre,this.description)
            }
        }
    }
</script>

<style scoped>

</style>