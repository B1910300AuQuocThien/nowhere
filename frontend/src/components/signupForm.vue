<template>
    <div class="d-flex justify-content-end mr-5">
        <form action="POST" class="w-25 border p-3 rounded shadow">
            <div class="form-group">
                <label for="username" class="form-label">Tên đăng nhập: </label>
                <input type="text" class="form-control">
            </div>

            <div class="form-group">
                <label for="password" class="form-label">Mật khẩu: </label>
                <input type="password" name="password" class="form-control">
            </div>

            <div class="form-group">
                <label for="re_password" class="form-label">Nhập lại mật khẩu: </label>
                <input type="password" name="re_password" class="form-control">
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-dark form-control">GỬI</button>
            </div>
            <div class="text-center my-3">HOẶC</div>
            <div class="form-group row d-flex justify-content-around">
                <button class="col-5 btn btn-dark rounded-pill">
                    <i class="fab fa-facebook-f h3 mr-2"></i>
                    Facebook
                </button>
                <button class="col-5 btn btn-dark rounded-pill">
                    <i class="fa-solid fa-envelope h3 mr-2"></i>
                    Gmail
                </button>
            </div>
        </form>
    </div>
</template>