<template>
    <form>
        <div class="form-group">
            <label for="username" class="form-label">Gmail: </label>
            <input type="text" class="form-control">
        </div>

        <div class="form-group">
            <label for="password" class="form-label">Mật khẩu: </label>
            <input type="password" name="password" class="form-control">
        </div>

        <div class="form-group">
            <button type="submit" class="btn btn-dark form-control">Tiếp</button>
        </div>
        <div class="text-center my-3">HOẶC</div>
        <div class="form-group row d-flex justify-content-around">
            <button class="btn btn-primary  col-5" style="background-color: #3b5998;" href="#!" role="button">
                <i class="fab fa-facebook me-2 mt-1"></i>
                Facebook
            </button>
            <button class="btn btn-primary col-5" style="background-color: #dd4b39;" href="#!" role="button">
                <i class="fab fa-google me-2 mt-1"></i>
                Gmail
            </button>
        </div>
    </form>
</template>