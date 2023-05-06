<template>
    <tr class="">
        <td class="title" style="width: 65%;">
            <div class="candidate-list-details">
                <div class="candidate-list-info">
                    <div class="candidate-list-title">
                        <h5 class="mb-0"><a href="#">{{ user.tenkh }}</a></h5>
                    </div>
                    <div class="candidate-list-option">
                        <ul class="list-unstyled">
                            <li>{{ user.email }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </td>
        <td class="text-center" style="width: 30%;">
            <span class="">{{ user.trangthai }}</span>
        </td>
        <td class="" style="width: 5%;">
            <ul class=" list-unstyled mb-0">
                <li><a href="#" class="text-danger" data-toggle="tooltip" title="" data-original-title="Delete"><i
                            class="far fa-trash-alt"></i></a></li>
            </ul>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        user: { type: Object, required: true }
    }
}
</script>