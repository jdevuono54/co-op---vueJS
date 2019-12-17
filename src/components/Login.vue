<template>
    <div class="container">
        <form class="col-sm-6 offset-sm-3">
            <div class="form-group">
                <label for="mail">Adresse mail</label>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">@</div>
                    </div>
                    <input type="email" class="form-control" name="mail" id="mail" placeholder="Entrer votre adresse mail">
                </div>
            </div>

            <div class="form-group">
                <label for="password">Mot de passe</label>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">*</div>
                    </div>
                    <input type="password" class="form-control" name="password" id="password" placeholder="Saisir le mot de passe">
                </div>
            </div>

            <div class="form-btn form-row">
                <div class="form-group col-sm-6">
                    <button type="button" class="btn btn-primary btn-block">Connexion</button>
                </div>
                <div class="form-group col-sm-6">
                    <router-link to="/inscription" class="btn btn-secondary btn-block">S'inscrire</router-link>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>
    .btn-primary{
        margin-right: 1em;
    }
    .form-btn{
        text-align: center;
    }
</style>