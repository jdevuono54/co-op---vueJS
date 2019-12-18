<template>
  <div class="home container">
    <Login v-show="!$store.state.formInscription"></Login>
    <Inscription v-show="$store.state.formInscription"></Inscription>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "../components/Login";
import Inscription from "../components/Inscription";

export default {
  name:"home",
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
