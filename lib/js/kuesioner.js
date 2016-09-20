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
	    var box = document.getElementById('pilihanJawaban');
	    for (var i = 1; i < 9; i++) {
               if(document.getElementById('j' + i) == null) {
		   // if($('#pilihanJawaban').attr('status') == 'notAdded') {
		       var br = document.createElement('br');
		       box.appendChild(br);
		       var input = document.createElement('input');
		       input.setAttribute('id', 'j' + i);
		       input.setAttribute('class', 'form-control');
		       input.setAttribute('style', 'display:inline;width:400px');
		       input.setAttribute('type', 'text');
		       input.setAttribute('placeholder', 'Jawaban');
		       box.appendChild(input);
		       box.appendChild(document.createTextNode(" "));

		       var input = document.createElement('input');
		       input.setAttribute('id', 'n' + i);
		       input.setAttribute('class', 'form-control');
		       input.setAttribute('style', 'display:inline;width:100px');
		       input.setAttribute('type', 'number');
		       input.setAttribute('placeholder', 'Nilai');
		       box.appendChild(input);
		       box.appendChild(document.createTextNode(" "));

                       var button = document.createElement('button');
		       button.setAttribute('id', 's' + i);
		       button.setAttribute('class', 'btn btn-primary');
		       button.setAttribute('onclick', "kuesioner.likert.simpanPilihan('" + i + "')");
		       button.innerHTML = "Simpan";
		       box.appendChild(button);
		       box.appendChild(document.createElement('br'));
		       /*
		       box += "<br><input id='j" + i + "' class='form-control' style='display:inline;width:400px' type='text' placeholder='Jawaban'> ";
		       box += "<input id='n" + i + "' class='form-control' style='display:inline;width:100px' type='number' placeholder='Nilai'> ";
		       box += "<button id='s" + i + "' style='display:inline' class='btn btn-primary' onclick='kuesioner.likert.simpanPilihan(" + i + ")'>Simpan</button><br>";
		       */
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
		    if(data == "ok") {
			document.getElementById('j' + id).setAttribute('disabled', 'disabled');
			document.getElementById('n' + id).setAttribute('disabled', 'disabled');
			document.getElementById('s' + id).setAttribute('class', 'label label-success');
			document.getElementById('s' + id).setAttribute('style', 'padding:11px;border:none;position:relative;top:-1px;cursor:default');
			$('#s' + id).html("Tersimpan");
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
