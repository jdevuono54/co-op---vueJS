<template>
    <div class="Members container-fluid">
        <members_list :membres="membres"></members_list>
        <profil_modal :member="selected_membre"></profil_modal>
    </div>
</template>

<script>
    import members_list from "../components/members/Members_list";
    import profil_modal from "../components/profil_modal";
    export default {
        name: "Members",
        components: {profil_modal, members_list},
        data:function(){
            return {
                membres:null,
                selected_membre:null
            }
        },
        beforeDestroy() {
            this.$bus.$off();
        },
        mounted() {
            this.$bus.$on('loadMembers',(members) => {
                this.membres = members
            })
            this.$bus.$on('changeSelectedMembre',(membre) => {
                this.selected_membre = membre
            })
            this.$bus.$on('deleteMember',(membre) => {
                this.membres.splice(this.membres.indexOf(membre),1)
            })
        },

    }
</script>

<style scoped>

</style>