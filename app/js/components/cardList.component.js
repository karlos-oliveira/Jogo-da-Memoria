app.component("jmCardList", {
      templateUrl: "app/views/components/cardList.component.html",
      controller: CtrlCardList
  });

  function CtrlCardList($location, $timeout, cardService, userService, rankService)
  {
      let vm = this;

      vm.$location = $location;
      vm.$timeout = $timeout;
      vm.cardService = cardService;
      vm.userService = userService;
      vm.rankService = rankService;
      vm.NewGame = NewGame;
      vm.onTurnEnd = onTurnEnd;
      vm.BlockCard = BlockCard;
      vm.Reset = Reset
      vm.onFlip = onFlip;
      vm.ChangePlayer = ChangePlayer;

      vm.NewGame();
  }

  function NewGame()
  {
      this.isVerifying = false;
      this.flipped = [];
      this.turns = 0;
      this.cards = [];
      this.cards = Group(Shuffle(this.cardService.getCards()), 7);
      this.rankList = this.rankService.getRankSorted(true);
      this.User = this.userService.getUser();
  }

  function ChangePlayer(){
    this.$location.path("/login");
  }
  function onFlip()
  {
      if(this.flipped.length == 2)
      {
          this.onTurnEnd();
          this.flipped = [];
      }
  };

  function onTurnEnd(){
      this.isVerifying = true;
      this.turns++;
      let arr = this.cards.flat(1).filter((card) => !card.blocked && card.flipped);

      if(arr[0].id == arr[1].id)
        this.BlockCard(arr[0].id);
      else
        this.Reset();
  };

  function BlockCard(_id){
      this.cards.forEach(row => {
        row.forEach(card => {
          if(card.id == _id)
            card.blocked = true;
        });
      });

      let isGameOver = (this.cards.flat(1).filter((card) => !card.blocked && !card.flipped).length == 0);
      
      if(isGameOver)
      {
        this.User.turns = this.turns;
        this.rankService.addRank(this.User);
        this.rankList = this.rankService.getRankSorted(true);
        document.querySelector("#btnShowModalGameOver").click();
      }

      this.isVerifying = false;
  };

  function Reset(){
      this.$timeout(() => { 
        this.cards.forEach(row => {
          row.forEach(card => {
            if(!card.blocked && card.flipped)
            {
              card.flipped = false;
              card.style.transform = "";
            }
          });
        });
        this.isVerifying = false;
      }, 1500);
  };

  function Group(array, max){
      let res = [];

      for (let i = 0; i < array.length; i=i+(max)) {
        res.push(array.slice(i, (i + max)));
      }

      return res;
  };

  function Shuffle(array){
    let m = array.length, t, i;

    while(m){
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
  };