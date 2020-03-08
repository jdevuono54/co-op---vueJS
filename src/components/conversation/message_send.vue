<template>
    <div class="sending_box row">
        <div class="col-sm-12 col-md-10">
            <input type="text" v-model="message" class="form-control" autofocus v-on:keyup.enter="ajouterMessage">
        </div>
        <div class="col-sm-12 col-md-2">
            <button type="button" @click="ajouterMessage" class="btn btn-primary btn-block" :disabled="!message">Envoyer</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "message_send",
        data: function () {
            return {
                message: null,
            }
        },
        methods: {
            ajouterMessage() {
                this.$http.post('channels/' + this.$route.params.id + '/posts', {
                    message: this.message,
                }).then((response) => {
                    this.$bus.$emit("addMessage",response.data)
                    this.message = null;
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