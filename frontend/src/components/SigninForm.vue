<script>
import { Form } from 'vee-validate'
import { getGoogleUrl } from '../utils/getGoogleUrl'
import axios from 'axios'
import AuthService from '../services/auth.service'
export default {
    components: { Form, getGoogleUrl },
    props: {
        account: { type: Object, required: true }
    },
    data() {
        return {
            accountLocal: this.account,
            from: '/',
            user: {}
        }
    },
    emits: ["submit:account"],
    methods: {
        login() {
            this.$emit("submit:account", this.accountLocal)
        },
        async loginGoogle() {
            await axios.get(getGoogleUrl(this.from)).then(
                response => {
                    this.user = response.data
                    console.log(this.user)
                }).catch(err => {
                    console.log(err)
                })
        },
        reloadWin() {
            location.reload()
        }
    },


}
</script>

<template>
    <Form @submit="login">
        <div class="form-group">
            <label for="username" class="form-label">Gmail: </label>
            <input type="text" class="form-control" v-model="accountLocal.email">
        </div>

        <div class="form-group">
            <label for="password" class="form-label">Mật khẩu: </label>
            <input type="password" name="password" class="form-control" v-model="accountLocal.pass">
        </div>

        <div class="form-group">
            <button type="submit" class="btn btn-dark form-control" @click="login">Tiếp</button>
        </div>
        <div class="text-center my-3">HOẶC</div>
        <div class="form-group row d-flex justify-content-around">
            <button class="btn btn-primary  col-5" style="background-color: #3b5998;" href="#!" role="button">
                <i class="fab fa-facebook me-2 mt-1"></i>
                Facebook
            </button>
            <a @click="loginGoogle" class="btn btn-primary col-5" style="background-color: #dd4b39;" role="button">
                <i class="fab fa-google me-2 mt-1"></i>
                Gmail
            </a>
        </div>
    </Form>
</template>

