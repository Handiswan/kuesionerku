var kuesioner = {
    'likert' : {
	'simpanJudul' : function() {
	    var req = $.ajax({
		url: '../ajax/buat_kuesioner.php',
		method : 'post',
		data : {judul : $('#judul').val(), 
			keterangan : $('#keterangan').val(), 
			skala: $('#skala').val(),
			step: 'judul',
		}
	    });
	    req.done(function(data) {
		var j = $.parseJSON(data);
		// kita switch disini berdasarkan jenis_skala
		if (j.jenis_skala == "likert") {
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

		    var input = _e('input');
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
		    button.setAttribute("onclick", "kuesioner.likert.simpanPilihan(1)");
		    button.innerHTML = "Simpan";
		    li.appendChild(button);
		    
		    ul.appendChild(li);

		    div.appendChild(ul);
		    
		    box.appendChild(div);

                    var button = _e('button');
		    button.className = "btn btn-default";
		    button.setAttribute("style", "margin-top: 10px");
		    button.setAttribute("onclick", "kuesioner.likert.tambahPilihan()");
		    button.innerHTML = "Tambah Pilihan Jawaban";
		    
		    box.appendChild(button);
		    box.appendChild(_e('br'));
                    
		    var button = _e('button');
		    button.className = "btn btn-lg btn-primary";
		    button.setAttribute("style", "margin-top: 10px");
		    button.setAttribute("onclick", "kuesioner.tampilkanFormInputPertanyaan()");
		    button.innerHTML = "Selanjutnya";
		    
		    box.appendChild(button);

		} else {
		    alert(j.jenis_skala);
		}
		// $('#body2').html(data);
		$('html, body').animate({scrollTop: 0});
	    });
	},
	'tambahPilihan' : function() {
	    // var box = document.getElementById('pilihanJawaban');
	    var box = document.getElementById('listJawaban');
	    for (var i = 1; i < 999999999999; i++) {
               if(document.getElementById('j' + i) == null) {
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
		       button.setAttribute('onclick', "kuesioner.likert.simpanPilihan('" + i + "')");
		       button.innerHTML = "Simpan";
		       li.appendChild(button);
		       li.appendChild(document.createTextNode(' '));

		       var del = document.createElement('button');
		       del.setAttribute('id', 'd' + i);
		       del.setAttribute('class', 'btn btn-danger');
		       del.setAttribute('onclick', "kuesioner.likert.hapusPilihanIni('" + i + "')");
		       var delIcon = document.createElement('span');
		       delIcon.setAttribute('class', 'glyphicon glyphicon-remove');
		       delIcon.setAttribute('aria-hidden', 'true');
		       del.appendChild(delIcon);
		       del.appendChild(document.createTextNode(' Abaikan'));
		       li.appendChild(del);

		       box.appendChild(li);

		       var next = Number($('#pilihanJawaban').attr('next')) + 1;
		       $('#pilihanJawaban').attr('next', next);
		       // document.getElementById('pilihanJawaban').innerHTML += box;
		       break;
		   // } else {
		   //    $('#pilihanJawaban').attr('status', 'added');
		   // }
	       } 
	    }
	},
	'simpanPilihan' : function(id) {
	    var r = $.ajax({
		    url : '../ajax/simpan_likert_pilihan_jawaban.php',
		    method : 'post',
		    data : {jawaban: $('#j' + id).val(),
			    nilai: $('#n' + id).val(),
			    q_liker_id: $('#pilihanJawaban').attr('q_liker_id'),
		    }
	    });
	    r.done(function(data) {
		    var json = $.parseJSON(JSON.stringify(data));
		    if(json.result == "ok") {
			// simpan last_id pada li_id juga q_liker_id
			var li = document.getElementById('li_' + id);
			li.setAttribute('last_id', json.last_id);
			li.setAttribute('q_liker_id', json.q_liker_id);

			document.getElementById('j' + id).setAttribute('disabled', 'disabled');
			document.getElementById('n' + id).setAttribute('disabled', 'disabled');
			
			// hapus tombol simpan untuk kemudian di ganti dengan tombol edit
			var s = document.getElementById('s' + id);
			s.parentNode.removeChild(s);

			// cek jika tombol abaikan ada, maka hapus juga
			if(document.getElementById('d' + id)) {
			    var d = document.getElementById('d' + id);
			    d.parentNode.removeChild(d);
			}

			// selanjut adalah buat tombol edit dan append ke list
			var li = document.getElementById('li_' + id);

                        var button = document.createElement('button');
		        button.setAttribute('id', 'e' + id);
		        button.setAttribute('class', 'btn btn-success');
		        button.setAttribute('onclick', "kuesioner.likert.editPilihanTersimpan('" + id + "')");
		        button.innerHTML = "Edit";
		        li.appendChild(button);
		        li.appendChild(document.createTextNode(' '));


			// lalu buat del button
 		        var del = document.createElement('button');
		        del.setAttribute('id', 'd' + id);
		        del.setAttribute('class', 'btn btn-danger');
		        del.setAttribute('onclick', "kuesioner.likert.hapusPilihanTersimpan('" + id + "')");
		        del.appendChild(document.createTextNode('Hapus'));
		        li.appendChild(del);

		    }
	    });
	},
	'hapusPilihanTersimpan' : function(id) {
	    // tampilkan progress yang sedang terjadi: penghapusan ....
	    var d = document.getElementById('d' + id);
	    d.setAttribute('class', 'btn btn-danger disabled');
	    d.innerHTML = "Menghapus...";

	    // lakukan ajax request untuk penghapusan data.. 
	    var r = $.ajax({
		        url: '../ajax/hapus_likert_pilihan_tersimpan.php',
			method: 'post',
			data: {id: $('#li_' + id).attr('q_liker_id')}
	    });
	    r.done(function(data) {
		if(data == 'ok') {
		    var li = document.getElementById('li_' + id);
		    li.parentNode.removeChild(li);
		}
	    });

	},
	'hapusPilihanIni' : function(id) {
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
	    button.setAttribute('onclick', "kuesioner.likert.perbaharuiPilihan('" + id + "')");
	    button.innerHTML = "Perbaharui";
	    // select list yang dimaksud
	    var li = document.getElementById('li_' + id);
	    li.appendChild(button);
	    li.appendChild(document.createTextNode(' '));

	},
	'perbaharuiPilihan' : function(id) {
	    var r = $.ajax({
		    url: '../ajax/perbaharui_likert_pilihan_jawaban.php',
		    method: 'post',
		    data : {jawaban: $('#j' + id).val(),
			    nilai: $('#n' + id).val(),
			    q_liker_id: $('#li_' + id).attr('q_liker_id'),
		    }
	    });
	    r.done(function(data) {
		    if(data == 'ok') {
			// simpan last_id pada li_id juga q_liker_id
			var li = document.getElementById('li_' + id);

			document.getElementById('j' + id).setAttribute('disabled', 'disabled');
			document.getElementById('n' + id).setAttribute('disabled', 'disabled');
			
			// hapus tombol simpan untuk kemudian di ganti dengan tombol edit
			var s = document.getElementById('s' + id);
			s.parentNode.removeChild(s);

			// cek jika tombol abaikan ada, maka hapus juga
			if(document.getElementById('d' + id)) {
			    var d = document.getElementById('d' + id);
			    d.parentNode.removeChild(d);
			}

			// selanjut adalah buat tombol edit dan append ke list
			var li = document.getElementById('li_' + id);

                        var button = document.createElement('button');
		        button.setAttribute('id', 'e' + id);
		        button.setAttribute('class', 'btn btn-success');
		        button.setAttribute('onclick', "kuesioner.likert.editPilihanTersimpan('" + id + "')");
		        button.innerHTML = "Edit";
		        li.appendChild(button);
		        li.appendChild(document.createTextNode(' '));


			// lalu buat del button
 		        var del = document.createElement('button');
		        del.setAttribute('id', 'd' + id);
		        del.setAttribute('class', 'btn btn-danger');
		        del.setAttribute('onclick', "kuesioner.likert.hapusPilihanTersimpan('" + id + "')");
		        del.appendChild(document.createTextNode('Hapus'));
		        li.appendChild(del);

		    }
	    });
	}
    },
    'simpanPertanyaan' : function(id) {
	var  last_insert_id = _('li_' + id).getAttribute('last_insert_id') || 0;
	var r = $.ajax({
		url: '../ajax/simpanPertanyaan.php',
		method : 'post',
		data : {
			'id_kuesioner' : $('#listPertanyaan').attr('id_kuesioner'), 
			'pertanyaan' : $('#p_' + id).val(),
			'f_or_uf' : $('input[name=f_uf' + id + ']:checked').val(),
			'last_insert_id' : last_insert_id,
		}
	});
	r.done(function(data) {
		var j = $.parseJSON(data);
		_('li_' + id).setAttribute('last_insert_id', j.last_insert_id);
		_('h_' + id).setAttribute('style', 'display:inline');
		console.log("Apakah data tersimpan?");
	});
    },
    'tampilkanFormInputPertanyaan' : function() {
	var i_k = $('#pilihanJawaban').attr('id_kuesioner');
	var box = _('body2');
	box.innerHTML = "";

	var H = document.createElement('h2');
	H.innerHTML = "Silahkan buat pertanyaan Anda";
	box.appendChild(H);

	// kita akan pakai list
	var ul = _e('ul');
	ul.id = "listPertanyaan";
	ul.setAttribute('next','1');
	ul.setAttribute('id_kuesioner', i_k);

	var li = _e('li');
	li.id = "li_1";
	var i = _e('input');
	i.id = "p_1";
	i.type = "text";
	i.setAttribute('onblur', 'kuesioner.simpanPertanyaan(1)');
	i.placeholder = "Pertanyaan...";
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
	var i = _e('input');
        i.name = "f_uf1";
	i.type = "radio";
	i.value = "f";
	i.setAttribute('checked', 'true');
	li.appendChild(i);
	li.appendChild(document.createTextNode(' Favorable '));
        var i = _e('input');
        i.name = "f_uf1";
	i.type = "radio";
	i.value = "uf";
	li.appendChild(i);
	li.appendChild(document.createTextNode(' Unfavorable'));

	ul.appendChild(li);

	var div = _e('div');
	var b = _e('button');
	b.className = "btn btn-default";
	b.setAttribute('onclick', 'kuesioner.tambahPertanyaan()');
	b.innerHTML = "Tambah Pertanyaan";
	div.appendChild(b);

	box.appendChild(ul);
	box.appendChild(div);

	var next = _e('button');
	next.className = "btn btn-lg btn-primary";
	next.innerHTML = "Selanjutnya";
	next.setAttribute("style", "float:right");
	box.appendChild(next);
    },
    'tambahPertanyaan' : function() {
	var ul = _('listPertanyaan');
	for (var x = 1; x < 999; x++) {
	    // jika element belum ada, maka tambahkan
	    if(document.getElementById('p_' + x) == null) {
		/*
		_('listPertanyaan').innerHTML += "<br>TambahData</br>";
		*/
	
		var li = _e('li');
		li.id = "li_" + x;
		var i = _e('input');
		i.id = "p_" + x;
		i.type = "text";
		i.setAttribute('onblur', 'kuesioner.simpanPertanyaan(1)');
		i.placeholder = "Pertanyaan...";
		li.appendChild(i);
		li.appendChild(document.createTextNode(' '));
		var b = _e('button');
		b.className = "btn btn-danger";
		b.id = 'h_' + x;
		b.setAttribute('onclick', 'kuesioner.hapusPertanyaanTersimpan(1)');
		b.innerHTML = "Hapus";
		b.setAttribute('style','display:none');
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
    'hapusPertanyaanTersimpan' : function(id) {
	    if(confirm("Yakin ingin menghapus pertanyaan ini?")) {
	    var a = $.ajax({
		    url: '../ajax/hapusPertanyaanTersimpan.php',
		    method: 'post',
		    data: {'id' : _('li_' + id).getAttribute('last_insert_id')},
	    });
	    a.done(function(data) {
		    var li = _('li_' + id);
		    li.parentNode.removeChild(li);
	    });
	    }
    },
    'hapusData' : function(id) {
	if(confirm('Yakin ingin menghapus kuesioner dengan ID: ' + id)) {
	$('#hapus' + id).html("Menghapus");
	$('#hapus' + id).addClass("disabled");
	var r = $.ajax({
		    url: '../ajax/hapus_kuesioner.php',
		    method: 'post',
		    data: {id : $('#hapus' + id).attr('ik')},
	});
	r.done(function(data) {
	    if (data == 'terhapus') {
		location.reload();
	    }
	});
	}
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
