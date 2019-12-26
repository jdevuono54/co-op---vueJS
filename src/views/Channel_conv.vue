<template>
    <div>
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
                error:null,
            }
        },
        methods:{
            makeToast() {
                this.toastCount++
                this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
                    title: 'BootstrapVue Toast',
                    autoHideDelay: 50000
                })
            },
            ajouterMessage(){
                this.$http.post('channels/'+this.$route.params.id+'/posts?token='+this.$store.state.user.token, {
                    message:this.message,
                }).then((response) => {
                    this.$parent.conversations.push(response.data)
                    this.$bvModal.hide('modal-conversation')
                }).catch((e) => {
                    this.error = e.response.data.message
                    this.makeToast()
                })

            }
        }
    }
</script>

<style scoped>

</style>