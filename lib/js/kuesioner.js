$(document).ready(function(){
  $("#dialogHapus").dialog({
    autoOpen: false,
    modal: true,
  });
  $("#dialogInfo").dialog({
    autoOpen: false,
    modal: true,
  });
});

var pratinjau = {
  'berikutnya' : function() {
    var awal = Number(_('saat_ini').innerHTML);
    var akhir = Number(_('total').innerHTML);

    if(awal < akhir) {
      _('saat_ini').innerHTML = awal + 1;
      _('pertanyaan').innerHTML = pertanyaan[awal];
      if (jenis_skala == 'guttman') {
        var ul = _('daftarJawaban');
        ul.innerHTML = '';
        var li = _e('li');
        li.innerHTML = jawaban_a[awal];
        ul.appendChild(li);
        li = _e('li');
        li.innerHTML = jawaban_b[awal];
        ul.appendChild(li);
      } else if (jenis_skala == 'semantic') {
        var i;
        _('jawaban_a').innerHTML = jawaban_a[awal];
        _('jawaban_b').innerHTML = jawaban_b[awal];
        for (i = 0; i < interval[awal].length; i++) {
          _('interval_' + i).innerHTML = interval[awal][i];
        }
        /*
        var ul = _('daftarJawaban');
        ul.innerHTML = '';

        var li = _e('li');
        li.setAttribute('style', 'overflow:auto');

        var span = _e('span');
        span.setAttribute('style','float:left');
        span.innerHTML = jawaban_a[awal] + " (" + nilai_a[awal] + ")";
        li.appendChild(span);

        var input = _e('input');
        input.id = 'batasan';
        input.type = 'range';
        input.setAttribute('min', nilai_a[awal]);
        input.setAttribute('max', nilai_b[awal]);
        li.appendChild(input);

        span = _e('span');
        span.setAttribute('style','float:right');
        span.innerHTML = jawaban_b[awal] + " (" + nilai_b[awal] + ")";
        li.appendChild(span);
        ul.appendChild(li);
        */
      }
    }
    if(awal >= akhir) {
      _('berikutnya').innerHTML = "Tutup";
      _('berikutnya').setAttribute("onclick", "pratinjau.tutup()");
    }
  },
  'tutup': function() {
    // bila Anda tidak masuk, maka akan di alihkan ke halaman utama
    // ini dari sesi PHP
    location.href = halaman_utama + "/peneliti/kuesioner.php";
  }
}

