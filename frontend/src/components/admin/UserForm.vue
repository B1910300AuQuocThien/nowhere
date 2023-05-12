<template>
    <div class="">
        <Form @submit="updateUser">
            <div class="part-1 w-25 mx-auto">
                <div class="form-group">
                    <label for="password" class="form-label">Tên người dùng </label>
                    <input type="text" name="password" class="form-control" v-model="accountLocal.tenkh">
                </div>

                <div class="form-group">
                    <label for="username" class="form-label">Email: </label>
                    <input type="text" class="form-control" v-model="accountLocal.email">
                </div>

                <div class="form-group">
                    <label for="re_password" class="form-label">Mật khẩu: </label>
                    <input type="password" name="re_password" class="form-control" v-model="accountLocal.matkhau">
                </div>

                <div class="form-group">
                    <button class="btn btn-dark form-control" @click="updateUser">
                        Cậpnhật
                    </button>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
import { Form } from 'vee-validate'
export default {
    components: {
        Form
    },
    props: {
        account: { type: Object, required: true }
    },
    data() {
        return {
            accountLocal: this.account
        }
    },
    emits: ['submit:user'],

    methods: {
        updateUser() {
            console.log(this.accountLocal)
            this.$emit('submit:user', this.accountLocal)
        }
    }


}
</script>