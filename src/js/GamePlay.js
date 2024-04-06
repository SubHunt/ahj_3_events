export default class GamePlay {
  constructor(fields) {
    this.fields = fields;
    this.size = 4;
    this.board = null;
    this.position = 0;
    this.miss = 0;
    this.hit = 0;
  }

  init() {
    this.board = this.fields.gameField();
  
    this.board.addEventListener("click", this.onClickCell.bind(this));

    this.start();
  }

  setPosition () {
    this.board.classList.add('hammer');
    this.board.classList.remove('hammerhit');
    const position = Math.floor(Math.random() * this.size ** 2);
    this.delPosition(this.position);
    if (position === this.position) {
      this.setPosition();
      return;
    }
    else {
      this.board.children[position].classList.add('goblin');
      this.position = position;      
    }
  }

  onClickCell (e) {
    e.preventDefault();
    if (e.target.classList.contains('goblin')) {
      this.hit++;
      this.board.classList.add('hammerhit');
      this.board.classList.remove('hammer');
      this.refreshPoints('.hit', 'Попадания', this.hit);
      this.delPosition(this.position);
    } else {
      this.miss++;
      this.refreshPoints('.miss', 'Промахи', this.miss);
    }

    if (this.miss == 5) {
      alert ("Вы проиграли!");
      this.refreshPoints('.miss', 'Промахи', this.miss=0);
      this.refreshPoints('.hit', 'Попадания', this.hit=0);
    }

    if (this.hit == 5) {
      alert ("Вы победили!!!");
      this.refreshPoints('.hit', 'Попадания', this.hit=0);
      this.refreshPoints('.miss', 'Промахи', this.miss=0);
    }

  }
  
  refreshPoints(className, status, point) {
    const res = document.querySelector(className);
    res.innerHTML = `${status} = ${point}`;
  }

  delPosition (position) {
    this.board.children[position].classList.remove('goblin');
  }

  start() {
    setInterval(() => {
      this.setPosition();
    }, 1000);
  }
}

