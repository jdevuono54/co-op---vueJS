<template>
    <form class="col-sm-6 offset-sm-3" name="inscription">
        <div class="form-group">
            <label for="name">Nom complet</label>
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">🧑</div>
                </div>
                <input type="text" class="form-control" name="name" id="name" v-model="fullname" placeholder="Nom + prénom">
            </div>
        </div>

        <div class="form-group">
            <label for="mail">Adresse mail</label>
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">📧</div>
                </div>
                <input type="email" class="form-control" name="mail" id="mail" v-model="email" placeholder="Entrer votre adresse mail">
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
                        <input type="password" class="form-control" name="password" id="password" v-model="password" placeholder="Saisir le mot de passe">
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
                        <input type="password" class="form-control" name="checkPassword" id="checkPassword" v-model="checkPassword" placeholder="Ressaisir le mot de passe">
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <button type="button" class="btn btn-secondary btn-block" @click="this.$parent.changeForm">Connexion</button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-primary btn-block" @click="inscription">Inscription</button>
            </div>
        </div>

        <div class="col alert alert-danger" v-show="error" role="alert">
            {{ error }}
        </div>

        <div class="col alert alert-success" v-show="success" role="alert">
            {{ success }}
        </div>

    </form>
</template>

<script>
    export default {
        name: "Inscription",
        data: function() {
            return {
                fullname:null,
                email:null,
                password:null,
                checkPassword:null,
                error:null,
                success:null
            }
        },
        methods:{
            inscription(){
                this.$http.post('members', {
                    fullname:this.fullname,
                    email:this.email,
                    password:this.password,
                    checkPassword:this.checkPassword
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