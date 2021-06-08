// function Player(name, img='', weapon=[], hp=100) {
//     this.name=name,
//     this.hp= hp,
//     this.img=img,
//     this.weapon=weapon,
//     this.attack = function(){
//         console.log(name +' Fight...')
//     };
//   }
  
// const player1 = new Player("scorpion",'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'); 
// const player2 = new Player("kitana",'http://reactmarathon-api.herokuapp.com/assets/kitana.gif'); 

function createElem(tag, classname){
    const $tag = document.createElement(tag)
    if (classname){
        $tag.classList.add(classname);
    }
    return $tag
}

const start = document.querySelector('.arenas')
function createPlayer( player ){
    const playNum = createElem('div','player'+player.numb);

    const progressbar= createElem('div','progressbar' );
    playNum.appendChild(progressbar);

    const life= createElem('div','life');
    progressbar.appendChild(life);
    life.style.width=player.hp+'%'

    const name= createElem('div','name');
    progressbar.appendChild(name);
    name.innerHTML=player.name;

    const character= createElem('div','character');
    playNum.appendChild(character);
    const img= createElem('img');
    img.src=player.img;
    character.appendChild(img);

    // start.append(playNum)
    return playNum;
}


const player1 = {
    numb: '1',
    name:'scorpion',
    hp : 100,
    img:'img/scorpion.gif',
    weapon:[],
    attack: function(){
        console.log(this.name +' Fight...')   
    }
};

const player2 = {
    numb: '2',
    name:'kitana',
    hp : 100,
    img:'img/kitana.gif',
    weapon:[],
    attack: function(){
        console.log(this.name +' Fight...')   
    },


};

const randomButton = document.querySelector('.button');

function getRandom(number){
    return Math.floor(Math.random() *number); 
}

// function changeHP(player){
//     const playerLife = document.querySelector('.player'+player.numb+' .life');
//     player.hp -=  getRandom(20); 
//     if (player.hp>0){
//         playerLife.style.width=player.hp+'%';
//     }else{
//         playerLife.style.width=0+'%';

//     }
// }


function changeHP(damage){
    if (this.hp - damage <=0){
        this.hp = 0;
    } else{
        this.hp -=  damage; 
    }
}

function elHP(){
    return document.querySelector('.player'+this.numb)
}

function renderHP(hp){
    elHP(player).style.width=player.hp+'%';
}




const winnTitle = createElem('div','loseTitle');
function fightResult(){
    console.log( player1.name + ' ' +player1.hp);
    console.log( player2.name + ' ' +player2.hp);
    if (player1.hp<=0 && player2.hp<=0){
        winnTitle.innerHTML= 'draw';
        return true
    } else if (player1.hp<=0){
        winnTitle.innerHTML= player2.name +' win';
        return true

    } else if (player2.hp<=0) {
        winnTitle.innerHTML= player1.name +' win';
        return true
    } 
        
    return false
}


randomButton.addEventListener('click', ()=>{
    player1.changeHP(getRandom(20));
    console.log(player1.hp)
    const result =fightResult()
    if (result) {
        start.appendChild(winnTitle)
        randomButton.disabled = true
    }
} )


start.append(createPlayer(player1))
start.append(createPlayer(player2))