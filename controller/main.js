var dsnv = new DSNV();

var validation = new Validation();

getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
};

function layThongTinNV(isAdd) {
  var taiKhoan = getEle('tknv').value;
  var hoTen = getEle('name').value;
  var email = getEle('email').value;
  var matKhau = getEle('password').value;
  var ngayLam = getEle('datepicker').value;
  var luongCB = getEle('luongCB').value;
  var chucVu = getEle('chucvu').value;
  var gioLam = getEle('gioLam').value;

  /**
   * Validation
   */
  var isValid = true;

if(isAdd){
 // Validation tài khoản
 isValid &= validation.kiemTraRong(taiKhoan, 'errorTaiKhoan', '(*) Vui lòng nhập tài khoản') && validation.kiemTraDoDaiKiTu(taiKhoan, 'errorTaiKhoan', '(*) Vui lòng nhập tối đa 4 - 6 ký số', 4, 6) && validation.kiemTraTaiKhoanTonTai(taiKhoan, 'errorTaiKhoan', '(*) Tài khoản NV đã tồn tại', dsnv.arr)
}
 
  // Validation họ tên
  isValid &= validation.kiemTraRong(hoTen, 'errorHoTen', '(*) Vui lòng nhập họ và tên') && validation.kiemTraChuoiKiTu(hoTen, 'errorHoTen', '(*) Vui lòng nhập chuỗi ký tự')
  // Validation email
  isValid &= validation.kiemTraRong(email, 'errorEmail', '(*) Vui lòng nhập email') && validation.kiemTraPattern(email, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'errorEmail', '(*) Vui lòng nhập đúng email')
  // Validation mật khẩu
  isValid &= validation.kiemTraRong(matKhau, 'errorMatKhau', '(*) Vui lòng nhập mật khẩu') && validation.kiemTraPattern(matKhau, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/, 'errorMatKhau', '(*) Vui lòng nhập đúng mật khẩu')
  // Validation ngày làm
  isValid &= validation.kiemTraRong(ngayLam, 'errorNgayLam', '(*) Vui lòng nhập ngày làm') && validation.kiemTraPattern(ngayLam, /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/, 'errorNgayLam', '(*) Vui lòng nhập đúng định dạng mm/dd/yyyy')
  // Validation lương cơ bản
  isValid &= validation.kiemTraRong(luongCB, 'errorLuongCB', '(*) Vui lòng nhập lương cơ bản') && validation.kiemTraLuongCB(luongCB, 'errorLuongCB', '(*) Vui lòng nhập đúng lương cơ bản')
  // Validation chức vụ
  isValid &= validation.kiemTraChucVu('chucvu', 'errorChucVu', '(*) Vui lòng chọn chức vụ')
  //Validation giờ làm
  isValid &= validation.kiemTraRong(gioLam, 'errorGioLam', '(*) Vui lòng nhập giờ làm') && validation.kiemTraGioLam(gioLam, 'errorGioLam', '(*) Vui lòng nhập đúng giờ làm')


  if (!isValid) return null;

  var nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);

  nv.tinhTongLuong();
  nv.XepLoaiNV();

  return nv;
};
// Thêm NV

getEle('btnThemNV').addEventListener('click', function (event) {

  event.preventDefault();

  var nv = layThongTinNV(true);
  if (nv) {
    dsnv.themNV(nv);

    renderTable(dsnv.arr);

    setLocalStorage();
  }


});



function renderTable(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var nv = data[i];
    content += `
        <tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong}</td>
        <td>${nv.xepLoai}</td>
        <td>
        <button class="btn btn-info" onclick="editNV('${nv.taiKhoan}')" data-toggle="modal"
        data-target="#myModal">Edit</button>
        </td>
    
        <td>
        <button class="btn btn-danger" onclick="deleteNV('${nv.taiKhoan}')">Delete</button>
        </td>
        </tr>
        `;
  }
  getEle('tableDanhSach').innerHTML = content;
};

function setLocalStorage() {
  //convert Json => String
  var dataString = JSON.stringify(dsnv.arr);
  //set localStorage
  localStorage.setItem("DSNV", dataString);
};

function getLocalStorage() {
  //check condition
  if (localStorage.getItem("DSNV")) {
    var dataString = localStorage.getItem("DSNV");
    //convert String => Json
    dsnv.arr = JSON.parse(dataString);
    //render table
    renderTable(dsnv.arr);
  }
};

// Xóa NV
function deleteNV(taiKhoan) {
  dsnv.xoaNV(taiKhoan);
  renderTable(dsnv.arr);
  setLocalStorage();
};

// Sửa NV

function editNV(taiKhoan) {
  var nv = dsnv.layThongTinNV(taiKhoan)
  if (nv) {
    //DOM toi cac the input show vale tu sv
    getEle('tknv').value = nv.taiKhoan;
    //disabled #txtMaSV
    getEle("tknv").disabled = true;

    getEle('name').value = nv.hoTen;
    getEle('email').value = nv.email;
    getEle('password').value = nv.matKhau;
    getEle('datepicker').value = nv.ngayLam;
    getEle('luongCB').value = nv.luongCB;
    getEle('chucvu').value = nv.chucVu;
    getEle('gioLam').value = nv.gioLam;

    //display #btnCapNhatSV
    getEle("btnCapNhat").style.display = "inline-block";
    //off #btnThemSV
    getEle("btnThemNV").style.display = "none";
  }

  removeErr();
};

function addNV() {
  
    getEle('tknv').value = '';
    getEle("tknv").disabled = false;

    getEle('name').value = '';
    getEle('email').value = '';
    getEle('password').value = '';
  
    getEle('datepicker').value =  '';
    getEle('luongCB').value = '';
    getEle('chucvu').value = 'Chọn chức vụ';
    getEle('gioLam').value = '';


    getEle("btnCapNhat").style.display = "none";
    getEle("btnThemNV").style.display = "inline-block";

    removeErr();
  
};

function removeErr() {
  getEle('errorTaiKhoan').style.display = 'none';
  getEle('errorHoTen').style.display = 'none';
  getEle('errorEmail').style.display = 'none';
  getEle('errorMatKhau').style.display = 'none';
  getEle('errorNgayLam').style.display = 'none';
  getEle('errorLuongCB').style.display = 'none';
  getEle('errorChucVu').style.display = 'none';
  getEle('errorGioLam').style.display = 'none';
}


// Cập nhật NV
getEle("btnCapNhat").addEventListener("click", function () {
  var nv = layThongTinNV(false);
  dsnv.capNhatNV(nv);
  renderTable(dsnv.arr);
  setLocalStorage();
});

// Search
getEle('btnTimNV').addEventListener('click', function() {
  var search = getEle('searchName').value;
  var mangTimKiem = dsnv.timKiemNV(search);
  renderTable(mangTimKiem);
});
