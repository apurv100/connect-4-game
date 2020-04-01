var player1 = prompt("player One: Enter Your Name, you will be Blue");
var player1color = 'rgb(86, 151, 255)';

var player2 = prompt("player two: Enter Your Name, you will be Red");
var player2color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum){
  console.log("you won");
  console.log(rowNum);
  console.log(colNum);
}

  function changeColor(rowIndex,colIndex,color){

       table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

  function returnColor(rowIndex,colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');


  }
  function checkBottom(colIndex){
    var colorReport = returnColor(5,colIndex);
    for(var row=5 ;row >-1 ; row--){
       var colorReport= returnColor(row,colIndex);
      if(colorReport === 'rgb(128, 128, 128)'){
        return row;
      }
    }
  }

  function colormatchcheck( one,two,three,four){
    return(one===two && one===three && one===four && one!== 'rgb(128, 128, 128)' && one!== undefined);
    }

function horizontalwincheck(){
  for(var row=0;row <6;row++){
    for(var col =0;col<4;col++){
      if(colormatchcheck(returnColor(row,col), returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3)))
      {reportWin(row,col);
      game_on=false; return true;}
      else {
        continue;
      }
    }
  }
}

function verticalwincheck(){
  for(var col=0;col<7;col++){
    for(var row=0;row<3;row++){
      if(colormatchcheck(returnColor(row,col), returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
        reportWin(row,col);
      game_on=false;  return true;
      }else{
        continue;
      }
    }
  }
}



function daigonalwincheck(){
  for(var col=0;col<4;col++){
    for(var row=0;row<3;row++){
      if(colormatchcheck(returnColor(row,col), returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
      game_on=false;  return true;
      }else if(colormatchcheck(returnColor(row,col), returnColor(row+1,col-1),returnColor(row+2,col-2),returnColor(row+3,col-3))){
      game_on=false;  return true;
      }else {
        continue;
      }
    }
  }
}





var currentplayer =1;
var currentname =player1;
var currentcolor=player1color;

$('h3').text(player1+" it is your turn,pick the column to drop in!")


$('.board button').on('click',function(){

   var col = $(this).closest('td').index();
   var bottomavail = checkBottom(col);
   changeColor(bottomavail,col,currentcolor);
   if( horizontalwincheck() || verticalwincheck() || daigonalwincheck()){
     $('h1').text(currentname+ " You have won!")
     $('h3').fadeOut('fast');
     $('h2').fadeOut('fast');
   }
   currentplayer=currentplayer* -1;

   if(currentplayer ===1){
     currentname =player1;
     currentcolor= player1color;
     $('h3').text(currentname+ " its your turn")
   }else{
     currentname = player2;
     $('h3').text(currentname+ " its your turn!")
     currentcolor = player2color;
   }

})
