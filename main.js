console.log("Hello");
var WORD=answers[Math.floor(Math.random()*answers.length)].toUpperCase().split('');
console.log(WORD);
var guess = ['','','','',''];
var ROW = 0;
var CEL = 0;

var matrix =
[
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
['','','','','']
];

var table = document.createElement('table');
table.style.border = '1px solid black';
table.style.align = "centre";
for(var r = 0; r < 6; r++) {
  var row = table.insertRow();
  for(var c = 0; c < 5; c++) {
    var cel = document.createElement('td');
    cel.id = ('row' + r + 'cel' + c);
    cel.style.border = '1px solid white';
    cel.style.width = '80px';
    cel.style.height = '80px';
    cel.style.textAlign = "center";
    cel.style.fontFamily = 'Arial', 'sans-serif';
    cel.style.fontSize = 'xx-large';
    cel.style.fontWeight = "bold";
    row.appendChild(cel)
  }
}
document.body.appendChild(table);

function updateWordle(){
  for(var r = 0; r < ROW; r++) {
    for(var c = 0; c < 5; c++) {
      value = matrix[r][c];
      var cel = document.getElementById('row' + r + 'cel' + c);
      cel.innerText = value;
      console.log(value, WORD[c]);
      if(value === WORD[c]){
        cel.style.backgroundColor = "green";
      }else if(WORD.includes(value)){
        cel.style.backgroundColor = "orange";
    }
  }
  }
  for(var c = 0; c < 5; c++){
    value = guess[c];
    var cel = document.getElementById('row' + ROW + 'cel' + c);
    cel.innerText = value;
  }
}


function inputChar(key){
  if (CEL < 5){
    console.log(key);
    guess[CEL] = key;
    CEL++;
  }
  updateWordle();
}

function removeChar(key){
  if (CEL > 0){
    CEL--;
    guess[CEL] = '';
  }
  colorRow("black");
  updateWordle();
}

function colorRow(color){
  for(var c = 0; c < 5; c++){
    var cel = document.getElementById('row' + ROW + 'cel' + c);
    cel.style.backgroundColor = color;
  }
}

function submitWord(){
  if (CEL == 5){
    var word = guess.join("").toLowerCase();
    if(answers.includes(word)){
      console.log(word);
      matrix[ROW] = guess;
      guess = ['','','','',''];
      CEL = 0;
      ROW++;
      updateWordle();
    }else{
      colorRow("red");
    }
  }
}

document.body.addEventListener("keyup", ({key}) => {
  if (event.key.match(/^[A-Za-z]$/g)) {
    console.log(key);
    inputChar(key.toUpperCase());
  } else {
    if (key == "Backspace") {
       removeChar();
    }else if (key == "Enter") {
      submitWord();
    }
  }

})

updateWordle();