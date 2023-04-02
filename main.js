if(MyMod === undefined) var MyMod = {};
if(typeof CCSE == 'undefined') Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js');

MyMod.launch = function(){
  MyMod.isLoaded = 1;
  Game.registerMod('cycliusCalc', {
    init: function () {
      Game.Notify(`Cyclius Calculator loaded!`, '', [16, 5]);
      CCSE.MinigameReplacer(this.init, 'Temple');
    },
    init: function () {
      var mg = Game.Objects['Temple'].minigame;
      this.cyclius = mg.gods['ages'];

      this.loadStyle();
      setInterval(() => this.update(), 100);
    },
    update: function () {
      this.cyclius.desc1 =
        loc('Effect cycles over %1 hours.', 3) + this.render(3, 'diamond');
      this.cyclius.desc2 =
        loc('Effect cycles over %1 hours.', 12) + this.render(12, 'ruby');
      this.cyclius.desc3 =
        loc('Effect cycles over %1 hours.', 24) + this.render(24, 'jade');
    },
    render: function (cycle, slot) {
      var mult = this.getMult(this.getTime(), cycle);
      var nextMult = this.getMult(this.getTime() + 1 / 3600000, cycle);
      return (
        `<span class="cyclius-calc-item cyclius-calc-bis ${
          this.getBest(this.getTime()) == slot ? 'cyclius-calc-isBest' : ''
        }">⭐</span>` +
        `<span class="cyclius-calc-item ${
          mult < 0 ? 'red' : 'green'
        }" data-state="${mult < nextMult ? 'increasing' : 'decreasing'}">` +
        (mult < 0 ? '' : '+') +
        mult.toFixed(2) +
        '%</span>'
      );
    },
    getBest: function (time) {
      var diamondAvg = [],
        rubyAvg = [],
        jadeAvg = [];

      for (let i = 1; i <= 60; i++) {
        diamondAvg.push(this.getMult(time + i / 60, 3));
        rubyAvg.push(this.getMult(time + i / 60, 12));
        jadeAvg.push(this.getMult(time + i / 60, 24));
      }

      diamondAvg = diamondAvg.reduce((p, c) => p + c, 0) / diamondAvg.length;
      rubyAvg = rubyAvg.reduce((p, c) => p + c, 0) / rubyAvg.length;
      jadeAvg = jadeAvg.reduce((p, c) => p + c, 0) / jadeAvg.length;

      if (
        diamondAvg > rubyAvg &&
        diamondAvg > jadeAvg &&
        diamondAvg > 0 &&
        this.getMult(this.getTime(), 3) >= 0
      ) {
        return 'diamond';
      } else if (
        rubyAvg > diamondAvg &&
        rubyAvg > jadeAvg &&
        rubyAvg > 0 &&
        this.getMult(this.getTime(), 12) >= 0
      ) {
        return 'ruby';
      } else if (
        jadeAvg > diamondAvg &&
        jadeAvg > rubyAvg &&
        jadeAvg > 0 &&
        this.getMult(this.getTime(), 24) >= 0
      ) {
        return 'jade';
      } else {
        return 'none';
      }
    },
    getTime: function () {
      return new Date().getTime() / 60 / 60 / 1000;
    },
    getMult: function (time, cycle) {
      return Math.sin(time * (Math.PI / cycle) * 2) * 15;
    },
    loadStyle: function () {
      var css = `.cyclius-calc-bis{visibility:hidden;margin-left:.25rem}.cyclius-calc-isBest{visibility:visible}.cyclius-calc-item{float:right}.cyclius-calc-item[data-state=decreasing]::after,.cyclius-calc-item[data-state=increasing]::after{font-size:75%;margin-left:.25rem}.cyclius-calc-item[data-state=increasing]::after{content:'▲';color:#3f0}.cyclius-calc-item[data-state=decreasing]::after{content:'▼';color:#f30}`;

      (head = document.head || document.getElementsByTagName('head')[0]),
        (style = document.createElement('style'));

      head.appendChild(style);

      style.type = 'text/css';
      if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    },
  });
}

if(!MyMod.isLoaded){
	if(CCSE && CCSE.isLoaded){
		MyMod.launch();
	}
	else{
		if(!CCSE) var CCSE = {};
		if(!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(MyMod.launch);
	}
}
