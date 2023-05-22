function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {
        if (value === "") {
            getEle(errorId).style.display = 'block';
            getEle(errorId).innerHTML = mess;
            return false;
        }

        getEle(errorId).style.display = 'none';
        getEle(errorId).innerHTML = "";
        return true;
    }

    this.kiemTraDoDaiKiTu = function (value, errorId, mess, min, max) {
        if (min <= value.length && value.length <= max) {
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    };

    this.kiemTraChuoiKiTu = function (value, errorId, mess) {
        var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    };

    this.kiemTraPattern = function (value, pattern, errorId, mess) {
        if (value.match(pattern)) {
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    };

    this.kiemTraChucVu = function (idSelect, errorId, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    };

    this.kiemTraLuongCB = function (value, errorId, mess) {
        if (value >= 1000000 && value <= 20000000) {
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    };

    this.kiemTraGioLam = function (value, errorId, mess) {
        if (value >= 80 && value <= 200) {
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    };

    this.kiemTraTaiKhoanTonTai = function(value, errorId, mess, arr) {
        var exist = false;

        for (var i = 0; i < arr.length; i++) {
            var nv = arr[i];
            if(nv.taiKhoan === value) {
                exist = true;
                break;
            }
        }
        if(exist) {
            getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
        }
        getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = "";
            return true;
    };
};