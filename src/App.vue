<template>
  <div id="app">
    <div id="nav">
        <navbar></navbar>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
    @import "../node_modules/bootstrap/scss/bootstrap.scss";
    @import "../node_modules/bootstrap-vue/dist/bootstrap-vue.min.css";
    @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');

    body{
        font-family: "Raleway",serif;
    }

    .alert{
        margin-top: 1em;
    }
    .error-small{
        text-align: center;
        margin-bottom: 1em;
    }

    .table_title{
        margin-bottom: auto;
        margin-top: auto;
        font-size: 1.2em;
    }
    .table-responsive {
        max-height: 600px;
    }
    td {
        width: 100vw;
    }


    th> div:nth-child(1){
        text-align: left;
    }

    @media (max-width: 768px) {
        th> div:nth-child(1){
            text-align: center;
        }
    }
</style>
<script>
    import Navbar from "./components/navbar";
    export default {
        components: {Navbar}
    }
</script>