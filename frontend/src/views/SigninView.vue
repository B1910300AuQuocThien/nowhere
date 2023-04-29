<template>
    <div class="w-25 mx-auto border p-3">
        <SigninForm :account="account" @submit:account="login" />
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
            const exitsAcc = await CustomerService.checkExitsAcc(emitPayload.email)
            if (exitsAcc) {
                const customer = await CustomerService.login(emitPayload.email, emitPayload.pass)
                if (customer) {
                    this.$cookies.set('user', customer)
                    console.log(this.$cookies.get('user'))
                    this.$router.push({ name: 'trangchu' })
                    location.reload()
                }
            }


        }
    }
}
</script>