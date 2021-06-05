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

function createPlayer( queue, player ){
    const start = document.querySelector('.arenas')
    const parent = document.createElement('div');
    parent.classList.add(queue);
    start.append(parent)

    const child1= document.createElement('div');
    parent.appendChild(child1);
    child1.classList.add('progressbar');

    const ch1grand1= document.createElement('div');
    child1.appendChild(ch1grand1);
    ch1grand1.classList.add('life');
    ch1grand1.style.width=player.hp+'%'

    const ch1grand2= document.createElement('div');
    child1.appendChild(ch1grand2);
    ch1grand2.classList.add('name');
    ch1grand2.innerHTML=player.name;

    const child2= document.createElement('div');
    parent.appendChild(child2);
    child2.classList.add('character');
    child2.addEventListener("click",()=>{
        const damage = Math.floor(Math.random() *30)
        player.hp-=damage
        player.attack()
        ch1grand1.style.width=player.hp+'%'
        if (player.hp===0){
            alert('FINISH HIM')
        } else if (player.hp<0){
            alert(player.name + ' lose!')
            location.reload()
    }
    })

    const ch2grand1= document.createElement('img');
    ch2grand1.src=player.img;
    child2.appendChild(ch2grand1);
}


const player1 = {
    name:'scorpion',
    hp : 50,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon:[],
    attack: function(){
        console.log(this.name +' Fight...')   
    }
};

const player2 = {
    name:'kitana',
    hp : 80,
    img:'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon:[],
    attack: function(){
        console.log(this.name +' Fight...')   
    }
};


createPlayer('player1', player1);
createPlayer('player2', player2);

