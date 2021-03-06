class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leaderboardTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    
  }

 

  showLeaderBoard(){

    var leader1, leader2;
    var players = Object.values(allPlayers);

    if((players[0].rank === 0 && players[1].rank === 0)|| players[0].rank ==1){

      leader1 = players[0].rank + "&emsp;" + players[0].name  +"&emsp;"+players[0].score;
      leader2 = players[1].rank + "&emsp;" + players[1].name  +"&emsp;"+players[1].score;

    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }


  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.leaderboardTitle.html("Placar");
    this.leaderboardTitle.class("resetText");
    this.leaderboardTitle.position(width/9 -60,120);

    this.leader1.class("leadersText");
    this.leader1.position(width/9 - 50,160);
    
    this.leader2.class("leadersText");
    this.leader2.position(width/9 - 50,200);

    //fazer o botão Reiniciar

  }

  //fazer a função para resetar o banco de dados

  play() {
    this.handleElements();

    //chamar a função que reinicia o banco de dados caso o botão for clicado    

    
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height *5, width, height * 6);
      this.showLeaderBoard();
      //índice da matriz
      var index = 0;
      for (var plr in allPlayers) {
        //adicione 1 ao índice para cada loop
        index = index + 1;

        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          //alterar a posição da câmera na direção y
          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }
      }

      this.handlePlayerControls();

      drawSprites();
    }
  }

  handlePlayerControls() {
    // manipulando eventos de teclado
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
   
   
  }
}
