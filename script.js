console.log("running")
const tilewidth = 20;
const tileheight = 20;

const columns=15;
const rows   =20;

const containerwidth=tilewidth*columns;
const containerheight=tileheight*rows;
 
const gamecontainer = document.getElementById("game-container");
console.log("container")
console.log(gamecontainer)
// create a grid of divs.  They should wrap round...
const grid=[];

for(let r=0; r<rows; r++)
{
  console.log("row "+ r );
  var row=[];
  for(let c=0; c<columns; c++)
  {
    // create a new div element with tile class
    var newtile = document.createElement("div");
    newtile.classList.add("tile");

    // append to the gamecontainer
    gamecontainer.appendChild(newtile);

    // add it to the current row
    row.push(newtile);
  }

  // add the current row to the grid
  grid.push(row);
}

// set 10 columns and 3 rows to aliens
var alienrow = 0;
var aliencolumn = 1;
const aliens_per_row = 10;
const aliens_rows = 3;
var aliens_direction = +1;

for(let r=alienrow; r<aliens_rows; r++)
{
  for(let c=aliencolumn; c<=aliens_per_row; c++)
  {
    grid[r][c].classList.add("alien");
 }
}



// set the timeInterval to 500ms to move the aliens
// call alienMove()
// return True if the aliens can still move
// return False if the aliens have reached the bottom
//                     or touched the gun                   
function moveAliens(){
  var yoffset=0;
  var xoffset=0;
  // check if aliens have reached the left wall
  if (aliencolumn==0 & aliens_direction== -1){
    yoffset=+1;
    xoffset=0;
    aliens_direction = +1;
  } else if ( (aliencolumn+aliens_per_row)==columns  & aliens_direction== +1){
    yoffset=+1;
    xoffset=0;
    aliens_direction = -1;
  } else {
    yoffset=0;
    xoffset=aliens_direction;
  }

  if (yoffset>0){
    // if moving down remove current top line and add
    // new bottom line
    for (let c=aliencolumn; c<aliencolumn+aliens_per_row; c++){
      grid[alienrow][c].classList.remove("alien");
      grid[alienrow+aliens_rows][c].classList.add("alien");
    }
    alienrow++;
  } else if (xoffset>0) {
    // remove aliens on the left and add aliens on the right
    for(let r=alienrow; r<alienrow+aliens_rows; r++){
      grid[r][aliencolumn].classList.remove("alien");
      grid[r][aliencolumn+aliens_per_row].classList.add("alien");
    }
    aliencolumn++;
  } else {
    // remove aliens on the right and add aliens on the left
    for(let r=alienrow; r<alienrow+aliens_rows; r++){
      grid[r][aliencolumn-1].classList.add("alien");
      grid[r][aliencolumn+aliens_per_row-1].classList.remove("alien");
    }
    aliencolumn--;
  }

  // check if the aliens have reached the bottom
  return ( alienrow+aliens_rows < rows);
}


var interval = setInterval(function(){
  if ( !moveAliens()){
    clearInterval(interval);
  }
}, 400);

// set gun position
var gunrow = 17;
var guncolumn = 7;
grid[gunrow][guncolumn].classList.add("gun")


// move the gun
document.addEventListener('keyup', event => {
  
  if (event.code === 'ArrowLeft') {
    if(guncolumn>0){
      grid[gunrow][guncolumn].classList.remove("gun")
      guncolumn--;
      grid[gunrow][guncolumn].classList.add("gun")
    }
  } else if (event.code === 'ArrowRight') {
    if(guncolumn<columns-1){
      grid[gunrow][guncolumn].classList.remove("gun")
      guncolumn++;
      grid[gunrow][guncolumn].classList.add("gun")
    }
  }
  
  
  if (event.code === 'Space') {
    console.log('Space pressed');
  }
});
