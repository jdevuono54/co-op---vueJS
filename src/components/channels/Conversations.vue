<template>
    <div class="Conversation">
        <b-row>
        <table class="table table-hover table-striped">
            <thead class="thead-light">
            <tr>
                <th scope="col">
                    <b-row>
                    <b-col sm="12" md="6" class="table_title">
                        Conversations
                    </b-col>
                    <b-col sm="12" md="6" id="btn_new_conv">
                        <b-button class="btn btn-info" @click="addConv">Nouvelle conversation</b-button>
                    </b-col>
                    </b-row>
                </th>
            </tr>
            </thead>
            <div class="table-responsive">

                <tbody>
                <tr v-for="(conversation,id) in this.$parent.conversations" v-bind:key="id" @mouseover="hover = conversation.id" @mouseleave="hover = null">
                    <router-link :to="{ name: 'channel_conv', params : { id: conversation.id} }">
                        <td scope="row">
                            {{ conversation.label }}
                            <span v-if="hover === conversation.id">
                                <font-awesome-icon icon="trash" class="icon alt iconDelete" @click.prevent="deleteConv(conversation)"/>
                                <font-awesome-icon icon="edit" class="icon alt" @click.prevent="editConv(conversation)"/>
                            </span>

                        </td>
                    </router-link>
                </tr>
                </tbody>
            </div>
        </table>
        </b-row>
    </div>

</template>

<script>
    export default {
        name: "Conversations",
        data: function () {
            return {
                error: null,
                hover:null
            }
        },
        mounted() {
            this.$http.get('channels').then((e) => {
                this.$parent.conversations = this._.orderBy(e.data,"created_at",'asc')
            }).catch((e) => {
                this.error = e.response.data.message
                alert(this.error);
            })
        },
        methods:{
          deleteConv(conv){
              if(confirm("Êtes-vous sûr ?") === true){
                  this.$bus.$emit('deleteConv',conv)
              }
            },
            editConv(conv){
                this.$bus.$emit('showEditConvModal',conv)
            },
            addConv(){
                this.$bus.$emit('showAddConvModal')
            }
        }
    }
</script>

<style scoped>
    #btn_new_conv{
        text-align: right;
    }

    @media (max-width: 768px) {
        #btn_new_conv{
            text-align: center;
        }
    }
    .iconDelete{
        margin-right: 1em;
        margin-left: 1em;
    }
</style>