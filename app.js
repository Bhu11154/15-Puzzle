var sizeOfGrid = 4;
var box = document.querySelectorAll(".box");
var btns = document.querySelectorAll(".choose");
var puzzle = document.getElementById("puzzle");
const solve = document.getElementById("solve");
const begin = document.getElementById("begin");
const reset = document.getElementById("reset");
const time = document.querySelector(".time");
const pause = document.querySelector("#pause");
const resume = document.querySelector("#resume");
const leaderBoard = document.querySelector(".leaderBoard");
const list = JSON.parse(localStorage.getItem("scoreBoard"));
const winners = JSON.parse(localStorage.getItem("win"))
const win = document.querySelector(".win");
const jumble = document.querySelector("#scramble");


jumble.addEventListener("click",()=>{
    scramble(sizeOfGrid);
});

var scoreBoard = new Array();
var winnerList = new Array();
if(list){
    for(var i=0; i<list.length;i++){
        scoreBoard.push(list[i]);
        winnerList.push(winners[i]);
    }
    win.innerText = getMinTime(winnerList);
}

var n=0;var stop = true;

var i=0;var min=0;var sec = 1;var timer= "00:00";var netTime = 0;


function getMinTime(arr){
    var max = 1000;
    for(var i=0;i<arr.length;i++){
        if(max>arr[i]){
            max = arr[i];
        }
    }
    return max;
}

begin.addEventListener("click",()=>{
        setInterval(() => {
            if(stop){
                netTime++;
                if(sec<=9){
                    timer = "0"+ min+ ":0" + sec++;
                }else if(sec<60){
                    timer = "0"+ min + ":" + sec++;
                }else{
                    min++;
                    sec = 0;
                    timer = "0"+ min + ":0" + sec++;
                }
                time.innerText = timer;
                win.innerText = getMinTime(winnerList);
                console.log(timer);
            }
        }, 1000);
});

pause.addEventListener("click", ()=>{
    stop = false;
});

resume.addEventListener("click", ()=>{
    stop = true;
});

solve.addEventListener("click",()=>{
    start(sizeOfGrid);
    min =0;sec=0;
    scoreBoard.push(timer);
    winnerList.push(netTime);
    netTime = -1;
    updateLS();
    leaderBoard.innerText = JSON.parse(localStorage.getItem("scoreBoard"));
    // win.innerText = JSON.parse(localStorage.getItem("wins"));
});

function update(){
    btns.forEach(btn=>{
        btn.addEventListener("click",(e)=>{
            min =0; sec=0;netTime = 0;
            var size = parseInt(e.target.id);
            sizeOfGrid = size;
            start(sizeOfGrid);
        });
    });
}

function updateLS(){
    localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
    localStorage.setItem("win",JSON.stringify(winnerList));
}

if(list){
    leaderBoard.innerText = list;
}


function start(size){
    inside = "";
            output = '';
            var counter = 1;
            row = "<div class=\"row\"> </div>";
            // console.log(sizeOfGrid);
            for(var j=1;j<=size*size;j=j+size){
                for(var i=j;i<=size*counter;i++){
                    if(i===size*size){
                        inside += "<div class=\"box empty\" id=\""+i+"\"></div>";
                    }else{
                        inside += "<div class=\"box\" id=\""+i+"\">"+i+"</div>";
                    }
                }
                output += "<div class=\"row\"> "+inside+"</div>";
                inside = "";
                counter++;
            }
            // console.log(output);
            puzzle.innerHTML = output;
            applyJs();
}



function scramble(size){
    var elements = new Array();
    for(var i=1;i<=size*size;i++){
        elements.push(i);
    }
    var currentIndex = size*size;var randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [elements[currentIndex], elements[randomIndex]] = [
      elements[randomIndex], elements[currentIndex]];
  }
  inside = "";
            output = '';
            var count = 1;
            row = "<div class=\"row\"> </div>";
            // console.log(sizeOfGrid);
            for(var j=1;j<=size*size;j=j+size){
                for(var i=j;i<=size*count;i++){
                    if(elements[i-1]===size*size){
                        inside += "<div class=\"box empty\" id=\""+i+"\"></div>";
                    }else{
                        inside += "<div class=\"box\" id=\""+i+"\">"+elements[i-1]+"</div>";
                    }
                }
                output += "<div class=\"row\"> "+inside+"</div>";
                inside = "";
                count++;
            }
            // console.log(output);
            puzzle.innerHTML = output;
            applyJs();
            console.log(elements);

}


update();
applyJs();
function applyJs(){
    var boxes = document.querySelectorAll(".box");
    boxes.forEach(box=>{
        box.addEventListener("click",(e)=>{
            console.log("seconds" +n);
            const box = document.querySelectorAll(".box");
            //console.log(e.target);
            var empty = document.querySelector(".empty");
            console.log(empty);
            neighbors = getNeighbors(parseInt(empty.id),sizeOfGrid);
            console.log(neighbors);
            var id = parseInt(e.target.id);
            // console.log(id);
            for(var i = 0; i <neighbors.length; i++){
                //console.log(i);
                console.log(neighbors[i]);
                if(id=== parseInt(neighbors[i])){
                    let val = e.target.innerText;
                    e.target.innerText = '';
                    var empty = document.querySelector(".empty");
                    //console.log(empty);
                    empty.classList.add("effect");
                    empty.innerText = val;
                    empty.classList.remove("empty");
                    e.target.classList.add("empty");
                    e.target.classList.remove("effect");
                    break;
                }
            }
        });
    });
}


function getNeighbors(id,size){
    neighbors  = new Array();
    // const a = id%size;
    // if(a!==1){
    //     neighbors.push(id-1);
    // }
    // if(a!==0){
    //     neighbors.push(id+1);
    // }
    // if(id+size<=size*size){
    //     neighbors.push(id+size);
    // }
    // if(id-size>0){
    //     neighbors.push(id-size);
    // }

    var index = id;
    while(index-size>=0){
        neighbors.push(index-size);
        index -= size;
    }
    index = id;
    while(index+size<=size*size){
        neighbors.push(index+size);
        index += size;
    }
    for(var i=1;i<=size;i++){
        if(id+i<=id+size-id%size){
            neighbors.push(id+i);
        }
        if(id-i>=0){
            neighbors.push(id-i);
        }
    }
    return neighbors;
}
