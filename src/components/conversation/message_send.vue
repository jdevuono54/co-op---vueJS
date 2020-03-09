<template>
    <div class="sending_box row">
        <div class="col-sm-12 col-md-10">
            <input type="text" v-model="message" class="form-control" autofocus v-on:keyup.enter="ajouterMessage">
        </div>
        <div class="col-sm-12 col-md-2">
            <button type="button" @click="send" class="btn btn-primary btn-block" :disabled="!message">Envoyer</button>
            <button type="button" @click="annulerEdit" class="btn btn-danger btn-block" v-if="edit != null">Annuler</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "message_send",
        data: function () {
            return {
                message: null,
                edit: null
            }
        },
        beforeDestroy() {
            this.$bus.$off();
        },
        created() {
            this.$bus.$on('editMessage',(message) => {
                if(message){
                    this.message = message.message
                    this.edit = message
                }
            })
        },
        methods: {
            annulerEdit(){
                this.edit = null
                this.message = null
            },
            send(){
                if(this.edit === null){
                    this.ajouterMessage()
                }
                else{
                    this.editMessage()
                }
            },
            ajouterMessage() {
                this.$http.post('channels/' + this.$route.params.id + '/posts', {
                    message: this.message,
                }).then((response) => {
                    this.$bus.$emit("addMessage",response.data)
                    this.message = null;
                }).catch((e) => {
                    this.$root.makeToast(e.response.data.message)
                })
            },
            editMessage(){
                this.$http.put('channels/' + this.$route.params.id + '/posts/'+this.edit.id, {
                    message: this.message,
                }).then(() => {
                    this.$bus.$emit("editMessage")
                    this.annulerEdit()
                }).catch((e) => {
                    this.$root.makeToast(e.response.data.message)
                })
            }
        }
    }
</script>

<style scoped>
    .sending_box{
        margin-top: 1em;
    }
    @media (max-width: 767.98px) {
        .btn{
            margin-top: 1em;
        }
    }
</style>