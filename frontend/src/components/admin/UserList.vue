<template>
    <div class="">
        <table class="table">
            <thead>
                <tr>
                    <th class="col-4">Tên</th>
                    <th class="col-4">Admin</th>
                    <th class="col-2 text-center">Trạng thái</th>
                    <th class="text-center col-2">Sửa</th>
                    <th class="col-2 text-center">Xóa</th>
                </tr>
            </thead>
            <tbody>
                <tr class="" v-for="user in user">
                    <td class="col-4">
                        <h5 class="mb-0"><a href="#">{{ user.tenkh }}</a></h5>
                        <div>{{ user.email }}</div>
                    </td>
                    <td class="col-4">
                        <div class="">
                            {{ user.admin }}
                        </div>
                    </td>

                    <td class="col-2 text-center">
                        <button class="btn btn-primary" @click="blockUser(user._id, user.trangthai)" v-if="user.trangthai">
                            Kích hoạt
                        </button>
                        <button class="btn btn-danger px-4" @click="blockUser(user._id, user.trangthai)"
                            v-else>Khóa</button>
                    </td>
                    <td class="col-2 text-center">
                        <router-link :to="{
                            name: 'capnhatnguoidung',
                            params: { id: user._id }
                        }">
                            <button class="btn btn-primary">Sửa</button>
                        </router-link>
                    </td>
                    <td class="col-2">
                        <button class="btn btn-danger" @click="deleteUser(user._id)">XÓA</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        user: { type: Object, required: true }
    },
    emits: ["delete:user", "block:user"],
    methods: {
        deleteUser(id) {
            this.$emit("delete:user", id)
        },

        blockUser(id, newStatus) {
            this.$emit("block:user", { id: id, newStatus: !newStatus })
        },

        // editUser(id) {
        //     console.log(id)
        //     this.$router.push({
        //         name: 'capnhatnguoidung',
        //         params: { id: id }
        //     })
        // }
    }
}
</script>