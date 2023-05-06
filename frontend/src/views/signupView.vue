<template>
    <SignupForm @submit:account="addCustomer" :account="account" @signup:google="signupGoogle"></SignupForm>
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
        async checkExitsAccount(email) {
            const result = await CustomerService.checkExitsAcc(email)
            return result
        },

        async addCustomer(account) {
            var check = await this.checkExitsAccount(account.email)
            console.log(check.length)
            if (check.length == 0) {
                try {
                    var user = await CustomerService.create(account)
                    var temp = []
                    temp.push(user)
                    this.$cookies.set('user', temp)
                    this.$router.push({ name: 'trangchu' })
                    location.reload()

                }
                catch (error) {
                    console.log(error)
                }
            }
            else {
                alert('tai khoan ton tai')
            }
        },

        async signupGoogle(emitPayload) {
            console.log(emitPayload)
            const user = await this.$gAuth.signIn()
            const exitsAcc = await CustomerService.checkExitsAcc(user.wv.iw)
            console.log(user.getBasicProfile())
            if (exitsAcc.length == 0) {
                var userLogin = {
                    tenkh: user.getBasicProfile().ZZ,
                    email: user.getBasicProfile().iw,
                    matkhau: ''
                }
                var temp = []
                temp.push(userLogin)
                await CustomerService.create(userLogin)
                this.$cookies.set('user', temp)
                console.log(this.$cookies.get('user'))
                await this.$router.push({ name: 'trangchu' })
                location.reload()
            }
        }
    }

}
</script>