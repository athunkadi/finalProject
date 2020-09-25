function show(el) {
  document.getElementById(el).style.display = 'block'
}

function hide(el) {
  document.getElementById(el).style.display = 'none'
}

let xPlayer;
let oPlayer;

function addPlayer(x, o, move) {
  xPlayer = document.getElementById(x);
  oPlayer = document.getElementById(o);

  if(xPlayer.value === '' || oPlayer.value === ''){
    alert("Isi dulu dong namanya. Tak Kenal Maka Tak Sayang ..");
    location.reload();
  } else if(xPlayer.value === oPlayer.value){
    alert("ciee kembar. dibedain dong namanya ..");
    location.reload();
  }
  document.getElementById('xPlay').innerHTML += xPlayer.value;
  document.getElementById('oPlay').innerHTML += oPlayer.value;
  show(move);
  hide('inputPlayer');
}

let painted;
let content;
let winningCombinations;
let turn = 0;
let theCanvas;
let c;
let cxt;
let squaresFilled = 0;

window.onload=function(){

	painted = new Array();
	content = new Array();
	winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

	for(let l = 0; l <= 8; l++){
		painted[l] = false;
		content[l] = '';
	}
}

function canvasClicked(canvasNumber){
	theCanvas = "canvas"+canvasNumber;
	c = document.getElementById(theCanvas);
	cxt = c.getContext("2d");

	if(painted[canvasNumber-1] == false){
		if(turn%2==0){
			cxt.beginPath();
			cxt.moveTo(10,10);
			cxt.lineTo(40,40);
			cxt.moveTo(40,10);
			cxt.lineTo(10,40);
			cxt.stroke();
			cxt.closePath();
      content[canvasNumber-1] = 'X';
      show('oPlay');
      hide('xPlay');
		}else{
			cxt.beginPath();
			cxt.arc(25,25,20,0,Math.PI*2,true);
			cxt.stroke();
			cxt.closePath();
      content[canvasNumber-1] = 'O';
      show('xPlay');
      hide('oPlay');
		}

		turn++;
		painted[canvasNumber-1] = true;
		squaresFilled++;
		checkForWinners(content[canvasNumber-1]);

		if(squaresFilled==9){
			alert("Seri nih ...");
			alert(playAgain());
		}

	}else{
		alert("Kotak Sudah Terisi, Tolong cari kotak yang kosong!");
	}

}

function checkForWinners(symbol){

	for(let a = 0; a < winningCombinations.length; a++){
		if(content[winningCombinations[a][0]]==symbol&&content[winningCombinations[a][1]]==	symbol&&content[winningCombinations[a][2]]==symbol){
			alert(symbol+ " WON!");
			playAgain();
		}
	}

}

function playAgain(){
	y=confirm("Main Lagi yuk ...");
	if(y==true){
		alert("mulai lagi");
    location.reload(true);
	}else{
    alert("Terima Kasih Kaka ..");
	}
  window.close();

}