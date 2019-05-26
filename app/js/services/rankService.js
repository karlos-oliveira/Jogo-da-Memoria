app.service("rankService", function(){ 

    this.addRank = (user) => {
        let ranks = (localStorage.getItem("rankList") == null) ? [] : JSON.parse(localStorage.getItem("rankList"));
        ranks.push(user);
        localStorage.setItem("rankList", JSON.stringify(ranks));
    };

    this.getRank = () => {
        let ranks = (localStorage.getItem("rankList") == null) ? [] : JSON.parse(localStorage.getItem("rankList"));
        return ranks;
    };

    this.getRankSorted = (isASC) => {
        let ranks = this.getRank();

        if(ranks.length == 0)
            return ranks;
        else if(isASC)
            return ranks.sort(SortASC);
        else
            return ranks.sort(SortDESC);
    };

    function SortASC(a, b) {
        if (a.turns > b.turns) {
          return 1;
        }

        if (a.turns < b.turns) {
          return -1;
        }

        return 0;
      };

      function SortDESC(a, b) {
        if (a.turns <b.turns) {
          return 1;
        }

        if (a.turns > b.turns) {
          return -1;
        }

        return 0;
      };
});
