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
		$('#body2').html(data);
		$('html, body').animate({scrollTop: 0});
	    });
	},
	'tambahPilihan' : function() {
	    // var box = document.getElementById('pilihanJawaban');
	    var box = document.getElementById('listJawaban');
	    for (var i = 1; i < 999999999999; i++) {
               if(document.getElementById('j' + i) == null) {
		   // if($('#pilihanJawaban').attr('status') == 'notAdded') {
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
