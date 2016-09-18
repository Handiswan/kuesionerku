function beranda_button(){
document.getElementById('beranda').style.background = "#95CAED";
document.getElementById('peneliti').style.background = "#3598FF";
document.getElementById('kuesioner').style.background = "#3598FF";
document.getElementById('laporan').style.background = "#3598FF";
}
function peneliti_button(){
document.getElementById('peneliti').style.background = "#95CAED";
document.getElementById('beranda').style.background = "#3598FF";
document.getElementById('kuesioner').style.background = "#3598FF";
document.getElementById('laporan').style.background = "#3598FF";
}
function kuesioner_button(){
document.getElementById('kuesioner').style.background = "#95CAED";
document.getElementById('peneliti').style.background = "#3598FF";
document.getElementById('beranda').style.background = "#3598FF";
document.getElementById('laporan').style.background = "#3598FF";
}
function laporan_button(){
document.getElementById('laporan').style.background = "#95CAED";
document.getElementById('peneliti').style.background = "#3598FF";
document.getElementById('kuesioner').style.background = "#3598FF";
document.getElementById('beranda').style.background = "#3598FF";
}





function beranda2_button(){
document.getElementById('beranda').style.background = "#95CAED";
document.getElementById('responden').style.background = "#3598FF";
document.getElementById('kuesioner').style.background = "#3598FF";
document.getElementById('laporan').style.background = "#3598FF";
document.getElementById('petunjuk').style.background = "#3598FF";
}

function kuesioner2_button(){
document.getElementById('beranda').style.background = "#3598FF";
document.getElementById('responden').style.background = "#3598FF";
document.getElementById('kuesioner').style.background = "#95CAED";
document.getElementById('laporan').style.background = "#3598FF";
document.getElementById('petunjuk').style.background = "#3598FF";
}

function responden2_button(){
document.getElementById('beranda').style.background = "#3598FF";
document.getElementById('responden').style.background = "#95CAED";
document.getElementById('kuesioner').style.background = "#3598FF";
document.getElementById('laporan').style.background = "#3598FF";
document.getElementById('petunjuk').style.background = "#3598FF";

}
function laporan2_button(){
document.getElementById('beranda').style.background = "#3598FF";
document.getElementById('responden').style.background = "#3598FF";
document.getElementById('kuesioner').style.background = "#3598FF";
document.getElementById('laporan').style.background = "#95CAED";
document.getElementById('petunjuk').style.background = "#3598FF";
}

function petunjuk2_button(){
document.getElementById('beranda').style.background = "#3598FF";
document.getElementById('responden').style.background = "#3598FF";
document.getElementById('kuesioner').style.background = "#3598FF";
document.getElementById('laporan').style.background = "#3598FF";
document.getElementById('petunjuk').style.background = "#95CAED";
}




var data = new Array(); // creating array
function add_element(){
data.push(document.getElementById('t1').value); // adding element to array
// document.getElementById('t1').value=''; // Making the text box blank
disp(); // displaying the array elements
}

function disp()
{
// var str='';
// str = 'total number of elements in data array : ' + data.length + '<br>';
for (i=0;i<data.length;i++) { 
	str += i + ':'+data[i] + "<br >";  // adding each element with key number to variable
	} 
document.getElementById('disp').innerHTML=str; // Display the elements of the array
}