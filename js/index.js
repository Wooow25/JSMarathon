import {createElem} from './add/utils.js'

const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');
const $enemy = document.querySelector('.enemy');
const $buttons = document.querySelectorAll('.button');
const $back = document.querySelector('.backpage');

function createEmptyPlayerBlock() {
    const el = createElem('div', ['character', 'div11', 'disabled']);
    const img = createElem('img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}


const mouseMovef = (imgSrc, item, player) =>{
    if (imgSrc === null) {
        player.children[0].src=item.img
        imgSrc = item.img;
    }
}
const mouseOutf = (imgSrc, player) => {
        imgSrc = null;
        player.src = '#';
}
const clickf = () =>{
    localStorage.setItem('player1', JSON.stringify(item));
    localStorage.setItem('player2', JSON.stringify(q2));
    el.classList.add('active');
    setTimeout(() => {
        window.location.pathname = 'arena.html'
    }, 1000);
}

async function init() {
    localStorage.removeItem('player1');
    const players = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
    let imgSrc = null;
    createEmptyPlayerBlock();

    const q1 = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
    const q2= await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());

    

    $buttons.forEach(button =>{
        button.addEventListener('click', event=>{
            const target=  event.target.innerHTML;
            switch (target.trim()){
                case 'All Random': console.log('RANDOM');
                    // Почему код здесь выдает ошибку?  Unexpected reserved word
                    // const q1 = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
                    // const q2= await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
                    localStorage.setItem('player1', JSON.stringify(q1));
                    localStorage.setItem('player2', JSON.stringify(q2));
                    $back.style.display='none';
                    setTimeout(() => {
                        window.location.pathname = 'arena.html'
                    }, 1000);
                    break;


                case 'Choose player': console.log('ONE');
                    $back.style.display='none';
                    players.forEach(item => {
                    const el = createElem('div', ['character', `div${item.id}`]);
                    const img = createElem('img');

                    el.addEventListener('mousemove',function(){mouseMovef(imgSrc,item,$player)},false) 
                    el.addEventListener('mouseout', function(){mouseOutf(imgSrc, $player)},false)

                    el.addEventListener('click', () => {
                        localStorage.setItem('player1', JSON.stringify(item));
                        localStorage.setItem('player2', JSON.stringify(q2));
                        el.classList.add('active');
                        setTimeout(() => {
                            window.location.pathname = 'arena.html'
                        }, 1000);
                    });

                    img.src = item.avatar;
                    img.alt = item.name;
                    el.appendChild(img);
                    $parent.appendChild(el);
    });
                 break;
                case 'Choose both': console.log('TWO');
                $back.style.display='none';
                players.forEach(item => {
                    const el = createElem('div', ['character', `div${item.id}`]);
                    const img = createElem('img');
            
                    el.addEventListener('mousemove',function(){mouseMovef(imgSrc,item,$player)}, false) 
                    el.addEventListener('mouseout', function(){mouseOutf(imgSrc, $player)}, false)
                    var check = false;
                    el.addEventListener('click', () => {
                        localStorage.setItem('player1', JSON.stringify(item));
                        el.classList.add('active');
                        // check =true;
                        
                        // setTimeout(() => {
                        //     window.location.pathname = 'arena.html'
                        // }, 1000);
                    });

                    img.src = item.avatar;
                    img.alt = item.name;
                    el.appendChild(img);
                    $parent.appendChild(el);
                    
                    if (check){
                        const elems = document.querySelectorAll('.character')
                        elems.forEach(character => {
                            const elClone = character.cloneNode(true);
                            character.parentNode.replaceChild(elClone, character);
                        });
                    }


                });

                 break;
                default: console.log('smth wrong');
            }
        })
    })
    
    
}

init();
