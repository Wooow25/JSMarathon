import {getRandom,createElem, generateLogs} from "./utils.js";
 
const HIT ={
    head:30,
    body:20,
    foot:15,
}

const ATTACK = ['head','body','foot'];
const formFight = document.querySelector('.control ');

export const enemyAttack =() =>{
    const hit = ATTACK[getRandom(3)-1];
    const defence = ATTACK[getRandom(3)-1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

export const playerAttack = () =>{
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

export const winnTitle = createElem('div','loseTitle');
export const fightResult = (player1, player2) =>{
    if (player1.hp<=0 && player2.hp<=0){
        winnTitle.innerHTML= 'draw';
        generateLogs( 'draw' , player1, player2);
        return true
    } else if (player1.hp<=0){
        winnTitle.innerHTML= player2.name +' win';
        generateLogs( 'end' , player2, player1);
        return true

    } else if (player2.hp<=0) {
        winnTitle.innerHTML= player1.name +' win';
        generateLogs('end', player1, player2);
        return true
    } 
    return false
}