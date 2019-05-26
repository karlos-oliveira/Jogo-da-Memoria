app.component("jmCard", {
    templateUrl: "app/views/components/card.component.html",
    bindings: { card: '='},
    require: {
        ctrlJmList:"^^jmCardList"
    },
    controller: CtrlCard
  });

  function CtrlCard() {
    var vm = this;

    vm.flip = function(){
        if(vm.card.blocked || vm.ctrlJmList.isVerifying)
            return;

        if(typeof vm.card.style === "undefined")
            vm.card.style = {"transform": ""};

        if(vm.card.style.transform == "")
        {
            vm.card.style.transform = "rotateY(180deg)";
            vm.card.flipped = true;
            vm.ctrlJmList.flipped.push(vm.card);
        }

        vm.ctrlJmList.onFlip();
    };
}