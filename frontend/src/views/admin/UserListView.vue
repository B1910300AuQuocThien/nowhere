<template>
    <div class="h4 ml-2">QUẢN LÍ NGƯỜI DÙNG</div>
    <UserList :user="users" @delete:user="deleteUser" @block:user="blockUser" />
</template>

<script>
import UserList from '../../components/admin/UserList.vue'
import customerService from '../../services/customer.service';
export default {
    components: {
        UserList
    },
    data() {
        return {
            users: []
        }
    },
    methods: {
        async getUserList() {
            this.users = await customerService.getAll()
            console.log(this.users)
        },

        async deleteUser(id) {
            await customerService.delete(id)
            this.refersh()
        },

        async blockUser(emitPayload) {
            console.log(emitPayload)
            await customerService.updateStatus(emitPayload)
            this.refersh()
        },

        refersh() {
            this.getUserList()
        }
    },
    mounted() {
        this.refersh()
    }

}
</script>

<style scoped></style>