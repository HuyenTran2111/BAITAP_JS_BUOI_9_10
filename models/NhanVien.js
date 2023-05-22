// Tạo lớp đối tượng
// Hàm khởi tạo

function NhanVien (taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam) {

    //Property
this.taiKhoan = taiKhoan;
this.hoTen = hoTen;
this.email = email;
this.matKhau = matKhau;
this.ngayLam = ngayLam;
this.luongCB = luongCB;
this.chucVu = chucVu;
this.gioLam = gioLam;
this.tongLuong = 0;
this.xepLoai = "";
// this.tinhTongLuong();

// this.tinhXepLoai();


// Method

this.tinhTongLuong = function() {
    if(this.chucVu === 'Sếp') {
        this.tongLuong = this.luongCB * 3;
    } else if (this.chucVu === 'Trưởng phòng') {
        this.tongLuong = this.luongCB * 2;
    } else {
        this.tongLuong = this.luongCB;
    }
    
};

this.XepLoaiNV = function () {
    if(this.gioLam  >= 192) {
        this.xepLoai = "Xuất sắc";
    } else if(this.gioLam >= 176) {
        this.xepLoai = "Giỏi";
    } else if(this.gioLam >= 160) {
        this.xepLoai = "Khá";
    }else {
        this.xepLoai = "Trung bình";
    }
};
};