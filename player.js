import {createElem} from "./utils.js";

class Player{
    constructor(props){
        this.numb=props.numb;
        this.name=props.name;
        this.hp= props.hp;
        this.img=props.img;
        this.selector = `player${this.numb}`;
        this.rootSelector = props.rootSelector;
        this.attack = function(){
            console.log(this.name +' Fight...')
        };
    }

     changeHP=(damage)=> {
        if (this.hp - damage <=0){
            this.hp = 0;
        } else{
            this.hp -=  damage; 
        }
    }

     elHP=()=>{
        return document.querySelector(`.${this.selector} .life`)
    }
    
     renderHP=()=>{
        this.elHP().style.width=this.hp+'%';
    }

    createPlayer = () =>{
        const $playNum = createElem('div',this.selector );

        const $progressbar= createElem('div','progressbar' );
        $playNum.appendChild($progressbar);

        const $life= createElem('div','life');
        $progressbar.appendChild($life);
        $life.style.width=this.hp+'%'

        const $name= createElem('div','name');
        $progressbar.appendChild($name);
        $name.innerHTML=this.name;

        const $character= createElem('div','character');
        $playNum.appendChild($character);
        const $img= createElem('img');
        $img.src=this.img;
        $character.appendChild($img);

        const start = document.querySelector(`.${this.rootSelector}`);
        start.appendChild($playNum);
        return $playNum;
    }
    
}

export default Player;



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
