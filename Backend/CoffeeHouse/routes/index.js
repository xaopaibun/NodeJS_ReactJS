var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quanlycoffeehouse"
});
con.connect();
/* GET home page. */
router.get('/', function(req, res, next) {
    con.query("SELECT idCoffee,TenCoffee, NoiDungMoTa, HinhAnh, SoLuong, Gia, TenLoaiCoffee, NgayGioNhap FROM SANPHAMCOFFEE, LoaiCoffee WHERE sanphamcoffee.idLoai = loaicoffee.idLoai", function (err, result, fields) {
      if (err) return res.send(err);
      return res.send(result);
    });
});
router.post('/add', function(req, res, next) {
  let ten = req.body.ten;
  let img = req.body.img;
  let gia = req.body.gia;
  let mota = req.body.mota;
  let thongtin = req.body.thongtin;
  let thuonghieu = req.body.thuonghieu;
  let soluong = req.body.soluong;
  var sql = "INSERT INTO sanphamcoffee VALUES(NULL, '1','"+ten+"','"+mota+"','"+img+"',"+gia+", "+soluong+", '"+thongtin+"','"+thuonghieu+"', NULL)";
  con.query(sql, (err, result)  => {
    if (err)  res.send('Thêm Lỗi rồi', err);
    res.send('Thêm Thành công');
  });
});

router.delete('/coffee:/id', function(req, res, next) {
  let id = req.body.id;
  console.log('id la : ', id)
    con.query("DELETE FROM sanphamcoffee WHERE idCoffee = " + id, function (err, result, fields) {
      if (err) return res.send('lỗi 2',err);
      con.end();
      return res.send({ error: false, data: results, message: 'Delete successfully.'});
    });
});

module.exports = router;
