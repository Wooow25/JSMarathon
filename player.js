function changeHP(damage) {
    if (this.hp - damage <=0){
        this.hp = 0;
    } else{
        this.hp -=  damage; 
    }
}

function elHP(){
    return document.querySelector('.player'+this.numb +' .life')
}

function renderHP(){
    this.elHP().style.width=this.hp+'%';
}


export const player1 = { 
    numb: '1',
    name:'scorpion',
    hp : 100,
    img:'img/scorpion.gif',
    weapon:[],
    changeHP,
    renderHP,
    elHP,
};

export const player2 = {
    numb: '2',
    name:'kitana',
    hp : 100,
    img:'img/kitana.gif',
    weapon:[],
    changeHP,
    renderHP,
    elHP,
};




// function Player(name, img='', weapon=[], hp=100) {
//     this.name=name,
//     this.hp= hp,
//     this.img=img,
//     this.weapon=weapon,
//     this.attack = function(){
//         console.log(name +' Fight...')
//     };
//   }
  
// const player1 = new Player("scorpion",'img/scorpion.gif'); 
// const player2 = new Player("kitana",'img/kitana.gif'); 
