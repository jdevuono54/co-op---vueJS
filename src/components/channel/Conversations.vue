<template>
    <div class="Conversation">
        <table class="table table-hover table-striped">
            <thead class="thead-light">
            <tr>
                <th scope="col">
                    Conversations
                    <b-button class="btn btn-info" v-b-modal.modal-conversation>Nouvelle conversation</b-button>
                </th>
            </tr>
            </thead>
            <div class="table-responsive">

                <tbody>
                <tr v-bind:key="conversation" v-for="conversation in this.$parent.conversations">
                    <router-link :to="{ name: 'channel_conv', params : { id: conversation.id} }"><td scope="row">{{ conversation.label }}</td></router-link>
                </tr>
                </tbody>
            </div>
        </table>
    </div>

</template>

<script>
    export default {
        name: "Conversations",
        data: function () {
            return {
                error: null
            }
        },
        mounted() {
            this.$http.get('channels?token=' + this.$store.state.user.token).then((e) => {
                this.$parent.conversations = e.data
            }).catch((e) => {
                this.error = e.response.data.message
                alert(this.error);
            })
        }
    }
</script>

<style scoped>
    .table-responsive {
        max-height: 600px;
    }

    td {
        width: 100vw;
    }
</style>