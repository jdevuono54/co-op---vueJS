<template>
    <b-navbar toggleable="sm" type="light" variant="info" class="navbar">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand style="color: white">Co'op</b-navbar-brand>

        <b-collapse id="nav-text-collapse" is-nav v-if="this.$store.state.user">
            <b-navbar-nav>
                <b-nav-text><router-link to="/">Conversations</router-link></b-nav-text>
                <b-nav-text><router-link to="/members">Membres</router-link></b-nav-text>
                <b-nav-text class="deconnexion" @click="deco">Déconnexion</b-nav-text>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: "navbar",
        methods:{
            deco(){
                this.$store.commit("decoUser");
                this.$router.push("/")
            }
        }
    }
</script>

<style scoped>
    .navbar{
        margin-bottom: 2em;
    }
    a{
        text-decoration: none;
        margin-left: 1em;
    }
    .deconnexion{
        position: absolute;
        right: 1em;
        cursor: pointer;
    }
</style>