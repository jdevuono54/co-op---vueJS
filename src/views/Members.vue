<template>
    <div class="Members container-fluid">
        <members_list></members_list>
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
        created() {
            this.$bus.$on('loadMembers',(members) => {
                this.membres = members
            })
        },

    }
</script>

<style scoped>

</style>