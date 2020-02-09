<template>
    <div class="Conversation">
        <b-row>
            <table class="table table-hover table-striped">
                <thead class="thead-light">
                <tr>
                    <th scope="col">
                        <b-row>
                            <b-col class="table_title" md="6" sm="12">
                                Conversations
                            </b-col>
                            <b-col id="btn_new_conv" md="6" sm="12">
                                <b-button @click="addConv" class="btn btn-info">Nouvelle conversation</b-button>
                            </b-col>
                        </b-row>
                    </th>
                </tr>
                </thead>
                <div class="table-responsive">

                    <tbody>
                    <tr @mouseleave="hover = null" @mouseover="hover = conversation.id" v-bind:key="id"
                        v-for="(conversation,id) in conversations">
                        <router-link :to="{ name: 'channel_conv', params : { id: conversation.id} }">
                            <td scope="row">

                                {{ conversation.label }}

                                <span v-if="hover === conversation.id">
                                    <font-awesome-icon @click.prevent="deleteConv(conversation)" class="icon alt iconDelete" icon="trash"/>
                                    <font-awesome-icon @click.prevent="editConv(conversation)" class="icon alt" icon="edit"/>
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
        props: ["conversations"],
        data: function () {
            return {
                error: null,
                hover: null
            }
        },
        methods: {
            deleteConv(conv) {
                if (confirm("Êtes-vous sûr ?") === true) {
                    this.$bus.$emit('deleteConv', conv)
                }
            },
            editConv(conv) {
                this.$bus.$emit('showEditConvModal', conv)
            },
            addConv() {
                this.$bus.$emit('showAddConvModal')
            }
        }
    }
</script>

<style scoped>
    #btn_new_conv {
        text-align: right;
    }

    @media (max-width: 768px) {
        #btn_new_conv {
            text-align: center;
        }
    }

    .iconDelete {
        margin-right: 1em;
        margin-left: 1em;
    }
</style>