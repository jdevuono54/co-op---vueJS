<template>
    <form class="col-sm-6 offset-sm-3" name="inscription">
        <div class="form-group">
            <label for="name">Nom complet</label>
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">🧑</div>
                </div>
                <input class="form-control" id="name" name="name" placeholder="Nom + prénom" type="text"
                       v-model="fullname">
            </div>
        </div>

        <div class="form-group">
            <label for="mail">Adresse mail</label>
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">📧</div>
                </div>
                <input class="form-control" id="mail" name="mail" placeholder="Entrer votre adresse mail" type="email"
                       v-model="email">
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">🔑</div>
                        </div>
                        <input class="form-control" id="password" name="password" placeholder="Saisir le mot de passe"
                               type="password" v-model="password">
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="checkPassword">Vérifier le mot de passe</label>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">🔑</div>
                        </div>
                        <input class="form-control" id="checkPassword" name="checkPassword"
                               placeholder="Ressaisir le mot de passe" type="password" v-model="checkPassword">
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <button @click="this.$parent.changeForm" class="btn btn-secondary btn-block" type="button">Connexion
                </button>
            </div>
            <div class="col">
                <button @click="inscription" class="btn btn-primary btn-block" type="button">Inscription</button>
            </div>
        </div>

        <div class="col alert alert-danger" role="alert" v-show="error">
            {{ error }}
        </div>

        <div class="col alert alert-success" role="alert" v-show="success">
            {{ success }}
        </div>

    </form>
</template>

<script>
    export default {
        name: "Inscription",
        data: function () {
            return {
                fullname: null,
                email: null,
                password: null,
                checkPassword: null,
                error: null,
                success: null
            }
        },
        methods: {
            inscription() {
                this.$http.post('members', {
                    fullname: this.fullname,
                    email: this.email,
                    password: this.password,
                    checkPassword: this.checkPassword
                }).then(() => {
                    this.success = "Inscription réussie !"
                }).catch((e) => {
                    this.error = e.response.data.error[0][0]
                })
            }
        }
    }
</script>

<style scoped>

</style>