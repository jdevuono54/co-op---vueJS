<template>
    <div class="Channel_conv container-fluid">
        <input type="text" v-model="message">
        <button type="button" @click="ajouterMessage">aaaa</button>
    </div>
</template>

<script>
    export default {
        name: "Channel_conv",
        data: function() {
            return {
                message:null,
            }
        },
        methods:{
            makeToast(errorMsg) {
                this.$root.$bvToast.toast(errorMsg, {
                    title:"⚠ Erreur !",
                    variant:"danger",
                    noCloseButton:true
                })
            },
            ajouterMessage(){
                this.$http.post('channels/'+this.$route.params.id+'/posts?token='+this.$store.state.user.token, {
                    message:this.message,
                }).then((response) => {
                    this.$parent.conversations.push(response.data)
                    this.$bvModal.hide('modal-conversation')
                }).catch((e) => {
                    this.makeToast(e.response.data.message)
                })

            }
        }
    }
</script>

<style scoped>
</style>