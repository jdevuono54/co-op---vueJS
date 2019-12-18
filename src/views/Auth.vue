<template>
  <div class="home container">
    <Login v-show="!$store.state.formInscription"></Login>
    <Inscription v-show="$store.state.formInscription"></Inscription>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "../components/auth/Login";
import Inscription from "../components/auth/Inscription";

export default {
  name:"auth",
  components:{
    Login,
    Inscription
  },
  methods:{
    changeForm(){
      this.$store.commit("changeFormInscriConnex")
    }
  }
}
</script>

<style scoped>

</style>
