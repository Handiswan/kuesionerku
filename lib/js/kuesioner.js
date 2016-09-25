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
    // objek kuesioer.likert
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
                    var li = document.getElementById('li_' + id);

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
                'onclick', "kuesioner.guttman.simpanPilihan('" + i + "')"
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
            // tampilkan bentuk isian data jawaban
            var box = _('body2');
            box.innerHTML = ""; // kosongkan

            var H = _e('h4');
            H.innerHTML = "Masukkan pilihan jawaban yang Anda inginkan (#guttman)";
            box.appendChild(H);

            var div = _e('div');
            div.id = 'pilihanJawaban';
            div.setAttribute('next', '2');
            div.setAttribute('q_guttman_id', j.id_skala_terakhir);
            div.setAttribute('id_kuesioner', j.id_kuesioner);

            var ul = _e('ul');
            ul.id = 'listJawaban';

            var li = _e('li');
            li.id = 'li_1';

            var input = _e('input');
            input.id = 'j1';
            input.className = 'form-control';
            input.type = 'text';
            input.placeholder = 'Jawaban';
            input.setAttribute('style', 'display:inline;width:400px');
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            input = _e('input');
            input.id = 'n1';
            input.className = 'form-control';
            input.type = 'number';
            input.placeholder = 'Nilai';
            input.setAttribute('style', 'display:inline;width:100px');
            li.appendChild(input);
            li.appendChild(document.createTextNode(' '));

            var button = _e('button');
            button.id = 's1';
            button.className = 'btn btn-primary';
            button.setAttribute('style', 'display:inline');
            button.setAttribute('onclick','kuesioner.guttman.simpanPilihan(1)');
            button.innerHTML = 'Simpan';
            li.appendChild(button);

            ul.appendChild(li);

            div.appendChild(ul);

            box.appendChild(div);

            button = _e('button');
            button.className = 'btn btn-default';
            button.setAttribute(
              'style',
              'margin-top: 10px; margin-left: 5px'
            );
            button.setAttribute(
              'onclick', 'kuesioner.guttman.tambahPilihan()'
            );
            button.innerHTML = 'Tambah Pilihan Jawaban';

            box.appendChild(button);
            box.appendChild(_e('br'));

            button = _e('button');
            button.className = 'btn btn-lg btn-primary';
            button.setAttribute(
              'style',
              'margin-top: 10px; display: none'
            );
            button.setAttribute(
              'onclick', 'kuesioner.tampilkanFormInputPertanyaan()'
            );
            button.innerHTML = 'Selanjutnya';
            button.id = 'selanjutnya';

            box.appendChild(button);
            $("#j1").focus();
            alert(j.jenis_skala);
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
        H.innerHTML = "Silahkan buat pertanyaan Anda";
        box.appendChild(H);

        // kita akan pakai list
        var ul = _e('ul');
        ul.id = "listPertanyaan";
        ul.setAttribute('next', '1');
        ul.setAttribute('id_kuesioner', i_k);

        var li = _e('li');
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
        b.setAttribute('onclick', 'kuesioner.hapusPertanyaanTersimpan(1)');
        b.innerHTML = "Hapus";
        b.setAttribute('style', 'display:none');
        li.appendChild(b);
        li.appendChild(_e('br'));
        var form = _e('form');
        form.id = 'myForm';
        i = _e('input');
        i.name = "f_uf1";
        i.type = "radio";
        i.value = "f";
        i.setAttribute('checked', 'true');
        li.appendChild(i);
        li.appendChild(document.createTextNode(' Favorable '));
        i = _e('input');
        i.name = "f_uf1";
        i.type = "radio";
        i.value = "uf";
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
                li.appendChild(i);
                li.appendChild(document.createTextNode(' Favorable '));
                var i = _e('input');
                i.name = "f_uf" + x;
                i.type = "radio";
                i.value = "uf";
                li.appendChild(i);
                li.appendChild(document.createTextNode(' Unfavorable'));

                ul.appendChild(li);

                var next = Number($('#listPertanyaan').attr('next')) + 1;
                $('#listPertanyaan').attr('next', next);
                break;
            }
        }
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
            if(id == 1) {
              return false;
            }
            // tampilkan tombol hapus jika sudah ada data
            var j = $.parseJSON(data);
            $("#li_" + id).attr("id_form_isian", j.id_form_isian);
            //tampilkan tombol hapus
            $("#d_" + id).attr("style", "display:inline");
            selesai.setAttribute("style", "display:block");

            // simpan data URL pada atribut elemen ul
            _("listKostumisasiDataResponden").setAttribute("url", j.url);
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
