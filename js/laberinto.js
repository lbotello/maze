var board;
const numberOfRows = numberOfColumns = 20;
const numberofBricks = 100;
var salida = false;

function createBoard(){
	board = [];
	for (var i = 0; i < numberOfRows; i++) {
		board[i] = [];
		for (var j = 0; j < numberOfColumns; j++) {
			board[i][j] = 0;
		}
	}
}

function setBricks(){
	for (var i = 0; i < numberofBricks; ) {
		row = Math.floor(Math.random() * numberOfRows)
		col = Math.floor(Math.random() * numberOfColumns)
		if(board[row][col] == 0){
			board[row][col] = 1
			i++
		}
	}
	board[0][0] = 0;
	board[numberOfRows - 1][numberOfColumns - 1] = 2
}

function insertTable(){
	var table = $("#tableContainer");
	for (var i = 0; i < board.length; i++) {
		var row = $("<tr></tr>").appendTo(table);
		for (var j = 0; j < board[i].length; j++) {
			var td = $("<td></td>").text(board[i][j]);
			td.attr({id : [i, j].join("-")});
			if (board[i][j] == 1) {
				td.attr({class : "brick"})
			} else {
				td.attr({class : "way"})
			}
			td.appendTo(row);
		}
	}
}

function traverseBoard(x, y, depth){
	console.log("Depth " + depth)
	console.log([depth + "-" +"Checking position ", x, ",", y].join(""))
	if (board[x][y] == 2) {
		console.log([depth + "-" +"Found an exit!", x, y].join("-"))
		salida = true;
		return;
	}
	console.log(depth + "-" +"This is not an exit!")
	board[x][y] = 9;
	$(["#", x, "-", y].join("")).attr({class : "path"})

	if(y < numberOfColumns - 1 && board[x][y + 1] != 1 
		&& board[x][y + 1] != 9 && !salida){
		console.log(depth + "-" +"Going East!")
		traverseBoard(x, y + 1, depth+1)
	}
	if(x < numberOfRows - 1 && board[x + 1][y] != 1 
		&& board[x + 1][y] != 9 && !salida ){
		console.log(depth + "-" +"Going South!")
		traverseBoard(x + 1, y, depth+1)
	}
	if(y > 0 && board[x][y - 1] != 1 
		&& board[x][y - 1] != 9 && !salida){
		console.log(depth + "-" +"Going West!")
		traverseBoard(x, y - 1, depth+1)
	}
	if(x > 0 && board[x - 1][y] != 1 
		&& board[x - 1][y] != 9 && !salida){
		console.log(depth + "-" +"Going North!")
		traverseBoard(x - 1, y, depth+1);
	}
	if (!salida) {
		$(["#", x, "-", y].join("")).attr({class : "badPath"})
	}
}

createBoard();
setBricks();




/*
==============================================================================
*/
function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

function trv(x, y, depth){
	console.log("Depth " + depth)
	console.log([depth + "-" +"Checking position ", x, ",", y].join(""))
	if (board[x][y] == 2) {
		console.log([depth + "-" +"Found an exit!", x, y].join("-"))
		salida = true;
		return;
	}
	console.log(depth + "-" +"This is not an exit!")
	board[x][y] = 9;
	$(["#", x, "-", y].join("")).attr({class : "path"})

	if(y < numberOfColumns - 1 && board[x][y + 1] != 1 
		&& board[x][y + 1] != 9 && !salida){
		console.log(depth + "-" +"Going East!")
		trv(x, y + 1, depth+1)
	}
	if(x < numberOfRows - 1 && board[x + 1][y] != 1 
		&& board[x + 1][y] != 9 && !salida ){
		console.log(depth + "-" +"Going South!")
		trv(x + 1, y, depth+1)
	}
	if(y > 0 && board[x][y - 1] != 1 
		&& board[x][y - 1] != 9 && !salida){
		console.log(depth + "-" +"Going West!")
		trv(x, y - 1, depth+1)
	}
	if(x > 0 && board[x - 1][y] != 1 
		&& board[x - 1][y] != 9 && !salida){
		console.log(depth + "-" +"Going North!")
		trv(x - 1, y, depth+1);
	}
	if (!salida) {
		$(["#", x, "-", y].join("")).attr({class : "badPath"})
	}
}


function la(cmd, time){
	setTimeout(()=>{
		console.log(cmd)
	},time)
}

/*
==============================================================================
*/


$(document).ready(function(){
	insertTable();
	/*setTimeout(function(){
		trv(0, 0, 1)	
	},1000)*/
	la(2,2000)
	la(1,1000)
})
