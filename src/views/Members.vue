<template>
    <div class="Members container-fluid">
        <members_list></members_list>
    </div>
</template>

<script>
    import members_list from "../components/members/Members_list";
    export default {
        name: "Members",
        components: {members_list},
        data:function(){
            return {
                membres:null,
            }
        },
    }
</script>

<style scoped>

</style>