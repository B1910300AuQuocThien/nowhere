<template>
    <div>

        <UserForm :account="account" @submit:user="updateUser" />
    </div>
</template>

<script>
import customerService from '../../services/customer.service';
import UserForm from '../../components/admin/UserForm.vue';
export default {
    components: {
        UserForm
    },
    props: {
        id: { type: String, required: true }
    },
    data() {
        return {
            account: null
        }
    },

    methods: {
        async getAccount(id) {
            console.log(id)
            this.account = await customerService.getById(id)
            console.log(this.account)
        },

        async updateUser(user) {
            const data = {
                email: user.email,
                name: user.tenkh,
                password: user.matkhau
            }
            // console.log(data)
            await customerService.updateUser(this.id, data)
        }
    },
    created() {
        this.getAccount(this.id)
    }

}
</script>