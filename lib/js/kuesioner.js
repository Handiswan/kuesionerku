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
		// var r = JSON.parse(data);
		alert(data.responseText);
		/*
		if(r.hasil == 'ok') {
		    var b = document.getElementById('body2');
		    b.innerHTML = "";
		    var h4 = document.createElement('h4');
		    h4.innerHTML = "Pilih jumlah jawaban yang diperlukan";
		    b.appendChild(h4);
		    var ul = document.createElement('ul');
		    for (var i = 1; i < 9; i++) {
			var li = document.createElement('li');
		    }
		    var li = document.createElement('li');
		    
		} else {
		    alert("Terjadi kesalahan!");
		}
		*/
	    });
	}
    }
}
