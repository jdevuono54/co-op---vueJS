<template>
    <form class="col-sm-6 offset-sm-3" name="inscription">
        <div class="form-group">
            <label for="name">Nom complet</label>
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <div class="input-group-text"><font-awesome-icon icon="user" class="icon alt"/></div>
                </div>
                <input class="form-control" id="name" name="name" placeholder="Nom + prénom" type="text"
                       v-model="fullname">
            </div>
        </div>

        <div class="form-group">
            <label for="mail">Adresse mail</label>
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <div class="input-group-text"><font-awesome-icon icon="envelope" class="icon alt"/></div>
                </div>
                <input class="form-control" :class="{'is-invalid':!emailIsValid}" id="mail" name="mail" placeholder="Entrer votre adresse mail" type="text"
                       v-model="email">
            </div>
        </div>

        <div class="row error-small" v-show="error.mailInvalid">
            <div class="col-md-12">
                <small class="text-danger">{{ error.mailInvalid }}</small>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 col-lg-6">
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><font-awesome-icon icon="key" class="icon alt"/></div>
                        </div>
                        <input class="form-control" id="password" name="password" placeholder="Saisir le mot de passe"
                               type="password" v-model="password">
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-lg-6">
                <div class="form-group">
                    <label for="checkPassword">Vérifier le mot de passe</label>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><font-awesome-icon icon="key" class="icon alt"/></div>
                        </div>
                        <input class="form-control" :class="{'is-invalid':!checkPasswordSame}" id="checkPassword" name="checkPassword"
                               placeholder="Ressaisir le mot de passe" type="password" v-model="checkPassword">
                    </div>
                </div>
            </div>
        </div>

        <div class="row error-small" v-show="error.passwordNotSame">
            <div class="col-md-12">
                <small class="text-danger">{{ error.passwordNotSame }}</small>
            </div>
        </div>



        <div class="row">
            <div class="col">
                <button @click="this.$parent.changeForm" class="btn btn-secondary btn-block" type="button">Connexion
                </button>
            </div>
            <div class="col">
                <button @click="inscription" class="btn btn-primary btn-block" type="button" :disabled="!completedForm || !checkPasswordSame || !emailIsValid">Inscription</button>
            </div>
        </div>

        <div class="col alert alert-danger" role="alert" v-show="error.failInscription">
            {{ error.failInscription }}
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
                error: {
                    "passwordNotSame":null,
                    "failInscription":null,
                    "mailInvalid":null
                },
                success: null
            }
        },
        computed:{
            emailIsValid () {
                if(!this.email){
                    this.setErrorMessage("mailInvalid",null);
                    return true
                }else{
                    if(/\S+@\S+\.\S+/.test(this.email)){
                        this.setErrorMessage("mailInvalid",null);
                        return true;
                    }else{
                        this.setErrorMessage("mailInvalid","Format de l'adresse mail incorrect");
                        return false;
                    }
                }
            },
            completedForm(){
                return !(!this.fullname || !this.email || !this.password || !this.checkPassword);
            },
            checkPasswordSame(){
                if(this.checkPassword === this.password || !this.checkPassword){
                    this.setErrorMessage("passwordNotSame",null);
                    return true;
                }
                else{
                    this.setErrorMessage("passwordNotSame","Les mots de passe doivent être identique");
                    return false;
                }
            }
        },
        methods: {
            setErrorMessage(errorCol,msg){
                this.error[errorCol] = msg;
            },
            inscription() {
                this.$http.post('members', {
                    fullname: this.fullname,
                    email: this.email,
                    password: this.password,
                    checkPassword: this.checkPassword
                }).then(() => {
                    this.error = {"passwordNotSame":null, "failInscription":null, "mailInvalid":null}
                    this.success = "Inscription réussie !"
                }).catch((e) => {
                    this.setErrorMessage("failInscription",e.response.data.message);
                })
            }
        }
    }
</script>

<style scoped>

</style>