var kuesioner = {
    // objek kuesioner.likert
    'likert': {
        'tambahPilihan': function() {
            // var box = document.getElementById('pilihanJawaban');
            var box = document.getElementById('listJawaban');
            var i = 1;
            for (i = 1; i < 999999999999; i++) {
                if (document.getElementById('j' + i) === null) {
                    // !ingat ada break di bawah :)
                    var li = document.createElement('li');
                    li.id = 'li_' + i;
                    var input = document.createElement('input');
                    input.setAttribute('id', 'j' + i);
                    input.setAttribute('class', 'form-control');
                    input.setAttribute('style', 'display:inline;width:400px');
                    input.setAttribute('type', 'text');
                    input.setAttribute('placeholder', 'Jawaban');
                    li.appendChild(input);
                    li.appendChild(document.createTextNode(" "));

                    var input = document.createElement('input');
                    input.setAttribute('id', 'n' + i);
                    input.setAttribute('class', 'form-control');
                    input.setAttribute('style', 'display:inline;width:100px');
                    input.setAttribute('type', 'number');
                    input.setAttribute('placeholder', 'Nilai');
                    li.appendChild(input);
                    li.appendChild(document.createTextNode(" "));

                    var button = document.createElement('button');
                    button.setAttribute('id', 's' + i);
                    button.setAttribute('class', 'btn btn-primary');
                    button.setAttribute(
                        'onclick', "kuesioner.likert.simpanPilihan('" + i + "')"
                    );
                    button.innerHTML = "Simpan";
                    li.appendChild(button);
                    li.appendChild(document.createTextNode(' '));

                    var del = document.createElement('button');
                    del.setAttribute('id', 'd' + i);
                    del.setAttribute('class', 'btn btn-danger');
                    del.setAttribute(
                        'onclick', "kuesioner.likert.hapusPilihanIni('" + i + "')"
                    );
                    var delIcon = document.createElement('span');
                    delIcon.setAttribute('class', 'glyphicon glyphicon-remove');
                    delIcon.setAttribute('aria-hidden', 'true');
                    del.appendChild(delIcon);
                    del.appendChild(document.createTextNode(' Abaikan'));
                    li.appendChild(del);

                    box.appendChild(li);

                    var next = Number($('#pilihanJawaban').attr('next')) + 1;
                    $('#pilihanJawaban').attr('next', next);
                    break;
                }
            }
        },
        'simpanPilihan': function(id) { // kuesioner.likert.simpanPilihan
            if (kosong($("#j" + id)) === true || kosong($("#n" + id)) === true) {
                $("#dialogInfo").dialog("open");
                return false;
            }
            var r = $.ajax({
                url: '../ajax/simpan_likert_pilihan_jawaban.php',
                method: 'post',
                data: {
                    jawaban: $('#j' + id).val(),
                    nilai: $('#n' + id).val(),
                    q_liker_id: $('#pilihanJawaban').attr('q_liker_id'),
                }
            });
            r.done(function(data) {
                var json = $.parseJSON(JSON.stringify(data));
                if (json.result == "ok") {
                    // simpan last_id pada li_id juga q_liker_id
                    var li = document.getElementById('li_' + id);
                    li.setAttribute('last_id', json.last_id);
                    li.setAttribute('q_liker_id', json.q_liker_id);

                    document.getElementById('j' + id).setAttribute(
                        'disabled', 'disabled'
                    );
                    document.getElementById('n' + id).setAttribute(
                        'disabled', 'disabled'
                    );

                    // hapus tombol simpan untuk kemudian di ganti dengan
                    // tombol edit
                    var s = document.getElementById('s' + id);
                    s.parentNode.removeChild(s);

                    // cek jika tombol abaikan ada, maka hapus juga
                    if (document.getElementById('d' + id)) {
                        var d = document.getElementById('d' + id);
                        d.parentNode.removeChild(d);
                    }

                    // selanjut adalah buat tombol edit dan append ke list
                    var li = document.getElementById('li_' + id);

                    var button = document.createElement('button');
                    button.setAttribute('id', 'e' + id);
                    button.setAttribute('class', 'btn btn-success');
                    button.setAttribute(
                        'onclick',
                        "kuesioner.likert.editPilihanTersimpan('" + id + "')"
                    );
                    button.innerHTML = "Edit";
                    li.appendChild(button);
                    li.appendChild(document.createTextNode(' '));


                    // lalu buat del button, tapi bukan untuk id 1 dan 2
                    if (id >= 3) {
                        var del = document.createElement('button');
                        del.setAttribute('id', 'd' + id);
                        del.setAttribute('class', 'btn btn-danger');
                        del.setAttribute(
                            "onclick",
                            "kuesioner.likert.hapusPilihanTersimpan('" + id + "')"
                        );
                        del.appendChild(document.createTextNode('Hapus'));
                        li.appendChild(del);
                    }

                    // otomatis menampilkan tombol selanjutnya
                    // !hang_on
                    $("#selanjutnya").attr(
                        "style",
                        "display: block;margin-top: 10px;margin-left: 5px"
                    );
                    kuesioner.likert.tambahPilihan();
                }
            });
        },
        'hapusPilihanTersimpan': function(id) {
            // tampilkan progress yang sedang terjadi: penghapusan ....
            var d = document.getElementById('d' + id);
            d.setAttribute('class', 'btn btn-danger disabled');
            d.innerHTML = "Menghapus...";

            // lakukan ajax request untuk penghapusan data..
            var r = $.ajax({
                url: '../ajax/hapus_likert_pilihan_tersimpan.php',
                method: 'post',
                data: {
                    id: $('#li_' + id).attr('q_liker_id')
                }
            });
            r.done(function(data) {
                if (data == 'ok') {
                    var li = document.getElementById('li_' + id);
                    li.parentNode.removeChild(li);
                }
            });

        },
        'hapusPilihanIni': function(id) {
            var li = document.getElementById('li_' + id);
            li.parentNode.removeChild(li);
        },
        'editPilihanTersimpan': function(id) {
            // hapus element Edit untuk kemudian diganti dengan Simpan lagi
            var e = document.getElementById('e' + id);
            e.parentNode.removeChild(e);

            // hapus element Hapus, nanti ditambahkan ulang...
            var d = document.getElementById('d' + id);
            d.parentNode.removeChild(d);

            // enable kembali jawaban dan nilai
            var j = document.getElementById('j' + id);
            j.disabled = false;
            var n = document.getElementById('n' + id);
            n.disabled = false;

            // buat element Simpan, karena Edit telah di hapus.
            var button = document.createElement('button');
            button.setAttribute('id', 's' + id);
            button.setAttribute('class', 'btn btn-primary');
            button.setAttribute(
                'onclick', "kuesioner.likert.perbaharuiPilihan('" + id + "')"
            );
            button.innerHTML = "Perbaharui";
            // select list yang dimaksud
            var li = document.getElementById('li_' + id);
            li.appendChild(button);
            li.appendChild(document.createTextNode(' '));

        },
        'perbaharuiPilihan': function(id) {
            if (kosong($("#j" + id)) == true || kosong($("#n" + id)) == true) {
                alert("Data belum di input/lengkap! Harap dilengkapi");
                return false;
            }

            var r = $.ajax({
                url: '../ajax/perbaharui_likert_pilihan_jawaban.php',
                method: 'post',
                data: {
                    jawaban: $('#j' + id).val(),
                    nilai: $('#n' + id).val(),
                    q_liker_id: $('#li_' + id).attr('q_liker_id'),
                }
            });
            r.done(function(data) {
                if (data == 'ok') {
                    // simpan last_id pada li_id juga q_liker_id
                    var li = document.getElementById('li_' + id);

                    document.getElementById('j' + id).setAttribute(
                        'disabled', 'disabled'
                    );
                    document.getElementById('n' + id).setAttribute(
                        'disabled', 'disabled'
                    );

                    // hapus tombol simpan untuk kemudian di ganti dengan
                    // tombol edit
                    var s = document.getElementById('s' + id);
                    s.parentNode.removeChild(s);

                    // cek jika tombol abaikan ada, maka hapus juga
                    if (document.getElementById('d' + id)) {
                        var d = document.getElementById('d' + id);
                        d.parentNode.removeChild(d);
                    }

                    // selanjut adalah buat tombol edit dan append ke list
                    li = document.getElementById('li_' + id);

                    var button = document.createElement('button');
                    button.setAttribute('id', 'e' + id);
                    button.setAttribute('class', 'btn btn-success');
                    button.setAttribute(
                        "onclick",
                        "kuesioner.likert.editPilihanTersimpan('" + id + "')"
                    );
                    button.innerHTML = "Edit";
                    li.appendChild(button);
                    li.appendChild(document.createTextNode(' '));

                    // lalu buat del button
                    var del = document.createElement('button');
                    del.setAttribute('id', 'd' + id);
                    del.setAttribute('class', 'btn btn-danger');
                    del.setAttribute(
                        'onclick',
                        "kuesioner.likert.hapusPilihanTersimpan('" + id + "')"
                    );
                    del.appendChild(document.createTextNode('Hapus'));
                    li.appendChild(del);
                }
            });
        }
    },
    // objek kuesioner.guttman
    'guttman' : {
      'tambahPilihan': function () {
        var box = _('listJawaban');
        var i = 1;
        // lakukan pengulangn untuk menampilkan bentuk isian jawaban
        for (i = 1; i < 999; i++) {
          // jika object sama dengan null
          if(_('j' + i) === null) {
            // !ingat ada break di bawah
            var li = _e('li');
            li.id = 'li_' + i;

            var input = _e('input');
            input.setAttribute('id', 'j' + i);
            input.className = 'form-control';
            input.setAttribute('style', 'display: inline; width: 400px');
            input.setAttribute('type', 'text');
            input.placeholder = 'Jawaban';
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            input = _e('input');
            input.setAttribute('id', 'n' + i);
            input.className = 'form-control';
            input.setAttribute('style', 'display: inline; width: 100px');
            input.type = 'number';
            input.placeholder = 'Nilai';
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            var button = _e('button');
            button.setAttribute('id', 's' + i);
            // ----------------
            button.setAttribute('class', 'btn btn-primary');
            button.setAttribute(
                'onblur', "kuesioner.guttman.simpanPilihan('" + i + "')"
            );
            button.innerHTML = "Simpan";
            li.appendChild(button);
            li.appendChild(document.createTextNode(' '));

            var del = document.createElement('button');
            del.setAttribute('id', 'd' + i);
            del.setAttribute('class', 'btn btn-danger');
            del.setAttribute(
                'onclick', "kuesioner.likert.hapusPilihanIni('" + i + "')"
            );
            var delIcon = document.createElement('span');
            delIcon.setAttribute('class', 'glyphicon glyphicon-remove');
            delIcon.setAttribute('aria-hidden', 'true');
            del.appendChild(delIcon);
            del.appendChild(document.createTextNode(' Abaikan'));
            li.appendChild(del);

            box.appendChild(li);

            var next = Number($('#pilihanJawaban').attr('next')) + 1;
            $('#pilihanJawaban').attr('next', next);
            break;
          }
        }
      }, // bagian akhir dari kuesioner.guttman.tambahPilihan
      'tambahPertanyaan': function () {
        var ul = _('listPertanyaan');
        var x = 1;
        for (x = 1; x < 999; x++) {
          if (_('li_' + x) === null) {
            var li = _e('li');
            li.id = 'li_' + x;
            li.setAttribute('style', 'margin-bottom: 30px');

            li.setAttribute('style', 'margin-bottom: 30px');
            // buat angka untuk nomor soal
            var angka = _e('span');
            angka.className = 'angka';
            angka.setAttribute('style', 'top: -34px; position: relative');
            // angka.innerHTML = '#1';
            li.appendChild(angka);

            var i = _e('textarea');
            i.id = 'p_' + x;
            i.type = 'text';
            i.placeholder = 'Pertanyaan/Pernyataan ... '
            i.setAttribute('onblur', 'kuesioner.guttman.simpanPertanyaan(' + x + ')'); // hati2
            i.className = 'form-control';
            i.setAttribute(
              'style', 'display: inline;margin-bottom: 5px; width: 680px; resize: vertical'
            );
            li.appendChild(i);
            li.appendChild(document.createTextNode(' '));
            li.appendChild(_e('br'));

            // buatkan isian untuk nilai dan jawaban guttman
            // yang pilihan jawaban a
            i = _e('input');
            i.id = 'ja_' + x;
            i.type = 'text';
            i.className = 'form-control';
            i.placeholder = 'Pilihan Jawaban A';
            i.setAttribute('style', 'width: 200px; display: inline');
            i.setAttribute('onblur', 'kuesioner.guttman.simpanPertanyaan(' + x + ')');
            li.appendChild(i);

            li.appendChild(document.createTextNode(' '));

            i = _e('input')
            i.id = 'jna_'+ x;
            i.type = 'number';
            i.className = 'form-control';
            i.placeholder = 'Nilai';
            i.setAttribute('style', 'width: 100px; display: inline');
            i.setAttribute('onblur', 'kuesioner.guttman.simpanPertanyaan(' + x + ')');
            li.appendChild(i);
            li.appendChild(document.createTextNode(' '));

            // yang pilihan jawaban b
            i = _e('input');
            i.id = 'jb_' + x;
            i.type = 'text';
            i.className = 'form-control';
            i.placeholder = 'Pilihan Jawaban B';
            i.setAttribute('style', 'width: 200px; display: inline');
            i.setAttribute('onblur', 'kuesioner.guttman.simpanPertanyaan(' + x + ')');
            li.appendChild(i);
            li.appendChild(document.createTextNode(' '));

            i = _e('input')
            i.id = 'jnb_' + x;
            i.type = 'number';
            i.className = 'form-control';
            i.placeholder = 'Nilai';
            i.setAttribute('style', 'width: 100px; display: inline');
            i.setAttribute('onblur', 'kuesioner.guttman.simpanPertanyaan(' + x + ')');
            li.appendChild(i);
            li.appendChild(document.createTextNode(' '));

            // tombol hapus disimpan dibawah, setelah input
            var b = _e('button');
            b.className = 'btn btn-danger';
            b.id = 'h_' + x;
            b.setAttribute('onclick', 'kuesioner.guttman.hapusPertanyaanTersimpan(' + x + ')');
            b.innerHTML = 'Hapus';
            b.setAttribute('style', 'display: none;width: 85px;');
            li.appendChild(b);

            ul.appendChild(li);
            break;
          }
        }
        // perbaharui nomor pertanyaan secara otomatis
        var a = $('.angka');
        var x;
        var y = 2;
        for (x = 1; x < a.length; x++) {
          a[x].innerHTML = '#' + y;
          y++;
        }
      },
      'simpanPertanyaan': function(id) { // kuesioner.guttman.simpanPertanyaan
        var last_insert_id = _('li_' + id).getAttribute('last_insert_id') || 0;
        // lakukan permintaan ajax
        var r = $.ajax({
          url: '../ajax/simpanGuttmanPertanyaan.php',
          method: 'post',
          data: {
            'id_kuesioner': _('listPertanyaan').getAttribute('id_kuesioner'),
            'pertanyaan': _('p_' + id).value,
            'last_insert_id': last_insert_id,
            'jawaban_a': _('ja_' + id).value,
            'jawaban_b': _('jb_' + id).value,
            'nilai_a': _('jna_' + id).value,
            'nilai_b': _('jnb_' + id).value,
          }
        });
        r.done(function(data) {
          var j = $.parseJSON(data);
          if (id != 1) {
            // tampilkan tombol hapus begitu data tersimpan
            _('h_' + id).setAttribute('style', 'display: inline');
            // tampilkan tombol ke tahapan selanjutnya
            _('next').setAttribute('style', 'float: right;')
          }
          _('li_' + id).setAttribute('last_insert_id', j.last_insert_id);

        });
      },
      'hapusPertanyaanTersimpan': function(id) {  // kuesioner.guttman.hapusPertanyaanTersimpan
        $('#dialogHapus').dialog({
          buttons: {
            'Ya': function() {
              // lakukan pemrosesan pengiriman data menggunakan AJAX
              var a = $.ajax({
                url: '../ajax/hapusPertanyaanTersimpan.php',
                method: 'post',
                data: {id: _('li_' + id).getAttribute('last_insert_id')}
              });
              a.done(function(data) {
                if (data == 'ok') {
                  var e = _('li_' + id);
                  e.parentNode.removeChild(e);
                  $("#dialogHapus").dialog("close");
                  // perbaharui nomor pertanyaan secara otomatis
                  var a = $('.angka');
                  var x;
                  var y = 2;
                  for (x = 1; x < a.length; x++) {
                    a[x].innerHTML = '#' + y;
                    y++;
                  }
                }
              });
            },
            'Tidak': function() {
              $(this).dialog("close");
            }
          }
        });
        $("#dialogHapus").dialog("open");
      },
      'simpanPilihan': function(id) { // kuesioner.guttman.simpanPilihan
        // ketika data masih kosong, beri notifikasi
        if (kosong($("#j" + id)) === true || kosong($("#n" + id)) === true) {
          $("#dialogInfo").dialog("open");
          alert("data kosong?");
          return false;
        }
        // lakukan permintaan ajax untuk menyimpan data ke basis data
        var a = $.ajax({
          url: '../ajax/simpan_guttman_pilihan_jawaban.php',
          method: 'post',
          data: {
            jawaban: $('#j' + id).val(),
            nilai: $('#n' + id).val(),
            q_guttman_id: $('#pilihanJawaban').attr('q_guttman_id'),
          }
        });
        a.done(function(data) {
          var json = $.parseJSON(data);
          if (json.result == "ok") {
            // simpan last_id pada li_id juga q_guttman_id
            var li = _('li_' + id);
            li.setAttribute('last_id', json.last_id);
            li.setAttribute('q_liker_id', json.q_guttman_id);
            // --------------------
            document.getElementById('j' + id).setAttribute(
                'disabled', 'disabled'
            );
            document.getElementById('n' + id).setAttribute(
                'disabled', 'disabled'
            );

            // hapus tombol simpan untuk kemudian di ganti dengan
            // tombol edit
            var s = document.getElementById('s' + id);
            s.parentNode.removeChild(s);

            // cek jika tombol abaikan ada, maka hapus juga
            if (document.getElementById('d' + id)) {
                var d = document.getElementById('d' + id);
                d.parentNode.removeChild(d);
            }

            // selanjut adalah buat tombol edit dan append ke list
            li = document.getElementById('li_' + id);

            var button = document.createElement('button');
            button.setAttribute('id', 'e' + id);
            button.setAttribute('class', 'btn btn-success');
            button.setAttribute(
                'onclick',
                "kuesioner.guttman.editPilihanTersimpan('" + id + "')"
            );
            button.innerHTML = "Edit";
            li.appendChild(button);
            li.appendChild(document.createTextNode(' '));


            // lalu buat del button, tapi bukan untuk id 1 dan 2
            if (id >= 3) {
                var del = document.createElement('button');
                del.setAttribute('id', 'd' + id);
                del.setAttribute('class', 'btn btn-danger');
                del.setAttribute(
                    "onclick",
                    "kuesioner.guttman.hapusPilihanTersimpan('" + id + "')"
                );
                del.appendChild(document.createTextNode('Hapus'));
                li.appendChild(del);
            }

            // otomatis menampilkan tombol selanjutnya
            // !hang_on
            $("#selanjutnya").attr(
                "style",
                "display: block;margin-top: 10px;margin-left: 5px"
            );
            kuesioner.guttman.tambahPilihan();
          }
        });
      }, // bagian akhir dari kuesioner.guttman.simpanPilihan
    }, // bagian akhir objek kuesioner.guttman
    'rating': {
      'tambahPertanyaan': function() {
        var ul = _('listPertanyaan');
        var x = 1;
        for (x = 1; x < 999; x++) {
          if (_('li_' + x) === null) {
            var li = _e('li');
            li.id = 'li_' + x;
            li.setAttribute('style', 'margin-bottom: 30px');

            // buatkan untuk nomor pertanyaan
            var number = _e('span');
            number.className = 'angka';
            number.setAttribute('style', 'position: relative; top: -34px;')
            number.id = 'num_1';
            // number.innerHTML = '#1';
            li.appendChild(number);

            var i = _e('textarea');
            i.id = 'p_' + x;
            i.type = 'text';
            i.placeholder = 'Pertanyaan/Pernyataan ... '
            i.setAttribute('onblur', 'kuesioner.rating.simpanPertanyaan(' + x + ')'); // hati2
            i.className = 'form-control';
            i.setAttribute(
              'style', 'display: inline;margin-bottom: 5px; width: 680px; resize: vertical'
            );
            li.appendChild(i);
            li.appendChild(document.createTextNode(' '));
            li.appendChild(_e('br'));

            // tombol hapus disimpan dibawah, setelah input
            var b = _e('button');
            b.className = 'btn btn-danger';
            b.id = 'h_' + x;
            b.setAttribute('onclick', 'kuesioner.rating.hapusPertanyaanTersimpan(' + x + ')');
            b.innerHTML = 'Hapus';
            b.setAttribute('style', 'display: none;width: 85px;');
            li.appendChild(b);

            ul.appendChild(li);
            break;
          }
        }
        // perbaharui nomor
        var a = $('.angka');
        var x;
        var y = 1;
        for (x = 0; x < a.length; x++) {
          a[x].innerHTML = '#' + y;
          y++;
        }
      },
      'tampilkanFormInputPertanyaan': function() {
        // kuesioner.rating.tampilkanFormInputPertanyaan
        // tampilkan bentuk isian jawaban
        /*********************
         * skala rating
         ********************/

        // hanya proses jika semua data telah lengkap
        if (Number(_('nilai_min').value) >= Number(_('nilai_max').value)) {
          alert('Nilai minimal tidak boleh lebih besar atau sama dengan nilai maksimal, juga kosong');
          return false;
        } else if (kosong($('#nilai_min')) == true ||
                   kosong($('#nilai_max')) == true) {
                     $('#dialogInfo').dialog('open');
                     return false;
        }

        var id_kuesioner = _('pilihanJawaban').getAttribute('id_kuesioner');
        var box = _('body2');
        box.innerHTML = ""; // kosongkan

        // perbaharui tampilan HTML
        // var i_k = $("#"); // ini mau di perbarui nanti bagian id_kuesioner

        var H = _e('h2');
        H.innerHTML = "Silahkan buat pertanyaan/pernyataan Anda (Skala Rating)";
        box.appendChild(H);

        // kita pakai daftar tak berurut untuk kemudahan
        var ul = _e('ul');
        ul.id = 'listPertanyaan';
        ul.setAttribute('next', '1');
        ul.setAttribute('id_kuesioner', id_kuesioner);

        var li = _e('li');
        li.id = 'li_1';
        li.setAttribute('style', 'margin-bottom: 30px');

        // buatkan untuk nomor pertanyaan
        var number = _e('span');
        number.className = 'angka';
        number.setAttribute('style', 'position: relative; top: -34px;')
        number.id = 'num_1';
        number.innerHTML = '#1';
        li.appendChild(number);

        var i = _e('textarea');
        i.id = 'p_1';
        i.type = 'text';
        i.placeholder = 'Pertanyaan/Pernyataan ... '
        i.setAttribute('onblur', 'kuesioner.rating.simpanPertanyaan(1)'); // hati2
        i.className = 'form-control';
        i.setAttribute(
          'style', 'display: inline;margin-bottom: 5px; width: 680px; resize: vertical'
        );
        li.appendChild(i);
        li.appendChild(document.createTextNode(' '));
        li.appendChild(_e('br'));

        // tombol hapus disimpan dibawah, setelah input
        var b = _e('button');
        b.className = 'btn btn-danger';
        b.id = 'h_1';
        b.setAttribute('onclick', 'kuesioner.rating.hapusPertanyaanTersimpan(1)');
        b.innerHTML = 'Hapus';
        b.setAttribute('style', 'display: none;width: 85px;');
        li.appendChild(b);

        ul.appendChild(li);

        // tampilkan tombol tambah pertanyaan
        var div = _e('div');
        b = _e('button');
        b.className = 'btn btn-default';
        b.setAttribute('onclick', 'kuesioner.rating.tambahPertanyaan()');
        b.innerHTML = 'Tambah pertanyaan';
        div.appendChild(b);

        box.appendChild(ul);
        box.appendChild(div);

        var next = _e('button');
        next.className = "btn btn-lg btn-primary";
        next.id = "next";
        next.innerHTML = "Selanjutnya";
        next.setAttribute('onclick', 'kuesioner.tampilkanFormDataIsianResponden()');
        next.setAttribute("style", "float:right;display:none");
        box.appendChild(next);
      },
      'hapusPertanyaanTersimpan': function(id) { // kuesioner.rating.hapusPertanyaanTersimpan
        $('#dialogHapus').dialog({
          buttons: {
            'Ya': function() {
              // lakukan penghapusan data di server dengan metode ajax
              var a = $.ajax({
                url: '../ajax/hapusPertanyaanTersimpan.php',
                method: 'post',
                data: {id: _('li_' + id).getAttribute('last_insert_id')}
              });
              a.done(function(data) {
                if (data == 'ok') {
                  var e = _('li_' + id);
                  e.parentNode.removeChild(e);
                  $("#dialogHapus").dialog('close');
                  // perbaharui nomor pertanyaan
                  var a = $('.angka');
                  var x;
                  var y = 1;
                  for (x = 0; x < a.length; x++) {
                    a[x].innerHTML = '#' + y;
                    y++;
                  }
                }
              });
            },
            'Tidak': function() {
              $(this).dialog('close');
            }
          }
        });
        $('#dialogHapus').dialog('open');
      },
      'simpanPilihanJawaban': function(ket) {
        // objek kuesioner.rating.simpanPilihanJawaban
        if (ket === 'min') {
          if (kosong($('#nilai_min')) === true) {
            // alert('Nilai min tidak boleh kosong');
            $("#dialogInfo").dialog('open');
            return false;
          }
          if (kosong($('#nilai_max')) === true) {
            return false;
          } else if (Number(_('nilai_min').value) > Number(_('nilai_max').value)) {
            alert("Nilai minimal tidak boleh lebih besar daripada nilai maksimal");
            return false;
          }
        } else if (ket === 'max') {
          if (kosong($('#nilai_max')) === true) {
            // alert('Nilai max tidak boleh kosong');
            $('#dialogInfo').dialog('open');
            return false;
          } else if (Number(_('nilai_max').value) < Number(_('nilai_min').value)) {
            alert('Nilai maksimal tidak boleh lebih kecil daripada nilai minimal');
            return false;
          }
        }
        // nilai min dan max tidak boleh sama
        if (Number(_('nilai_min').value) === Number(_('nilai_max').value)) {
          alert('Nilai minimal dan maksimal tidak boleh sama');
          return false;
        }
        // lakukan pengiriman data ke server menggunakan ajax
        // hanya jika nilai min dan max telah di input
        if (!kosong($('#nilai_min')) == true && !kosong($('#nilai_max')) == true) {
          var a = $.ajax({
            url: '../ajax/simpanRatingPilihanJawaban.php',
            method: 'post',
            data: {
              'nilai_min': _('nilai_min').value,
              'nilai_max': _('nilai_max').value,
              'last_insert_id': _('li_1').getAttribute('last_insert_id') || 0,
              'kuesioner_id': _('pilihanJawaban').getAttribute('id_kuesioner'),
            }
          });
          a.done(function(data) {
            console.log("Kelola data yang telah diterima dari server dalam bentuk JSON");
            var j = $.parseJSON(data);
            _('li_1').setAttribute('last_insert_id', j.last_insert_id);
          });
        }
      },
      'simpanPertanyaan': function (id) {
        var last_insert_id = _('li_' + id).getAttribute('last_insert_id') || 0;
        // lakukan pengiriman data ke server dengan ajax
        var a = $.ajax({
          url: '../ajax/simpanRatingPertanyaan.php',
          method: 'post',
          data: {
            'id_kuesioner': _('listPertanyaan').getAttribute('id_kuesioner'),
            'pertanyaan': _('p_' + id).value,
            'last_insert_id': last_insert_id,
          }
        });
        a.done(function(data) {
          var j = $.parseJSON(data);
          if (id != 1) {
            _('h_' + id).setAttribute('style', 'display: inline;position:relative;left:45px');
            _('next').setAttribute('style', 'float: right');
          }
          _('li_' + id).setAttribute('last_insert_id', j.last_insert_id);
        });
      },
    },
    'semantic': {
      'tambahPertanyaan': function() {
        var ul = _('listPertanyaan');
        var x = 1;
        for (x = 1; x < 999; x++) {
          if (_('li_' + x) === null) {
            var li = _e('li');
            li.id = 'li_' + x;

            // buat angka untuk nomor soal
            var angka = _e('span');
            angka.className = 'angka';
            angka.setAttribute(
              'style',
              'display: block;text-align: center;width: 50px;margin-bottom: 10px;'
            );
            // angka.innerHTML = '#1';
            li.appendChild(angka);

            var input = _e('input');
            input.id = 'p_' + x;
            input.placeholder = 'Pertanyaan/Pernyataan Anda';
            input.type = 'text';
            input.className = 'form-control';
            input.setAttribute('onblur', "kuesioner.semantic.simpanPertanyaan(" + x + ")");
            input.setAttribute('style','margin-bottom:5px');
            li.appendChild(input);

            input = _e('input');
            input.id = 'label_min_' + x;
            input.className = 'form-control';
            input.type = 'text';
            input.placeholder = 'Pilihan Jawaban A';
            input.setAttribute('style', 'display: inline; width: 200px');
            input.setAttribute('onblur', "kuesioner.semantic.simpanPertanyaan(" + x + ")");
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            input = _e('input');
            input.id = 'nilai_min_' + x;
            input.className = 'form-control';
            input.type = 'number';
            input.placeholder = 'Nilai A';
            input.setAttribute('style', 'display: inline; width: 100px');
            input.setAttribute('onblur', "kuesioner.semantic.simpanPertanyaan(" + x + ")");
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            input = _e('input');
            input.id = 'label_max_' + x;
            input.className = 'form-control';
            input.type = 'text';
            input.placeholder = 'Pilihan Jawaban B';
            input.setAttribute('style', 'display: inline; width: 200px');
            input.setAttribute('onblur', "kuesioner.semantic.simpanPertanyaan(" + x + ")");
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            input = _e('input');
            input.id = 'nilai_max_' + x;
            input.className = 'form-control';
            input.type = 'number';
            input.placeholder = 'Nilai B';
            input.setAttribute('style', 'display: inline; width: 100px');
            input.setAttribute('onblur', "kuesioner.semantic.simpanPertanyaan(" + x + ")");
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            // tombol hapus disimpan dibawah, setelah input
            var b = _e('button');
            b.className = 'btn btn-danger';
            b.id = 'h_' + x;
            b.setAttribute('onclick', 'kuesioner.semantic.hapusPertanyaanTersimpan(' + x + ')');
            b.innerHTML = 'Hapus';
            b.setAttribute('style', 'display: inline;width: 85px;');
            li.appendChild(b);

            // update yang di atas
            ul.appendChild(li);
            break;
          }
        }
        // perbaharui nomor pertanyaan
        var a = $('.angka');
        var x;
        var y = 1;
        for (x = 0; x < a.length; x++) {
          a[x].innerHTML = '#' + y;
          y++;
        }
      },
      'simpanPertanyaan': function(id) {
        // semua isian data harus terisi
        if (kosong($('#p_' + id)) === true) {
          return false;
        }
        if (kosong($('#label_min_' + id)) === true) {
          return false;
        }
        if (kosong($('#nilai_min_' + id)) === true) {
          return false;
        }
        if (kosong($('#label_max_' + id)) === true) {
          return false;
        }
        if (kosong($('#nilai_max_' + id)) === true) {
          return false;
        }
        if (Number(_('nilai_min_' + id).value) >= Number(_('nilai_max_' + id).value)) {
          alert("Nilai A tidak boleh lebih besar atau sama dengan Nilai B");
          return false;
        }
        // jika telah lolos dari seleksi di atas, maka lakukan
        // penyimpanan data ke server dengan menggunakan ajax
        var a = $.ajax({
          url: '../ajax/simpanSemanticPertanyaan.php',
          method: 'post',
          data: {
            'pertanyaan': $('#p_' + id).val(),
            'id_kuesioner': $('#listPertanyaan').attr('id_kuesioner'),
            'last_insert_id': $('#li_' + id).attr('last_insert_id') || 0,
            'label_min': $('#label_min_' + id).val(),
            'label_max': $('#label_max_' + id).val(),
            'nilai_min': $('#nilai_min_' + id).val(),
            'nilai_max': $('#nilai_max_' + id).val(),
            'q_semantic_id': $('#listPertanyaan').attr('q_semantic_id'),
            'last_semantic_id': $('#li_' + id).attr('last_semantic_id')
          }
        });
        a.done(function(data) {
          var j = $.parseJSON(data);
          console.log('Apakah data telah tersimpan?');
          _('li_' + id).setAttribute('last_semantic_id', j.last_semantic_id);
          _('li_' + id).setAttribute('last_insert_id', j.last_insert_id);
          _('body2').setAttribute('status', 'ok');
          _('selanjutnya').setAttribute('style','margin-top: 10px;display:block');
          if (id != 1) {
            _('h_' + id).setAttribute('style', 'display:inline');
          }
        });
      },
      'hapusPertanyaanTersimpan': function(id) {
        $('#dialogHapus').dialog({
          buttons: {
            'Ya': function() {
              // lakukan penghapusan data di server dengan metode ajax
              var a = $.ajax({
                url: '../ajax/hapusPertanyaanTersimpan.php',
                method: 'post',
                data: {id: _('li_' + id).getAttribute('last_insert_id')}
              });
              a.done(function(data) {
                if (data == 'ok') {
                  var e = _('li_' + id);
                  e.parentNode.removeChild(e);
                  $("#dialogHapus").dialog('close');

                  // perbaharui nomor pertanyaan
                  var a = $('.angka');
                  var x;
                  var y = 1;
                  for (x = 0; x < a.length; x++) {
                    a[x].innerHTML = '#' + y;
                    y++;
                  }
                }
              });
            },
            'Tidak': function() {
              $(this).dialog('close');
            }
          }
        });
        $('#dialogHapus').dialog('open');
      }
    },
    'simpanJudul' : function() {
      // judul kuesioner tidak boleh kosong
      if (kosong($("#judul")) === true) {
        $("#dialogInfo").dialog({
          show: {
            effect: "bounce",
            duration: 1000,
          },
          hide: {
            effect: "drop",
            duration: 1000,
          }
        });
        $("#dialogInfo").dialog("open");
        return false;
      }
      // lakukan permintaan ajax ke server
      var req = $.ajax({
          url: '../ajax/buat_kuesioner.php',
          method: 'post',
          data: {
              judul: $('#judul').val(),
              keterangan: $('#keterangan').val(),
              skala: $('#skala').val(),
              step: 'judul',
          }
      });
      req.done(function(data) {
          var j = $.parseJSON(data);

          // kita switch disini berdasarkan jenis_skala
          /*************************\
           * skala likert
          \* ***********************/
          if (j.jenis_skala === "likert") {
              var box = _('body2');
              box.innerHTML = ""; // kosongkan halaman untuk tahap 2
              var H = _e('h4');
              H.innerHTML = "Input pilihan jawaban yang Anda inginkan";
              box.appendChild(H);

              var div = _e('div');
              div.id = "pilihanJawaban";
              div.setAttribute('next', '2');
              div.setAttribute('q_liker_id', j.last_id_skala);
              div.setAttribute('id_kuesioner', j.id_kuesioner);

              var ul = _e('ul');
              ul.id = "listJawaban";

              var li = _e('li');
              li.id = "li_1";

              var input = _e('input');
              input.id = "j1";
              input.className = "form-control";
              input.type = "text";
              input.placeholder = "Jawaban";
              input.setAttribute('style', 'display:inline;width:400px');
              li.appendChild(input);
              li.appendChild(document.createTextNode(' '));

              input = _e('input');
              input.id = "n1";
              input.className = "form-control";
              input.type = "number";
              input.placeholder = "Nilai";
              input.setAttribute('style', 'display:inline;width:100px');
              li.appendChild(input);
              li.appendChild(document.createTextNode(' '));

              var button = _e('button');
              button.id = "s1";
              button.className = "btn btn-primary";
              button.setAttribute("style", "display:inline");
              button.setAttribute(
                  "onclick", "kuesioner.likert.simpanPilihan(1)"
              );
              button.innerHTML = "Simpan";
              li.appendChild(button);

              ul.appendChild(li);

              div.appendChild(ul);

              box.appendChild(div);

              button = _e('button');
              button.className = "btn btn-default";
              button.setAttribute(
                  "style",
                  "margin-top: 10px; margin-left: 5px"
              );
              button.setAttribute(
                  "onclick", "kuesioner.likert.tambahPilihan()"
              );
              button.innerHTML = "Tambah Pilihan Jawaban";

              box.appendChild(button);
              box.appendChild(_e('br'));

              button = _e('button');
              button.className = "btn btn-lg btn-primary";
              button.setAttribute(
                  "style",
                  "margin-top: 10px;display: none"
              );
              button.setAttribute(
                  "onclick", "kuesioner.tampilkanFormInputPertanyaan()"
              );
              button.innerHTML = "Selanjutnya";
              button.id = "selanjutnya";

              box.appendChild(button);

              $("#j1").focus();
          } else if (j.jenis_skala === 'guttman') {
            /*******************************
             * skala guttman
             *******************************/
            // tampilkan bentuk isian jawaban
            var box = _('body2');
            box.innerHTML = ""; // kosongkan

            // perbaharui tampilan HTML
            // var i_k = $("#"); // ini mau di perbarui nanti bagian id_kuesioner

            var H = _e('h2');
            H.innerHTML = "Silahkan buat pertanyaan/pernyataan Anda";
            box.appendChild(H);

            // kita pakai daftar tak berurut untuk kemudahan
            var ul = _e('ul');
            ul.id = 'listPertanyaan';
            ul.setAttribute('next', '1');
            ul.setAttribute('id_kuesioner', j.id_kuesioner);

            var li = _e('li');
            li.id = 'li_1';
            li.setAttribute('style', 'margin-bottom: 30px');
            // buat angka untuk nomor soal
            var angka = _e('span');
            angka.className = 'angka';
            angka.setAttribute('style', 'top: -34px; position: relative');
            angka.innerHTML = '#1';
            li.appendChild(angka);
            var i = _e('textarea');
            i.id = 'p_1';
            i.type = 'text';
            i.placeholder = 'Pertanyaan/Pernyataan ... '
            i.setAttribute('onblur', 'kuesioner.guttman.simpanPertanyaan(1)'); // hati2
            i.className = 'form-control';
            i.setAttribute(
              'style', 'display: inline;margin-bottom: 5px; width: 680px; resize: vertical'
            );
            li.appendChild(i);
            li.appendChild(document.createTextNode(' '));
            li.appendChild(_e('br'));

            // buatkan isian untuk nilai dan jawaban guttman
            // yang pilihan jawaban a
            i = _e('input');
            i.id = 'ja_1';
            i.type = 'text';
            i.className = 'form-control';
            i.placeholder = 'Pilihan Jawaban A';
            i.setAttribute('style', 'width: 200px; display: inline');
            i.setAttribute('onblur', 'kuesioner.guttman.simpanPertanyaan(1)');
            li.appendChild(i);
            li.appendChild(document.createTextNode(' '));

            i = _e('input')
            i.id = 'jna_1';
            i.type = 'number';
            i.className = 'form-control';
            i.placeholder = 'Nilai';
            i.setAttribute('style', 'width: 100px; display: inline');
            i.setAttribute('onblur', 'kuesioner.guttman.simpanPertanyaan(1)');
            li.appendChild(i);
            li.appendChild(document.createTextNode(' '));

            // yang pilihan jawaban b
            i = _e('input');
            i.id = 'jb_1';
            i.type = 'text';
            i.className = 'form-control';
            i.placeholder = 'Pilihan Jawaban B';
            i.setAttribute('style', 'width: 200px; display: inline');
            i.setAttribute('onblur', 'kuesioner.guttman.simpanPertanyaan(1)');
            li.appendChild(i);
            li.appendChild(document.createTextNode(' '));

            i = _e('input')
            i.id = 'jnb_1';
            i.type = 'number';
            i.className = 'form-control';
            i.placeholder = 'Nilai';
            i.setAttribute('style', 'width: 100px; display: inline');
            i.setAttribute('onblur', 'kuesioner.guttman.simpanPertanyaan(1)');
            li.appendChild(i);
            li.appendChild(document.createTextNode(' '));

            // tombol hapus disimpan dibawah, setelah input
            var b = _e('button');
            b.className = 'btn btn-danger';
            b.id = 'h_1';
            b.setAttribute('onclick', 'kuesioner.guttman.hapusPertanyaanTersimpan(1)');
            b.innerHTML = 'Hapus';
            b.setAttribute('style', 'display: none;width: 85px;');
            li.appendChild(b);

            ul.appendChild(li);

            // tampilkan tombol tambah pertanyaan
            var div = _e('div');
            b = _e('button');
            b.className = 'btn btn-default';
            b.setAttribute('onclick', 'kuesioner.guttman.tambahPertanyaan()');
            b.innerHTML = 'Tambah pertanyaan';
            div.appendChild(b);

            box.appendChild(ul);
            box.appendChild(div);

            var next = _e('button');
            next.className = "btn btn-lg btn-primary";
            next.id = "next";
            next.innerHTML = "Selanjutnya";
            next.setAttribute('onclick', 'kuesioner.tampilkanFormDataIsianResponden()');
            next.setAttribute("style", "float:right;display:none");
            box.appendChild(next);
          } else if (j.jenis_skala == 'rating') {
            // tampilkan halaman untuk mengisi data pilihan jawaban
            var box = _('body2');
            box.innerHTML = '';

            var H = _e('h4');
            H.innerHTML = 'Input pilihan jawaban yang Anda inginkan (Skala Rating)';
            box.appendChild(H);

            var div = _e('div');
            div.id = 'pilihanJawaban';
            div.setAttribute('q_liker_id', j.last_id_skala);
            div.setAttribute('id_kuesioner', j.id_kuesioner);

            var ul = _e('ul');
            ul.id = 'listJawaban';

            var li = _e('li');
            li.id = 'li_1';


            var input = _e('input');
            input.id = 'nilai_min';
            input.className = 'form-control';
            input.type = 'number';
            input.setAttribute('min','1');
            input.placeholder = 'Nilai rating minimum';
            input.setAttribute('style', 'display: inline; width: 400px');
            input.setAttribute('onblur', "kuesioner.rating.simpanPilihanJawaban('min')");
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            input = _e('input');
            input.id = 'nilai_max';
            input.className = 'form-control';
            input.type = 'number';
            input.setAttribute('min', '2');
            input.placeholder = 'Nilai rating maksimum';
            input.setAttribute('style', 'display: inline; width: 400px');
            input.setAttribute('onblur', "kuesioner.rating.simpanPilihanJawaban('max')");
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            ul.appendChild(li);

            div.appendChild(ul);

            box.appendChild(div);

            var button = _e('button');
            button.className = "btn btn-lg btn-primary";
            button.setAttribute(
                "style",
                "margin-top: 10px"
            );
            button.setAttribute(
                "onclick", "kuesioner.rating.tampilkanFormInputPertanyaan()"
            );
            button.innerHTML = "Selanjutnya";
            button.id = "selanjutnya";

            box.appendChild(button);

            $("#j1").focus();
          } else if (j.jenis_skala == 'semantic') {
            var box = _('body2');
            box.innerHTML = '';

            var H = _e('h4');
            H.innerHTML = 'Input pilihan jawaban yang Anda inginkan (Skala Semantic)';
            box.appendChild(H);

            var div = _e('div');

            var ul = _e('ul');
            ul.id = 'listPertanyaan';
            ul.setAttribute('q_semantic_id', j.id_skala_terakhir);
            ul.setAttribute('id_kuesioner', j.id_kuesioner);


            var li = _e('li');
            li.id = 'li_1';

            // buat angka untuk nomor soal
            var angka = _e('span');
            angka.className = 'angka';
            angka.setAttribute(
              'style',
              'display: block;text-align: center;width: 50px;margin-bottom: 10px;'
            );
            angka.innerHTML = '#1';
            li.appendChild(angka);

            var input = _e('input');
            input.id = 'p_1';
            input.placeholder = 'Pertanyaan/Pernyataan Anda';
            input.type = 'text';
            input.className = 'form-control';
            input.setAttribute('onblur', "kuesioner.semantic.simpanPertanyaan(1)");
            input.setAttribute('style','margin-bottom:5px');
            li.appendChild(input);

            input = _e('input');
            input.id = 'label_min_1';
            input.className = 'form-control';
            input.type = 'text';
            input.placeholder = 'Pilihan Jawaban A';
            input.setAttribute('style', 'display: inline; width: 200px');
            input.setAttribute('onblur', "kuesioner.semantic.simpanPertanyaan(1)");
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            input = _e('input');
            input.id = 'nilai_min_1';
            input.className = 'form-control';
            input.type = 'number';
            input.placeholder = 'Nilai A';
            input.setAttribute('style', 'display: inline; width: 100px');
            input.setAttribute('onblur', "kuesioner.semantic.simpanPertanyaan(1)");
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            input = _e('input');
            input.id = 'label_max_1';
            input.className = 'form-control';
            input.type = 'text';
            input.placeholder = 'Pilihan Jawaban B';
            input.setAttribute('style', 'display: inline; width: 200px');
            input.setAttribute('onblur', "kuesioner.semantic.simpanPertanyaan(1)");
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            input = _e('input');
            input.id = 'nilai_max_1';
            input.className = 'form-control';
            input.type = 'number';
            input.placeholder = 'Nilai B';
            input.setAttribute('style', 'display: inline; width: 100px');
            input.setAttribute('onblur', "kuesioner.semantic.simpanPertanyaan(1)");
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            // tombol hapus disimpan dibawah, setelah input
            var b = _e('button');
            b.className = 'btn btn-danger';
            b.id = 'h_1';
            b.setAttribute('onclick', 'kuesioner.semantic.hapusPertanyaanTersimpan(1)');
            b.innerHTML = 'Hapus';
            b.setAttribute('style', 'display: none;width: 85px;');
            li.appendChild(b);

            // update yang di atas
            ul.appendChild(li);

            // tampilkan tombol tambah pertanyaan
            b = _e('button');
            b.className = 'btn btn-default';
            b.setAttribute('onclick', 'kuesioner.semantic.tambahPertanyaan()');
            b.innerHTML = 'Tambah pertanyaan';

            div.appendChild(ul);

            div.appendChild(b);

            box.appendChild(div);

            var button = _e('button');
            button.className = "btn btn-lg btn-primary";
            button.setAttribute(
                "style",
                "margin-top: 10px; display:none"
            );
            button.setAttribute(
                "onclick", "kuesioner.tampilkanFormDataIsianResponden()"
            );
            button.innerHTML = "Selanjutnya";
            button.id = "selanjutnya";

            box.appendChild(button);

            $("#j1").focus();
          }
          // $('#body2').html(data);
          $('html, body').animate({
              scrollTop: 0
          });
      });
    },
    'simpanPertanyaan': function(id) {
        var last_insert_id = _('li_' + id).getAttribute('last_insert_id') || 0;
        if (kosong($("#p_" + id)) == true) {
            $("#dialogInfo").dialog("open");
            return false;
        }
        var r = $.ajax({
            url: '../ajax/simpanPertanyaan.php',
            method: 'post',
            data: {
                'id_kuesioner': $('#listPertanyaan').attr('id_kuesioner'),
                'pertanyaan': $('#p_' + id).val(),
                'f_or_uf': $('input[name=f_uf' + id + ']:checked').val(),
                'last_insert_id': last_insert_id,
            }
        });
        r.done(function(data) {
            var j = $.parseJSON(data);
            if (j.terupdate) {

            }
            _('li_' + id).setAttribute('last_insert_id', j.last_insert_id);
            _('h_' + id).setAttribute('style', 'display:inline');
            _('next').setAttribute("style", 'display:block;float:right');
            console.log("Apakah data tersimpan?");
        });
    },
    'tampilkanPratinjauKuesioner' : function() {
      var url = _("listKostumisasiDataResponden").getAttribute("url");
      location.href = "pratinjau.php?k=" + url;
    },
    'tampilkanFormInputPertanyaan': function() {
        // lakukan pembaharuan data menggunakan ajax
        var r = $.ajax({
          url: '../ajax/balik_nilai_f_or_uf.php',
          method: 'post',
          data: {'q_liker_id': $("#pilihanJawaban").attr("q_liker_id")}
        });
        // perbaharui tampilan pada HTML
        var i_k = $('#pilihanJawaban').attr('id_kuesioner');
        var box = _('body2');
        box.innerHTML = "";

        var H = document.createElement('h2');
        H.innerHTML = "Silahkan buat pertanyaan/pernyataan Anda";
        box.appendChild(H);

        // kita akan pakai list
        var ul = _e('ul');
        ul.id = "listPertanyaan";
        ul.setAttribute('next', '1');
        ul.setAttribute('id_kuesioner', i_k);

        var li = _e('li');
        // buatkan untuk nomor pertanyaan
        var number = _e('span');
        number.className = 'angka';
        number.id = 'num_1';
        number.innerHTML = '#1';
        li.appendChild(number);

        li.id = "li_1";
        var i = _e('input');
        i.id = "p_1";
        i.type = "text";
        i.setAttribute('onblur', 'kuesioner.simpanPertanyaan(1)');
        i.placeholder = "Pertanyaan...";
        i.className = "form-control";
        i.setAttribute("style", "display:inline");
        li.appendChild(i);
        li.appendChild(document.createTextNode(' '));
        var b = _e('button');
        b.className = "btn btn-danger";
        b.id = 'h_1';
        b.setAttribute('onclick', 'kuesioner.simpanPertanyaan(1)');
        b.innerHTML = "Hapus";
        b.setAttribute('style', 'display:none');
        li.appendChild(b);
        li.appendChild(_e('br'));

        // hanya untuk likert f_or_uf
        var form = _e('form');
        form.id = 'myForm';
        i = _e('input');
        i.name = "f_uf1";
        i.type = "radio";
        i.value = "f";
        i.setAttribute('checked', 'true');
        i.setAttribute('onclick', 'kuesioner.simpanPertanyaan(1)');
        li.appendChild(i);
        li.appendChild(document.createTextNode(' Favorable '));
        i = _e('input');
        i.name = "f_uf1";
        i.type = "radio";
        i.value = "uf";
        i.setAttribute('onclick', 'kuesioner.simpanPertanyaan(1)');
        li.appendChild(i);
        li.appendChild(document.createTextNode(' Unfavorable'));

        ul.appendChild(li);

        var div = _e('div');
        b = _e('button');
        b.className = "btn btn-default";
        b.setAttribute('onclick', 'kuesioner.tambahPertanyaan()');
        b.innerHTML = "Tambah Pertanyaan";
        div.appendChild(b);

        box.appendChild(ul);
        box.appendChild(div);

        var next = _e('button');
        next.className = "btn btn-lg btn-primary";
        next.id = "next";
        next.innerHTML = "Selanjutnya";
        next.setAttribute('onclick', 'kuesioner.tampilkanFormDataIsianResponden()');
        next.setAttribute("style", "float:right;display:none");
        box.appendChild(next);
    },
    'tambahFormIsianDataResponden': function() {
        // pilih elemen daftar tidak berurut]
        var ul = _("listKostumisasiDataResponden");

        // buat daftar secara otomatis
        var x;
        for (x = 1; x < 99; x++) {
          if (document.getElementById("li_" + x) === null) {
            var li = _e('li');
            li.id = "li_" + x;

            var input = _e('input');
            input.id = "dr_" + x;
            input.type = "text";
            input.setAttribute(
                "onblur", "kuesioner.simpanKostumisasiDataResponden(" + x + ")"
            );
            input.className = "form-control";
            input.setAttribute("style", "width:400px;display:inline");
            input.placeholder = "keterangan";
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            // Buat select untuk pilihan kategori data yang terdiri atas
            // Text, Tanggal, Angka, Gender
            var select = _e("select");
            select.id = "sl_" + x;
            select.className = "form-control";
            select.setAttribute("style", "width:100px;display:inline");
            select.setAttribute(
                "onchange", "kuesioner.simpanKostumisasiDataResponden(" + x + ")"
            );

            // option untuk kategori "text"
            var option = _e("option");
            option.value = "text";
            option.innerHTML = "Teks";
            select.appendChild(option);

            // option untuk kategori "Tanggal"
            var option = _e("option");
            option.value = "tanggal";
            option.innerHTML = "Tanggal";
            select.appendChild(option);

            // option untuk kategori "Angka"
            option = _e("option");
            option.value = "angka";
            option.innerHTML = "Angka";
            select.appendChild(option);

            // option untuk kategori "Gender"
            option = _e("option");
            option.value = "gender";
            option.innerHTML = "Gender";
            select.appendChild(option);
            li.appendChild(select);
            li.appendChild(document.createTextNode(" "));

            // buat tombol hapusnya
            var hapus = _e("button");
            hapus.id = "d_" + x;
            hapus.innerHTML = "Hapus";
            hapus.className = "btn btn-danger";
            hapus.setAttribute(
                "onclick", "kuesioner.hapusKostumisasiDataResponden(" + x + ")"
            );
            hapus.setAttribute("style", "display:none");
            li.appendChild(hapus);

            ul.appendChild(li);
            break;
          }
        }
    },
    'tambahPertanyaan': function() {
        var ul = _('listPertanyaan');
        for (var x = 1; x < 999; x++) {
            // jika element belum ada, maka tambahkan
            if (document.getElementById('p_' + x) == null) {
                /*
                _('listPertanyaan').innerHTML += "<br>TambahData</br>";
                */

                var li = _e('li');

                // buatkan untuk nomor pertanyaan
                var number = _e('span');
                number.className = 'angka';
                number.id = 'num_' + x;
                // number.innerHTML = '#' + x;
                li.appendChild(number);

                li.id = "li_" + x;
                var i = _e('input');
                i.id = "p_" + x;
                i.type = "text";
                i.setAttribute(
                    'onblur', 'kuesioner.simpanPertanyaan(' + x + ')'
                );
                i.placeholder = "Pertanyaan...";
                i.className = "form-control";
                i.setAttribute("style", "display:inline");
                li.appendChild(i);
                li.appendChild(document.createTextNode(' '));
                var b = _e('button');
                b.className = "btn btn-danger";
                b.id = 'h_' + x;
                b.setAttribute(
                    'onclick', 'kuesioner.hapusPertanyaanTersimpan(' + x + ')'
                );
                b.innerHTML = "Hapus";
                b.setAttribute('style', 'display:none');
                li.appendChild(b);
                li.appendChild(_e('br'));
                var form = _e('form');
                form.id = 'myForm';
                var i = _e('input');
                i.type = "radio";
                i.name = "f_uf" + x;
                i.value = "f";
                i.setAttribute('checked', 'true');
                i.setAttribute('onclick', 'kuesioner.simpanPertanyaan(' + x + ')');
                li.appendChild(i);
                li.appendChild(document.createTextNode(' Favorable '));
                var i = _e('input');
                i.name = "f_uf" + x;
                i.type = "radio";
                i.value = "uf";
                i.setAttribute('onclick', 'kuesioner.simpanPertanyaan(' + x + ')');
                li.appendChild(i);
                li.appendChild(document.createTextNode(' Unfavorable'));

                ul.appendChild(li);

                var next = Number($('#listPertanyaan').attr('next')) + 1;
                $('#listPertanyaan').attr('next', next);
                break;
            }
        }
        // kita perbaharui dengan pengulangan berdasarkan class angka
        var a = $('.angka');
        var x;
        var y = 1;
        for (x = 0; x < a.length; x++) {
          a[x].innerHTML = '#'+ y;
          y++;
        }
        /*
        // lakukan pembaharuan terhadap nomor pertanyaan
        var x;
        var y = 1;
        for (x = 1; x < 9; x++) {
          console.log('Looping ke ............. ' + x);
          console.log('Nilai x = ' + x + ', dan y = ' + y );
          if (_('li_' + x)) {
            _('num_' + x).innerHTML = '#' + y;
            y++;
            console.log('x ditemukan')
            console.log('Nilai x = ' + x + ', dan y = ' + y );
          } else {
            console.log('x tidak ditemukan');
            console.log('Nilai x = ' + x + ', dan y = ' + y );
          }
        }
        */
    },
    'hapusPertanyaanTersimpan': function(id) {
        if (confirm("Yakin ingin menghapus pertanyaan ini?")) {
            var a = $.ajax({
                url: '../ajax/hapusPertanyaanTersimpan.php',
                method: 'post',
                data: {
                    'id': _('li_' + id).getAttribute('last_insert_id')
                },
            });
            a.done(function(data) {
                var li = _('li_' + id);
                li.parentNode.removeChild(li);
                // lakukan pembaharuan terhadap nomor pertanyaan
                var x;
                var y = 1;
                for (x = 1; x < 9; x++) {
                  console.log('Looping ke ............. ' + x);
                  console.log('Nilai x = ' + x + ', dan y = ' + y );
                  if (_('li_' + x)) {
                    _('num_' + x).innerHTML = '#' + y;
                    y++;
                    console.log('x ditemukan')
                    console.log('Nilai x = ' + x + ', dan y = ' + y );
                  } else {
                    console.log('x tidak ditemukan');
                    console.log('Nilai x = ' + x + ', dan y = ' + y );
                  }
                }
            });
        }
    },
    'tampilkanFormDataIsianResponden': function() {
        var box = _('body2');

        // simpan id kuesioner untuk digunakan pada tahap berikutnya
        var id_kuesioner = $("#listPertanyaan").attr("id_kuesioner");

        box.innerHTML = "";

        var H = _e('h2');
        H.innerHTML = "Masukkan data responden yang Anda perlukan";
        box.appendChild(H);

        var ul = _e('ul');
        ul.id = "listKostumisasiDataResponden";
        ul.setAttribute('id_kuesioner', id_kuesioner);

        var li = _e('li');
        li.id = "li_1";

        var input = _e('input');
        input.id = "dr_1";
        input.type = "text";
        input.setAttribute(
            "onblur", "kuesioner.simpanKostumisasiDataResponden(1)"
        );
        input.className = "form-control";
        input.setAttribute("style", "width:400px;display:inline");
        input.placeholder = "keterangan";
        li.appendChild(input)
        li.appendChild(document.createTextNode(' '));

        // Buat select untuk pilihan kategori data yang terdiri atas
        // Text, Tanggal, Angka, Gender
        var select = _e("select");
        select.id = "sl_1";
        select.className = "form-control";
        select.setAttribute("style", "width:100px;display:inline");
        select.setAttribute(
            "onchange", "kuesioner.simpanKostumisasiDataResponden(1)"
        );

        // option untuk kategori "text"
        var option = _e("option");
        option.value = "text";
        option.innerHTML = "Teks";
        select.appendChild(option);

        // option untuk kategori "Tanggal"
        var option = _e("option");
        option.value = "tanggal";
        option.innerHTML = "Tanggal";
        select.appendChild(option);

        // option untuk kategori "Angka"
        var option = _e("option");
        option.value = "angka";
        option.innerHTML = "Angka";
        select.appendChild(option);

        // option untuk kategori "Gender"
        var option = _e("option");
        option.value = "gender";
        option.innerHTML = "Gender";
        select.appendChild(option);
        li.appendChild(select);
        li.appendChild(document.createTextNode(" "));

        // buat tombol hapusnya
        var hapus = _e("button");
        hapus.id = "d_1";
        hapus.innerHTML = "Hapus";
        hapus.className = "btn btn-danger";
        hapus.setAttribute(
            "onclick", "kuesioner.hapusKostumisasiDataResponden(1)"
        );
        hapus.setAttribute("style", "display:none");
        li.appendChild(hapus);

        ul.appendChild(li);

        box.appendChild(ul);

        // buat tombol "Tambah formulir isia"
        var lagi = _e("button");
        lagi.id = "lagi";
        lagi.className = "btn btn-default";
        lagi.setAttribute("style", "margin-bottom:10px");
        lagi.setAttribute("onclick", "kuesioner.tambahFormIsianDataResponden()");
        lagi.innerHTML = "Tambah data keteranan responden";
        box.appendChild(lagi);
        box.appendChild(document.createElement("br"));

        // buat tombol selesainya
        var selesai = _e("button");
        selesai.id = "selesai";
        selesai.className = "btn btn-lg btn-primary";
        selesai.setAttribute("onclick", "kuesioner.tampilkanPratinjauKuesioner()");
        selesai.setAttribute("style", "display:none");
        selesai.innerHTML = "Selesai dan lihat Pratinjau Kuseioner";

        box.appendChild(selesai);
    },
    'simpanKostumisasiDataResponden': function(id) {
        // proses ini juga secara otomatis menampilkan form isian berikunya
        if (kosong($("#dr_" + id)) == true) {
            $("#dialogInfo").dialog("open");
            return false;
        }
        var id_form_isian = _('li_' + id).getAttribute('id_form_isian') || 0;
        var r = $.ajax({
            url: '../ajax/simpanKostumisasiDataResponden.php',
            method: 'post',
            data: {
                'kuesioner_id': $("#listKostumisasiDataResponden").attr("id_kuesioner"),
                'keterangan': $("#dr_" + id).val(),
                'tipe': $("#sl_" + id).val(),
                'id_form_isian': id_form_isian,
            }
        });

        r.done(function(data) {
            // tampilkan tombol hapus jika sudah ada data
            var j = $.parseJSON(data);
            $("#li_" + id).attr("id_form_isian", j.id_form_isian);
            if (id != 1) {
              //tampilkan tombol hapus
              $("#d_" + id).attr("style", "display:inline");
              selesai.setAttribute("style", "display:block");
            }
            // simpan data URL pada atribut elemen ul
            if (j.url) {
              _("listKostumisasiDataResponden").setAttribute("url", j.url);
            }
        });

    },
    'hapusKostumisasiDataResponden': function(id) {
      // Penghapusan data form_isian perlu konfirmasi
      $("#dialogHapus").dialog({
        buttons: {
          "Ya": function() {
            var r = $.ajax({
              url: '../ajax/hapusKostumisasiDataResponden.php',
              method: 'post',
              data: {
                hapus_data_dengan_id_berikut: $("#li_" + id).attr("id_form_isian"),
              }
            });
            r.done(function (data) {
              var j = $.parseJSON(data);
              if (j.hasil === 'ok') {
                var e = _("li_" + id);
                e.parentNode.removeChild(e);
              } else {
                alert("Terjadi kesalahan");
              }
              console.log("Hapus data");
            });
          },
          "Tidak" : function() {
            $(this).dialog("close");
          }
        }
      });
      $("#dialogHapus").dialog("open");
    },
    'hapusData': function(id) {
        $("#dialogHapus").dialog({
          show: {
            effect: "bounce",
            duration: 1000,
          },
          hide: {
            effect: "drop",
            duration: 1000,
          },
          buttons: {
            "Ya" : function() {
              $('#hapus' + id).html("Menghapus");
              $('#hapus' + id).addClass("disabled");
              var r = $.ajax({
                  url: '../ajax/hapus_kuesioner.php',
                  method: 'post',
                  data: {
                      id: $('#hapus' + id).attr('ik')
                  },
              });
              r.done(function(data) {
                  if (data == 'terhapus') {
                      location.reload();
                  }
              });
            },
            "Batal" : function() {
              $(this).dialog("close");
            }
          }
        });
        // Tampilkan dialog boks penghapusannya
        $("#dialogHapus").dialog("open");
    },
    'simpanDataResponden': function() {
      var j = "";
      var i;
      for (i = 1; i < 999; i++) {
        if (_('bio_' + i)) {
          j += "|||||" + _('bio_' + i).getAttribute('name');
          j += ">>>";
          j += _('bio_' + i).value;
          /*
          j += "'ket_" + i + "': '" + _('bio_' + i).getAttribute('name') + "',";
          j += "'nilai_" + i + "': '" + _('bio_' + i).value + "',";
          */
        }
      }
      j += "";
      // var x = eval(j);
      // alert(typeof(x));
      // j = JSON.stringify(j);
      // console.log(type(eval(j)));
      var a = $.ajax({
        url: 'ajax/simpanDataResponden.php',
        method: 'post',
        data: {
          data: j,
          id: _('id_kuesioner').getAttribute('value'),
          //'ket_1' + _('bio_' + i),
          //'nilai_1' +
        }
      });
    }
}

function _(x) {
    // function untuk memilih element
    return document.getElementById(x);
}

function _e(e) {
    // function untuk membuat element
    return document.createElement(e);
}

function kosong(e) {
    if ($.trim(e.val()) == '') {
        return true;
    }
}
