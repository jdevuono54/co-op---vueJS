<template>
    <div class="Members container-fluid">

    </div>
</template>

<script>
    export default {
        name: "Members",
        mounted() {
            this.$http.get('members?token=' + this.$store.state.user.token).then((e) => {
                // eslint-disable-next-line no-console
                console.table(e.data)
            }).catch((e) => {
                this.error = e.response.data.message
                alert(this.error);
            })
        }
    }
</script>

<style scoped>

</style>