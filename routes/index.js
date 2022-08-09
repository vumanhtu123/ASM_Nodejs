var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
const {Schema} = require("mongoose");
/* GET home page. */

const uri = "mongodb+srv://tienlcvb2002:6RGV5nq1myv4JDL6@cluster0.1vruet8.mongodb.net/lab6?retryWrites=true&w=majority";
mongoose.connect(uri).catch(err => console.log(err));

const WALLPAPERS = mongoose.model('hinhnens', new Schema({
    tieude: String,
    noidung: String,
    ngaythang: String,
    links: String,
}))


router.get('/', function (req, res, next) {
    WALLPAPERS.find({}, function (err, result) {
        if (err) throw err;
        res.render('index', {data: result});
    })

});

router.get('/delete/', function (req, res) {
    const id = req.query.id;
    WALLPAPERS.deleteOne({_id: id}, function (error) {
        if (error) throw error;
        res.send('Xoa Thanh Cong!!!');
    })
});

router.get('/getUser', function (req, res) {
    WALLPAPERS.find({}, function (err, result) {
        if (err) throw err;
        res.send(result);
    })
})

router.get('/insertForm/', function (req, res) {
    res.render('insert', {title: 'Insert'})
});

router.post('/insert/', function (req, res) {
    const tieude = req.body.tieude;
    const noidung = req.body.noidung;
    const ngaythang = req.body.ngaythang;
    const links = req.body.links;

    WALLPAPERS.insertMany({
        tieude: tieude,
        noidung: noidung,
        ngaythang: ngaythang,
        links: links
    }, function (error, result) {
        if(error) throw error;
        res.redirect('/');
    })
});

router.get('/updateForm/', function (req, res) {
    const id = req.query.id;
    WALLPAPERS.findOne({_id: id}, function (error, result) {
        res.render('update', {title: 'Update', data: result})
    })
});

router.post('/update/', function (req, res) {
    const id = req.body.id;
    const tieude = req.body.tieude;
    const noidung = req.body.noidung;
    const ngaythang = req.body.ngaythang;
    const links = req.body.links;

    const hinhnen = new WALLPAPERS({
        _id: id,
        tieude: tieude,
        noidung: noidung,
        ngaythang: ngaythang,
        links: links
    })
    WALLPAPERS.findByIdAndUpdate(id, hinhnen, function (err, result) {
        if (err) throw err;
        res.redirect('/');

    })
});
module.exports = router;
