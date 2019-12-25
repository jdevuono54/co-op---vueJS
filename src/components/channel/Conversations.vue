<template>
    <div class="Conversation">
    <table class="table table-hover">
        <thead class="thead-light">
            <tr>
                <th scope="col">
                    Conversations
                    <b-button v-b-modal.modal-conversation class="btn btn-info">Nouvelle conversation</b-button>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="conversation in this.$parent.conversations" v-bind:key="conversation">
                <td scope="row">{{ conversation.label }}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
    export default {
        name: "Conversations",
        data: function () {
            return{
                error:null
            }
        },
        mounted() {
            this.$http.get('channels?token='+this.$store.state.user.token).then((e) => {
                this.$parent.conversations = e.data
            }).catch((e) => {
                this.error = e.response.data.message
                alert(this.error);
            })
        }
    }
</script>

<style scoped>

</style>