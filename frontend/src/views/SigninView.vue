<template>
    <div class="w-25 mx-auto border p-3">
        <SigninForm :account="account" @submit:account="login" @submit:google="loginGoogle" />
    </div>
</template>

<script>
import SigninForm from '../components/SigninForm.vue';
import CustomerService from '../services/customer.service';
export default {
    components: {
        SigninForm
    },
    data() {
        return {
            account: {}
        }
    },
    methods: {
        async login(emitPayload) {
            const customer = await CustomerService.login(emitPayload.email, emitPayload.pass)
            if (customer[0].admin) {
                this.$cookies.set('user', customer)
                console.log(this.$cookies.get('user'))
                this.$router.push({ name: 'trangchu' })
                location.reload()
            }
            else {
                this.$cookies.set('user', customer)
                console.log(this.$cookies.get('user'))
                this.$router.push({ name: 'trangchu' })
                location.reload()
            }
        },

        async loginGoogle(emitPayload) {
            const user = await this.$gAuth.signIn()
            const exitsAcc = await CustomerService.checkExitsAcc(user.wv.iw)
            console.log(exitsAcc)
            if (exitsAcc.length == 1) {
                this.$cookies.set('user', exitsAcc)
                console.log(this.$cookies.get('user'))
                await this.$router.push({ name: 'trangchu' })
                location.reload()
            }
        }
    }
}
</script>