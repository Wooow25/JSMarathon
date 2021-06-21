import {createElem} from './add/utils.js'

const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');
const $enemy = document.querySelector('.enemy');
const $buttons = document.querySelectorAll('.button');
const $back = document.querySelector('.backpage');
var clicked=0;

function createEmptyPlayerBlock() {
    const el = createElem('div', ['character', 'div11', 'disabled']);
    const img = createElem('img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}


const mouseMovef = (imgSrc, item) =>{
    if (imgSrc === null){
        if (clicked===1){
            $enemy.children[0].src=item.img;
        }else if (clicked===0){
            $player.children[0].src=item.img;
        }
    }
}


async function init() {
    localStorage.removeItem('player1');
    const players = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
    let imgSrc = null;
    createEmptyPlayerBlock();

    const q1 = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
    const q2= await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());

    
    // на каждую кнопку (Random, Choose Player, Choose both)
    $buttons.forEach(button =>{
        //вешаем клик
        button.addEventListener('click', event=>{
            const target=  event.target.innerHTML;
            //скрываем затемнение и сами кнопки
            $back.style.display='none';

            //закружаем аватары и вещаем обработчик для загрузки гиф
            players.forEach(item => {
            const el = createElem('div', ['character', `div${item.id}`]);
            const img = createElem('img');
            el.addEventListener('mousemove',function(){mouseMovef(imgSrc,item,$player)},false) 
            img.src = item.avatar;
            img.alt = item.name;
            el.appendChild(img);
            $parent.appendChild(el);

            //если была нажата кнопка с текстом (далее по кейсам)
            switch (target.trim()){

                case 'All Random': console.log('RANDOM');
                //снимаем обработчик mousemove
                const elClone = el.cloneNode(true);
                    el.parentNode.replaceChild(elClone, el);

                    //загружаем gif по данным от сервера
                    $player.children[0].src=q1.img;
                    $enemy.children[0].src=q2.img;
                    
                    localStorage.setItem('player1', JSON.stringify(q1));
                    localStorage.setItem('player2', JSON.stringify(q2));
                    //выводим надпись fight
                    const fight = createElem('img','fight');
                    fight.src='../assets/fight.gif';
                    $parent.appendChild(fight);
                    //переход на другую страницу
                    setTimeout(() => {
                        window.location.pathname = 'arena.html'
                    }, 2000);
                    break;


                case 'Choose player': console.log('ONE');
                //вещаем клики на аватар
                    el.addEventListener('click', () => {
                        localStorage.setItem('player1', JSON.stringify(item));
                        //загружаем gif врага от сервера
                        $enemy.children[0].src=q2.img;
                        localStorage.setItem('player2', JSON.stringify(q2));
                        el.classList.add('active');
                        //выводим надпись fight
                        const fight = createElem('img','fight');
                        fight.src='../assets/fight.gif';
                        $parent.appendChild(fight);
                         //переход на другую страницу
                        setTimeout(() => {
                            window.location.pathname = 'arena.html'
                        }, 2000);
                    });
                    break;


                case 'Choose both': console.log('TWO');
                    el.addEventListener('click', () => {
                        ++clicked; 
                        //считаем клики чтобы понимать кого мы выбираем 
                        //велосипед, конечно, получился
                        if (clicked===1){ //выбрали игрока
                            localStorage.setItem('player1', JSON.stringify(item));
                            el.classList.add('active');
                            choose = true;
                        }
                        if (clicked===2){ // выбрали врага
                            localStorage.setItem('player2', JSON.stringify(item));
                            el.classList.add('active');
                            //надпись fight
                            const fight = createElem('img','fight');
                            fight.src='../assets/fight.gif';
                            $parent.appendChild(fight);   
                            //переход на другую страницу     
                            setTimeout(() => {
                                window.location.pathname = 'arena.html'
                            }, 1000);

                        }

                    });
                    break;
                default: console.log('smth wrong');
            }
        })
    })
    
    
    }
    )}

init();
