<template>
    <SignupForm @submit:account="checkExitsAccount" :account="account" :customer="customer" :address="address"
        @submit:customer="addCustomer"></SignupForm>
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
            const result = await CustomerService.checkExitsAcc(emitPayload.email)
            console.log(result)
            return result.exitsAcc
        },

        async addCustomer(emitPayload) {
            if (this.checkExitsAccount(emitPayload.account.gmail) == false) {
                try {
                    await AddressService.create(emitPayload.address)
                    await CustomerService.create(emitPayload.account, emitPayload.customerDetail)
                }
                catch (error) {
                    console.log(error)
                }
            }
        }


    }

}
</script>