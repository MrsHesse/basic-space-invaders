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
    // moving down - start at bottom row then move up
    // new bottom line
    
    for( let r=alienrow+aliens_rows; r>=alienrow;r--){
      for (let c=aliencolumn; c<aliencolumn+aliens_per_row; c++){
        if(grid[r][c].classList.contains("alien"))
        {
          grid[r+1][c].classList.add("alien");
        } else {
          grid[r+1][c].classList.remove("alien");
        }
        // remove the previous alien status
        grid[r][c].classList.remove("alien");
      }
    }
    alienrow++;
  } else if (xoffset>0) {
    // moving right
    // start on the right column
    // move the alien status to the next tile on the right
    for(let r=alienrow; r<alienrow+aliens_rows; r++){
      for (let c=aliencolumn+aliens_per_row-1; c>=aliencolumn; c--){
        if(grid[r][c].classList.contains("alien") ){
          grid[r][c+1].classList.add("alien");
        }
        grid[r][c].classList.remove("alien");
      }
    }
    aliencolumn++;
  } else {
    // remove aliens on the right and add aliens on the left
    for(let r=alienrow; r<alienrow+aliens_rows; r++){
      for (let c=aliencolumn; c<aliencolumn+aliens_per_row; c++){
        // set tile to the right to the same alien status
        if(grid[r][c].classList.contains("alien") ){
          grid[r][c-1].classList.add("alien");
        }
        grid[r][c].classList.remove("alien");
      }
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


// list of bullets
var bullets=[]

// fire a bullet
function fire(){
  // add a bullet in tile above the current gun location
  grid[gunrow-1][guncolumn].classList.add("bullet")

  // add the bullet to the current list of bullets
  bullets.push([gunrow-1,guncolumn])
}

// move all the bullets up one square
// return a list of alien tiles that have been hit
// return [] if no hits
function moveBullets(){
  var newbullets=[];

  bullets.forEach(function(bullet) {
    var r = bullet[0];
    var c = bullet[1];

    if (r>=0){
      console.log("bullet " + bullet);
      var btile = grid[r][c];

      if (btile.classList.contains('bullet')){
        btile.classList.remove("bullet")
        r-=1;
        
        if(r>=0){
          grid[r][c].classList.add("bullet");
          newbullets.push([r,c]);
        }  
      }
    }
    
  });

  bullets=newbullets;
}

// check if any aliens have been hit and destroy them
function checkForHits(){

  console.log("checkForHits()")
  // find all tiles which have class alien and bullet
  const hits = document.getElementsByClassName("alien bullet");

  console.log("      " + hits.length + " hits found")
  Array.from(hits).forEach( function(hit){
    // remove the alien and bullet class from the tile
    hit.classList.remove('alien', 'bullet')

    // remove the bullet from the list
    // cant't do as we do not have the bullet grid.
    // use moveBullet - remove bullet from list if the 
    // bullet class no longer exists at that grid location.

  });
  

}

var bulletinterval = setInterval(function(){
  moveBullets();
  checkForHits();
}, 400);


// move the gun and shoot
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
    fire();
  }
});
