if (cycliusCalc === undefined) var cycliusCalc = {};
if (typeof CCSE == 'undefined')
  Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js');
var MyMod = cycliusCalc;

MyMod.launch = function () {
  Game.registerMod('cycliusCalc', {
    init: function () {
      Game.Notify(`Cyclius Calculator loaded!`, '', [16, 5]);
      let MOD = this;

      CCSE.MinigameReplacer(() => MOD.loadMod(), 'Temple');
      MyMod.isLoaded = 1;
    },
    loadMod: function () {
      this.loadCSS(this.dir + '/main.css');
      requestAnimationFrame(() => this.renderMod());
    },
    getMult: function (time, slot) {
      switch (slot) {
        case 'diamond':
          var cycle = 3;
          break;
        case 'ruby':
          var cycle = 12;
          break;
        case 'jade':
          var cycle = 24;
          break;
        default:
          return 0;
      }
      return Math.sin(time * (Math.PI / cycle) * 2) * 15;
    },
    getBest: function (time) {
      const avg = (arr) => arr.reduce((acc, curr) => acc + curr) / arr.length;
      var diaAvg = [],
        rubyAvg = [],
        jadeAvg = [];

      switch (Game.hasGod('ages')) {
        case 1:
          var activeSlot = 'diamond';
          break;
        case 2:
          var activeSlot = 'ruby';
          break;
        case 3:
          var activeSlot = 'jade';
          break;
        default:
          var activeSlot = 'none';
          break;
      }

      const current = this.getMult(time, activeSlot),
        dia = this.getMult(time, 'diamond'),
        ruby = this.getMult(time, 'ruby'),
        jade = this.getMult(time, 'jade');

      for (let i = 1; i <= 60; i++) {
        diaAvg.push(this.getMult(time + i / 60, 'diamond'));
        rubyAvg.push(this.getMult(time + i / 60, 'ruby'));
        jadeAvg.push(this.getMult(time + i / 60, 'jade'));
      }

      diaAvg = avg(diaAvg);
      rubyAvg = avg(rubyAvg);
      jadeAvg = avg(jadeAvg);

      if (
        jadeAvg >= rubyAvg &&
        jadeAvg >= diaAvg &&
        jade >= current &&
        jade >= 0
      )
        return 'jade';
      else if (
        rubyAvg >= jadeAvg &&
        rubyAvg >= diaAvg &&
        ruby >= current &&
        ruby >= 0
      )
        return 'ruby';
      else if (
        diaAvg >= jadeAvg &&
        diaAvg >= rubyAvg &&
        dia >= current &&
        dia >= 0
      )
        return 'diamond';
      else if (current >= 0) return activeSlot;
      else return 'none';
    },
    renderMod: function () {
      var now = new Date().getTime() / 1000 / 60 / 60;
      var cyclius = Game.Objects['Temple'].minigame.gods.ages;
      const el = (slot) =>
        `<div class="cyclius-calc-container ${slot}-container"><span class="cyclius-calc-value ${slot}-value ${
          this.getMult(now, slot) > 0 ? 'green' : 'red'
        }" data-is-increasing="${this.getMult(now, slot) < this.getMult(now + 1 / 1000 / 60 / 60, slot) ? 'true' : 'false'}">${
          (this.getMult(now, slot) > 0 ? '+' : '-') +
          Beautify(Math.abs(this.getMult(now, slot)), 2) +
          '%'
        }</span><span class="cyclius-calc-bis ${slot}-bis" data-is-best="${this.getBest(now) == slot ? 'true' : 'false'}">⭐</span></div>`;
      cyclius.desc1 = loc('Effect cycles over %1 hours.', 3) + el('diamond');
      cyclius.desc2 = loc('Effect cycles over %1 hours.', 12) + el('ruby');
      cyclius.desc3 = loc('Effect cycles over %1 hours.', 24) + el('jade');
      requestAnimationFrame(() => this.renderMod());
    },
    loadCSS: function (src) {
      var cssId = 'cycliusCalc';
      if (!document.getElementById(cssId)) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = src;
        link.media = 'all';
        head.appendChild(link);
      }
    },
  });
};

if (!MyMod.isLoaded) {
  if (CCSE && CCSE.isLoaded) {
    MyMod.launch();
  } else {
    if (!CCSE) var CCSE = {};
    if (!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
    CCSE.postLoadHooks.push(MyMod.launch);
  }
}
