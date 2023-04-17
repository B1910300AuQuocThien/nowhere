<template>
    <SignupForm @submit:account="checkExitsAccount" :account="account" :customer="customer" :address="address"
        @submit:customer="addCustomer"></SignupForm>
</template>

<script>
import SignupForm from '../components/signupForm.vue';
import CustomerService from '../services/customer.service'

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
            const result = await CustomerService.checkExitsAcc(emitPayload.gmail)
            console.log(result.exitsAcc)
        },

        async addCustomer(emitPayload) {
            console.log(emitPayload)
            if (!this.checkExitsAccount(emitPayload.account.gmail)) {
                try {

                    console.log(emitPayload.accountDetail)
                    await CustomerService.create(emitPayload.accountDetail)
                }
                catch (error) {
                    console.log(error)
                }
            }
            // console.log(emitPayload.customerDetail)
        }
    }

}
</script>