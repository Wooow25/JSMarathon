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


const start = document.querySelector('.arenas');
const fightButton = document.querySelector('.button');
const winnTitle = createElem('div','loseTitle');
const formFight = document.querySelector('.control ');

const player1 = {
    numb: '1',
    name:'scorpion',
    hp : 100,
    img:'img/scorpion.gif',
    weapon:[],
    attack: function(){
        console.log(this.name +' Fight...')   
    },
    changeHP,
    renderHP,
    elHP,
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
    changeHP,
    renderHP,
    elHP,

};


const HIT ={
    head:30,
    body:20,
    foot:15,
}

const ATTACK = ['head','body','foot'];




function createReloadButton(){
    const reloadWrap = createElem('div', "reloadWrap");
    const button = createElem('button', "button");
    reloadWrap.appendChild(button)
    start.appendChild(reloadWrap)
    button.innerHTML= "Restart";
    button.addEventListener('click', function(){
        window.location.reload()
    } )
        
    
}

function createElem(tag, classname){
    const $tag = document.createElement(tag)
    if (classname){
        $tag.classList.add(classname);
    }
    return $tag
}

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

    return playNum;
}

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

function getRandom(number){
    return Math.ceil(Math.random()*number); 
}

function fightResult(){
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

function enemyAttack(){
    const hit = ATTACK[getRandom(3)-1];
    const defence = ATTACK[getRandom(3)-1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function playerAttack(){
    const attack ={};
    for (let item of formFight){
        if (item.checked && item.name === 'hit' ){
            attack.value = getRandom(HIT[item.value]);
            attack.hit= item.value
        }
        if (item.checked && item.name === 'defence' ){
            attack.defence = item.value;
        }
        item.checked = false;
    }
    return attack
}

start.append(createPlayer(player1))
start.append(createPlayer(player2))

formFight.addEventListener('submit',function(event) {
    event.preventDefault();

    const attack = playerAttack();
    const enemy = enemyAttack();

    console.log('BEFORE:   '+player1.name +' '+ player1.hp+'      '+player2.name +' '+ player2.hp)
    console.log(player1.name +' attack '+ attack.hit +' with '+attack.value +' and defence '+attack.defence)
    console.log(player2.name +' attack '+ enemy.hit +' with '+enemy.value +' and defence '+enemy.defence)

    if (attack.defence !== enemy.hit){
        player1.changeHP(attack.value)
        player1.renderHP()
    }

    if (enemy.defence !== attack.hit){
        player2.changeHP(enemy.value)
        player2.renderHP()
    }

    console.log('AFTER:   '+player1.name +' '+ player1.hp+'      '+player2.name +' '+ player2.hp)
    console.log('____________________________')

    const result =fightResult()
    if (result) {
        start.appendChild(winnTitle);
        fightButton.disabled = true;
        createReloadButton();
    }
        
})