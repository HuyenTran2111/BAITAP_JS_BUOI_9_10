function DSNV() {
    this.arr = [];
    this.themNV = function (nv) {
        this.arr.push(nv);
    };

    this.timViTri = function(taiKhoan) {
        var index = -1;
        for(var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            if(nv.taiKhoan === taiKhoan){
                index = i;
                break;
            }
        }
        return index;
    };

    this.layThongTinNV = function (taiKhoan) {
        var index = this.timViTri(taiKhoan);

        if (index !== -1) {
            return this.arr[index];
        }
        return null;
    };

    this.xoaNV = function (taiKhoan) {
        var index = this.timViTri(taiKhoan);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    this.capNhatNV = function (nv) {
        var index = this.timViTri(nv.taiKhoan);
        if (index !== -1) {
          this.arr[index] = nv;
        }
      };

      DSNV.prototype.timKiemNV = function (keyword) {
        var mangTimKiem = [];
      
        for (var i = 0; i < this.arr.length; i++) {
          var nv = this.arr[i];
          
          var keywordToLowerCase = keyword.toLowerCase();
          
          var xepLoai = nv.xepLoai.toLowerCase();
          if (xepLoai.indexOf(keywordToLowerCase) !== -1) {
            mangTimKiem.push(nv);
          }
        }
      
        return mangTimKiem;
    };
}