<template>
    <SignupForm @submit:account="checkExitsAccount" :account="account" :customer="customer" :address="address"
        @submit:customer="addCustomer" @signup:google="signupGoogle"></SignupForm>
</template>

<script>
import SignupForm from '../components/signupForm.vue';
import CustomerService from '../services/customer.service'
import AddressService from '../services/address.service';
export default {
    components: {
        SignupForm
    },

    data() {
        return {
            account: {},
            customer: {},
            address: {}
        }
    },

    methods: {
        async checkExitsAccount(emitPayload) {
            // console.log(emitPayload)
            const result = await CustomerService.checkExitsAcc(emitPayload.email)
            return result
        },

        async addCustomer(emitPayload) {
            if (!this.checkExitsAccount(emitPayload.account.email) == []) {
                try {
                    await CustomerService.create(emitPayload.account, emitPayload.customerDetail)
                    await AddressService.create(emitPayload.address)
                }
                catch (error) {
                    console.log(error)
                }
            }
        },

        async signupGoogle(emitPayload) {
            console.log(emitPayload)
            const user = await this.$gAuth.signIn()
            const exitsAcc = await CustomerService.checkExitsAcc(user.wv.iw)
            if (!exitsAcc[0]) {

                this.$cookies.set('user', exitsAcc)
                console.log(this.$cookies.get('user'))
                await this.$router.push({ name: 'trangchu' })
                location.reload()
            }
        }


    }

}
</script>