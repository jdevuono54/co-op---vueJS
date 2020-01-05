<template>
    <div class="member_list">
        <b-row>
            <table class="table table-hover table-striped" v-if="this.$parent.membres">
                <thead class="thead-light">
                <tr>
                    <th scope="col">
                        <b-row>
                            <b-col sm="12" md="6" class="table_title">
                                {{ this.$parent.membres.length }} membres
                            </b-col>
                        </b-row>
                    </th>
                </tr>
                </thead>
                <div class="table-responsive">

                    <tbody>
                    <tr v-for="(membre,id) in this.$parent.membres" v-bind:key="id" @click="$parent.selected_membre = membre" v-b-modal.modal-profil>
                        <td scope="row">{{ membre.fullname }}</td>
                    </tr>
                    </tbody>
                </div>
            </table>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "Members_list",
        mounted() {
            this.$http.get('members?token=' + this.$store.state.user.token).then((e) => {
                this.$parent.membres = e.data
            }).catch((e) => {
                this.$root.makeToast(e.response.data.message)
            })
        }
    }
</script>

<style scoped>

</style>