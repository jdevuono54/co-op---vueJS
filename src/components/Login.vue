<template>
        <form class="col-sm-6 offset-sm-3" name="login">
            <div class="form-group">
                <label for="mail">Adresse mail</label>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">📧</div>
                    </div>
                    <input type="email" class="form-control" name="mail" id="mail" placeholder="Entrer votre adresse mail">
                </div>
            </div>

            <div class="form-group">
                <label for="password">Mot de passe</label>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">🔑</div>
                    </div>
                    <input type="password" class="form-control" name="password" id="password" placeholder="Saisir le mot de passe">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <button type="button" class="btn btn-primary btn-block">Connexion</button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-secondary btn-block" @click="this.$parent.changeForm">S'inscrire</button>
                </div>
            </div>
        </form>
</template>

<script>
    export default {
        name: "Login",
    }
</script>

<style scoped>

</style>