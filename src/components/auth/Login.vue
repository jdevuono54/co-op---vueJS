<template>
        <form class="col-sm-6 offset-sm-3" name="login">
            <div class="form-group">
                <label for="mail">Adresse mail</label>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">📧</div>
                    </div>
                    <input type="text" class="form-control" name="mail" id="mail" v-model="email" placeholder="Entrer votre adresse mail">
                </div>
            </div>

            <div class="form-group">
                <label for="password">Mot de passe</label>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">🔑</div>
                    </div>
                    <input type="password" class="form-control" name="password" id="password" v-model="password" placeholder="Saisir le mot de passe">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <button type="button" class="btn btn-primary btn-block" @click="connexion" :disabled="!email || !password">Connexion</button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-secondary btn-block" @click="this.$parent.changeForm">S'inscrire</button>
                </div>
            </div>

            <div class="col alert alert-danger" role="alert" v-show="error">
                {{ error }}
            </div>
        </form>
</template>

<script>
    export default {
        name: "Login",
        data: function () {
            return {
                email: null,
                password: null,
                error: null
            }
        },
        methods: {
            connexion() {
                this.$http.post('members/signin', {
                    email: this.email,
                    password: this.password,
                }).then((response) => {
                    this.$store.commit("saveUserLocalStorage",response.data);
                    this.$router.push("channel")
                }).catch((e) => {
                    this.error = e.response.data.error[0][0]
                })
            }
        }
    }
</script>

<style scoped>

</style>