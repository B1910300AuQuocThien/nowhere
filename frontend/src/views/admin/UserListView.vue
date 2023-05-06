<template>
    <div class="h4 ml-2">QUẢN LÍ NGƯỜI DÙNG</div>
    <div class="col-lg-9 mt-4 mt-lg-0">
        <div class="row">
            <div class="col-md-12">
                <div class="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                    <table class="table manage-candidates-top mb-0">
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th class="text-center">Trạng thái</th>
                                <th class="action text-right">Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <div v-for="user in users" class="" style="width: 140%;">
                                <UserList :user="user" />
                            </div>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
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
        }
    },
    mounted() {
        this.getUserList()
    }

}
</script>

<style scoped></style>