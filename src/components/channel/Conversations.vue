<template>
    <div class="Conversation">
    <table class="table table-hover">
        <thead class="thead-light">
            <tr>
                <th scope="col">
                    Conversations
                    <b-button v-b-modal.modal-conversation class="btn btn-info">Nouvelle conversation</b-button>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td scope="row">aaaa</td>
            </tr>
            <tr>
                <td scope="row">bbb</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
    export default {
        name: "Conversations",
        methods:{
            test() {
                if (window.jQuery) {
                    // jQuery is loaded
                    alert("Yeah!");
                } else {
                    // jQuery is not loaded
                    alert("Doesn't Work");
                }
            }
        }
    }
</script>

<style scoped>

</style>