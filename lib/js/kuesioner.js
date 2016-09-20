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
	}
    }
}
