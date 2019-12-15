<template>
    <form>
        <div>
            <div>
                <input type="text" name="mail" placeholder="Adresse mail">
            </div>
            <div>
                <input type="text" name="password" placeholder="Mot de passe">
            </div>
            <div>
                <button type="button">Connexion</button>
                <router-link to="/Inscription">S'inscrire</router-link>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>

</style>