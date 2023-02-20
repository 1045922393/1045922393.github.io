
(function () {
  "use strict";
  const scriptDom = document.createElement("script");
  scriptDom.setAttribute("type", "text/javascript");
  scriptDom.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/gh/Fuukei/Public_Repository@latest/static/js/sakura-less.js",
  );
  document.body.appendChild(scriptDom);
})();
(function () {
  "use strict";
  // var a_idx = 0;
  function Color() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ",0.8)";
  }
  let books = [
    `天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。金生丽水，玉出昆冈。剑号巨阙，珠称夜光。果珍李柰，菜重芥姜。海咸河淡，鳞潜羽翔。龙师火帝，鸟官人皇。始制文字，乃服衣裳。推位让国，有虞陶唐。吊民伐罪，周发殷汤。坐朝问道，垂拱平章。爱育黎首，臣伏戎羌。遐迩一体，率宾归王。鸣凤在竹，白驹食场。化被草木，赖及万方。盖此身发，四大五常。恭惟鞠养，岂敢毁伤。女慕贞洁，男效才良。知过必改，得能莫忘。罔谈彼短，靡恃己长。信使可覆，器欲难量。墨悲丝染，诗赞羔羊。景行维贤，克念作圣。德建名立，形端表正。空谷传声，虚堂习听。祸因恶积，福缘善庆。尺璧非宝，寸阴是竞。资父事君，曰严与敬。孝当竭力，忠则尽命。临深履薄，夙兴温凊。似兰斯馨，如松之盛。川流不息，渊澄取映。容止若思，言辞安定。笃初诚美，慎终宜令。荣业所基，籍甚无竟。学优登仕，摄职从政。存以甘棠，去而益咏。乐殊贵贱，礼别尊卑。上和下睦，夫唱妇随。外受傅训，入奉母仪。诸姑伯叔，犹子比儿。孔怀兄弟，同气连枝。交友投分，切磨箴规。仁慈隐恻，造次弗离。节义廉退，颠沛匪亏。性静情逸，心动神疲。守真志满，逐物意移。坚持雅操，好爵自縻。都邑华夏，东西二京。背邙面洛，浮渭据泾。宫殿盘郁，楼观飞惊。图写禽兽，画彩仙灵。丙舍旁启，甲帐对楹。肆筵设席，鼓瑟吹笙。升阶纳陛，弁转疑星。右通广内，左达承明。既集坟典，亦聚群英。杜稿钟隶，漆书壁经。府罗将相，路侠槐卿。户封八县，家给千兵。高冠陪辇，驱毂振缨。世禄侈富，车驾肥轻。策功茂实，勒碑刻铭。磻溪伊尹，佐时阿衡。奄宅曲阜，微旦孰营。桓公匡合，济弱扶倾。绮回汉惠，说感武丁。俊乂密勿，多士寔宁。晋楚更霸，赵魏困横。假途灭虢，践土会盟。何遵约法，韩弊烦刑。起翦颇牧，用军最精。宣威沙漠，驰誉丹青。九州禹迹，百郡秦并。岳宗泰岱，禅主云亭。雁门紫塞，鸡田赤城。昆池碣石，钜野洞庭。旷远绵邈，岩岫杳冥。治本于农，务兹稼穑。俶载南亩，我艺黍稷。税熟贡新，劝赏黜陟。孟轲敦素，史鱼秉直。庶几中庸，劳谦谨敕。聆音察理，鉴貌辨色。贻厥嘉猷，勉其祗植。省躬讥诫，宠增抗极。殆辱近耻，林皋幸即。两疏见机，解组谁逼。索居闲处，沉默寂寥。求古寻论，散虑逍遥。欣奏累遣，戚谢欢招。渠荷的历，园莽抽条。枇杷晚翠，梧桐早凋。陈根委翳，落叶飘摇。游鹍独运，凌摩绛霄。耽读玩市，寓目囊箱。易輶攸畏，属耳垣墙。具膳餐饭，适口充肠。饱饫烹宰，饥厌糟糠。亲戚故旧，老少异粮。妾御绩纺，侍巾帷房。纨扇圆絜，银烛炜煌。昼眠夕寐，蓝笋象床。弦歌酒宴，接杯举觞。矫手顿足，悦豫且康。嫡后嗣续，祭祀烝尝。稽颡再拜，悚惧恐惶。笺牒简要，顾答审详。骸垢想浴，执热愿凉。驴骡犊特，骇跃超骧。诛斩贼盗，捕获叛亡。布射僚丸，嵇琴阮啸。恬笔伦纸，钧巧任钓。释纷利俗，并皆佳妙。毛施淑姿，工颦妍笑。年矢每催，曦晖朗曜。璇玑悬斡，晦魄环照。指薪修祜，永绥吉劭。矩步引领，俯仰廊庙。束带矜庄，徘徊瞻眺。孤陋寡闻，愚蒙等诮。谓语助者，焉哉乎也。`,
    `人之初，性本善。性相近，习相远。苟不教，性乃迁。教之道，贵以专。昔孟母，择邻处。子不学，断机杼。窦燕山，有义方。教五子，名俱扬。养不教，父之过。教不严，师之惰。子不学，非所宜。幼不学，老何为。玉不琢，不成器。人不学，不知义。为人子，方少时。亲师友，习礼仪。香九龄，能温席。孝于亲，所当执。融四岁，能让梨，悌于长，宜先知。首孝悌，次见闻。知某数，识某文。一而十，十而百。百而千，千而万。三才者，天地人。三光者，日月星。三纲者，君臣义。父子亲，夫妇顺。曰春夏，曰秋冬。此四时，运不穷。曰南北，曰西东。此四方，应乎中。曰水火，木金土。此五行，本乎数。十干者，甲至癸。十二支，子至亥。曰黄道，日所躔。曰赤道，当中权。赤道下，温暖极。我中华，在东北。寒燠均，霜露改。右高原，左大海。曰江河，曰淮济。此四渎，水之纪。曰岱华，嵩恒衡。此五岳，山之名。古九州，今改制，称行省，三十五。曰士农，曰工商。此四民，国之良。曰仁义，礼智信。此五常，不容紊。地所生，有草木。此植物，遍水陆。有虫鱼，有鸟兽。此动物，能飞走。稻粱菽，麦黍稷。此六谷，人所食。马牛羊，鸡犬豕。此六畜，人所饲。曰喜怒，曰哀惧。爱恶欲，七情俱。青赤黄，及黑白。此五色，目所识。酸苦甘，及辛咸。此五味，口所含。膻焦香，及腥朽。此五臭，鼻所嗅。匏土革，木石金。丝与竹，乃八音。曰平上，曰去入。此四声，宜调协。高曾祖，父而身。身而子，子而孙。自子孙，至玄曾。乃九族，人之伦。父子恩，夫妇从。兄则友，弟则恭。长幼序，友与朋。君则敬，臣则忠。此十义，人所同。当师叙，勿违背。斩齐衰，大小功。至缌麻，五服终。礼乐射，御书数。古六艺，今不具。惟书学，人共遵。既识字，讲说文。有古文，大小篆。隶草继，不可乱。若广学，惧其繁。但略说，能知原。凡训蒙，须讲究。详训诂，明句读。为学者，必有初。小学终，至四书。论语者，二十篇。群弟子，记善言。孟子者，七篇止。讲道德，说仁义。作中庸，乃孔伋。中不偏，庸不易。作大学，乃曾子。自修齐，至平治。孝经通，四书熟。如六经，始可读。诗书易，礼春秋。号六经，当讲求。有连山，有归藏。有周易，三易详。有典谟，有训诰。有誓命，书之奥。我周公，作周礼。著六官，存治体。大小戴，注礼记。述圣言，礼乐备。曰国风，曰雅颂。号四诗，当讽咏。诗既亡，春秋作。寓褒贬，别善恶。三传者，有公羊。有左氏，有谷梁。经既明，方读子。撮其要，记其事。五子者，有荀扬。文中子，及老庄。经子通，读诸史。考世系，知终始。自羲农，至黄帝。号三皇，居上世。唐有虞，号二帝。相揖逊，称盛世。夏有禹，商有汤。周文武，称三王。夏传子，家天下。四百载，迁夏社。汤伐夏，国号商，六百载，至纣亡。周武王，始诛纣。八百载，最长久。周辙东，王纲坠。逞干戈，尚游说。始春秋，终战国。五霸强，七雄出。嬴秦氏，始兼并。传二世，楚汉争。高祖兴，汉业建。至孝平，王莽篡。光武兴，为东汉。四百年，终于献。魏蜀吴，争汉鼎。号三国，迄两晋。宋齐继，梁陈承。为南朝，都金陵。北元魏，分东西。宇文周，与高齐。迨至隋，一土宇。不再传，失统绪。唐高祖，起义师。除隋乱，创国基。二十传，三百载。梁灭之，国乃改。梁唐晋，及汉周。称五代，皆有由。炎宋兴，受周禅。十八传，南北混。辽与金，皆称帝。元灭金，绝宋世。舆图广，超前代。九十年，国祚废。太祖兴，国大明。号洪武，都金陵。迨成祖，迁燕京。十六世，至崇祯。权阉肆，寇如林。李闯出，神器焚。清世祖，膺景命。靖四方，克大定。由康雍，历乾嘉，民安富，治绩夸。道咸间，变乱起，始英法，扰都鄙。同光后，宣统弱，传九帝，满清殁。革命兴，废帝制，立宪法，建民国。古今史，全在兹。载治乱，知兴衰。史虽繁，读有次。史记一，汉书二。后汉三，国志四。兼证经，参通鉴。读史者，考实录。通古今，若亲目。口而诵，心而惟。朝于斯，夕于斯。昔仲尼，师项橐。古圣贤，尚勤学。赵中令，读鲁论。彼既仕，学且勤。披蒲编，削竹简。彼无书，且知勉。头悬梁，锥刺股。彼不教，自勤苦。如囊萤，如映雪。家虽贫，学不辍。如负薪，如挂角。身虽劳，犹苦卓。苏老泉，二十七。始发奋，读书籍。彼既老，犹悔迟。尔小生，宜早思。若梁灏，八十二。对大廷，魁多士。彼既成，众称异。尔小生，宜立志。莹八岁，能咏诗。泌七岁，能赋棋。彼颖悟，人称奇。尔幼学，当效之。蔡文姬，能辨琴。谢道韫，能咏吟。彼女子，且聪敏。尔男子，当自警。唐刘晏，方七岁。举神童，作正字。彼虽幼，身已仕。有为者，亦若是。犬守夜，鸡司晨。苟不学，曷为人。蚕吐丝，蜂酿蜜。人不学，不如物。幼而学，壮而行。上致君，下泽民。扬名声，显父母。光于前，裕于后。人遗子，金满赢。我教子，唯一经。勤有功，戏无益。戒之哉，宜勉力`,
    `瞒天过海。围魏救赵。借刀杀人。以逸待劳。趁火打劫。声东击西。无中生有。暗渡陈仓。隔岸观火。笑里藏刀。李代桃僵。顺手牵羊。打草惊蛇。借尸还魂。调虎离山。欲擒故纵。抛砖引玉。擒贼擒王。釜底抽薪。混水摸鱼。金蝉脱壳。关门捉贼。远交近攻。假道伐虢。偷梁换柱。指桑骂槐。假痴不颠。上屋抽梯。树上开花。反客为主。美人计。空城计。苦肉计。连环计`,
  ];
  let a = books;
  a = a[(Math.random() * a.length) | 0];
  a = a.split("。");

  jQuery(document).ready(function ($) {
    $("body").click(function (e) {
      // var a = new Array("加油", "努力", "奋斗");
      let a_idx = (Math.random() * a.length) | 0;

      var $i = $("<span/>").text(a[a_idx]);
      // a_idx = (a_idx + 1) % a.length;
      var x = e.pageX,
        y = e.pageY;
      $i.css({
        "z-index": 9999999999999999999999999999999999999999999999999999,
        top: y - 40,
        left: x - 60,
        position: "absolute",
        "font-weight": "bold",
        color: Color(),
      });
      $("body").append($i);
      $i.animate(
        {
          top: y - 180,
          opacity: 0,
        },
        2500,
        function () {
          $i.remove();
        },
      );
    });
  });
})();

(function () {
  "use strict";
  !(function () {
    var _createClass = (function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var getRandom = function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    };

    var getRandomInt = function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    var getRandomColor = function getRandomColor() {
      var colors = [
        "rgba(231, 76, 60, 1)", // red
        "rgba(241, 196, 15, 1)", // yellow
        "rgba(46, 204, 113, 1)", // green
        "rgba(52, 152, 219, 1)", // blue
        "rgba(155, 89, 182, 1)", // purple
      ];

      return colors[getRandomInt(0, colors.length)];
    };

    // Particle
    var Particle = (function () {
      function Particle(system, x, y) {
        _classCallCheck(this, Particle);
        this.system = system;
        this.universe = this.system.world.universe;
        this.x = x;
        this.y = y;
        this.color = getRandomColor();
        this.life = 1;
        this.aging = getRandom(0.99, 0.999); // 0.99, 0.999 || 0.999, 0.9999

        this.r = getRandomInt(8, 16);
        this.speed = getRandom(3, 8);
        this.velocity = [
          getRandom(-this.speed, this.speed),
          getRandom(-this.speed, this.speed),
        ];
      }
      _createClass(Particle, [
        {
          key: "update",
          value: function update(dt) {
            this.life *= this.aging;

            if (
              this.r < 0.1 ||
              this.life === 0 ||
              this.x + this.r < 0 ||
              this.x - this.r > this.universe.width ||
              this.y + this.r < 0 ||
              this.y - this.r > this.universe.height
            ) {
              this.system.removeObject(this);
            }

            this.r *= this.life;
            this.x += this.velocity[0];
            this.y += this.velocity[1];
          },
        },
        {
          key: "render",
          value: function render(ctx) {
            // Main circle

            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            var r = this.color.match(/([0-9]+)/g)[0];
            var g = this.color.match(/([0-9]+)/g)[1];
            var b = this.color.match(/([0-9]+)/g)[2];

            // // Gradient

            // var spread = 1.5;
            // var gradient = ctx.createRadialGradient(
            //     this.x, this.y, this.r,
            //     this.x, this.y, this.r * spread);

            // gradient.addColorStop(0, 'rgba(' + r + ', ' + g + ', ' + b + ', 0.3)');
            // gradient.addColorStop(1, 'rgba(' + r + ', ' + g + ', ' + b + ', 0)');

            // ctx.globalCompositeOperation = 'lighter';
            // ctx.fillStyle = gradient;
            // ctx.beginPath();
            // ctx.arc(this.x, this.y, this.r * spread, 0, 2 * Math.PI, false);
            // ctx.fill();
            // ctx.closePath();
            // ctx.globalCompositeOperation = 'source-over';

            // Aberration

            var offset = this.r * 0.5;
            var color = "rgba(" + g + ", " + b + ", " + r + ", 0.3)";

            ctx.globalCompositeOperation = "lighter";
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(
              this.x + offset,
              this.y + offset,
              this.r,
              0,
              2 * Math.PI,
              false,
            );
            ctx.fill();
            ctx.closePath();
            ctx.globalCompositeOperation = "source-over";
          },
        },
      ]);
      return Particle;
    })();

    // Crown
    var Crown = (function () {
      function Crown(system, x, y) {
        _classCallCheck(this, Crown);
        this.system = system;
        this.x = x;
        this.y = y;
        this.r = getRandomInt(15, 20); // 5, 20
        this.mod = 1.1;
        this.life = 1;
        this.aging = getRandom(0.83, 0.88);
        this.speed = getRandom(4, 5);

        this.color = {
          r: getRandomInt(0, 50),
          g: getRandomInt(0, 50),
          b: getRandomInt(0, 50),
        };

        this.angle1 = Math.PI * getRandom(0, 2);
        this.angle2 = this.angle1 + Math.PI * getRandom(0.1, 0.5);
      }
      _createClass(Crown, [
        {
          key: "update",
          value: function update(dt) {
            this.life *= this.aging;

            if (this.life <= 0.0001) this.system.removeObject(this);

            this.r += Math.abs(1 - this.life) * this.speed;

            this.x1 = this.x + this.r * Math.cos(this.angle1);
            this.y1 = this.y + this.r * Math.sin(this.angle1);

            this.angle3 = this.angle1 + (this.angle2 - this.angle1) / 2;
            this.x2 = this.x + this.r * this.mod * Math.cos(this.angle3);
            this.y2 = this.y + this.r * this.mod * Math.sin(this.angle3);
          },
        },
        {
          key: "render",
          value: function render(ctx) {
            var gradient = ctx.createRadialGradient(
              this.x,
              this.y,
              this.r * 0.9,
              this.x,
              this.y,
              this.r,
            );

            gradient.addColorStop(
              0,
              "rgba(" +
                this.color.r +
                ", " +
                this.color.g +
                ", " +
                this.color.b +
                ", " +
                this.life +
                ")",
            );
            gradient.addColorStop(
              1,
              "rgba(" +
                this.color.r +
                ", " +
                this.color.g +
                ", " +
                this.color.b +
                ", " +
                this.life * 0.5 +
                ")",
            );

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(
              this.x,
              this.y,
              this.r,
              this.angle1,
              this.angle2,
              false,
            );
            ctx.quadraticCurveTo(this.x2, this.y2, this.x1, this.y1);
            ctx.fill();
            ctx.closePath();
          },
        },
      ]);
      return Crown;
    })();

    // Explosion
    var Explosion = (function () {
      function Explosion(world, x, y) {
        _classCallCheck(this, Explosion);
        this.world = world;
        this.x = x;
        this.y = y;
        this.objects = [];

        var particles = getRandomInt(30, 80); // 10, 30 amount of particles
        var crowns = particles * getRandom(0.3, 0.5);

        while (crowns-- > 0) {
          this.addCrown();
        }
        while (particles-- > 0) {
          this.addParticle();
        }
      }
      _createClass(Explosion, [
        {
          key: "update",
          value: function update(dt) {
            this.objects.forEach(function (obj) {
              if (obj) obj.update(dt);
            });

            if (this.objects.length <= 0) {
              this.world.clearExplosion(this);
            }
          },
        },
        {
          key: "render",
          value: function render(ctx) {
            this.objects.forEach(function (obj) {
              if (obj) obj.render(ctx);
            });
          },
        },
        {
          key: "addCrown",
          value: function addCrown() {
            this.objects.push(new Crown(this, this.x, this.y));
          },
        },
        {
          key: "addParticle",
          value: function addParticle() {
            this.objects.push(new Particle(this, this.x, this.y));
          },
        },
        {
          key: "removeObject",
          value: function removeObject(obj) {
            var index = this.objects.indexOf(obj);

            if (index !== -1) {
              this.objects.splice(index, 1);
            }
          },
        },
      ]);
      return Explosion;
    })();

    // World
    var ConfettiWorld = (function () {
      function ConfettiWorld() {
        _classCallCheck(this, ConfettiWorld);
      }
      _createClass(ConfettiWorld, [
        {
          key: "init",
          value: function init() {
            this.objects = [];
            window.addEventListener("click", this.explode.bind(this));
          },
        },
        {
          key: "update",
          value: function update(dt) {
            this.objects.forEach(function (obj) {
              if (obj) obj.update(dt);
            });
          },
        },
        {
          key: "render",
          value: function render(ctx) {
            this.objects.forEach(function (obj) {
              if (obj) obj.render(ctx);
            });
          },
        },
        {
          key: "explode",
          value: function explode(event) {
            var x = event.clientX;
            var y = event.clientY;

            this.objects.push(new Explosion(this, x, y));
          },
        },
        {
          key: "clearExplosion",
          value: function clearExplosion(explosion) {
            var index = this.objects.indexOf(explosion);

            if (index !== -1) {
              this.objects.splice(index, 1);
            }
          },
        },
      ]);
      return ConfettiWorld;
    })();

    // Time
    var Time = (function () {
      function Time() {
        _classCallCheck(this, Time);
        this.now = 0; // current tick time
        this.prev = 0; // prev tick time
        this.elapsed = 0; // elapsed time from last tick
        this.delta = 0; // time from last update
        this.fps = 60; // desired fps
        this.step = 1 / 60; // step duration
      }
      _createClass(Time, [
        {
          key: "update",
          value: function update(time) {
            this.now = time;
            this.elapsed = (this.now - this.prev) / 1000;
            this.prev = this.now;
            this.delta += this.elapsed;
          },
        },
        {
          key: "raf",
          value: function raf(func) {
            window.requestAnimationFrame(func);
          },
        },
        {
          key: "hasFrames",
          value: function hasFrames() {
            return this.delta >= this.step;
          },
        },
        {
          key: "processFrame",
          value: function processFrame() {
            this.delta -= this.step;
          },
        },
      ]);
      return Time;
    })();

    // Canvas
    var Universe = (function () {
      function Universe(element) {
        _classCallCheck(this, Universe);
        this.el = element;
        this.ctx = this.el.getContext("2d");
        this.pixelRatio = window.devicePixelRatio;
        this.time = new Time();

        this.worlds = {};
        this.world = null; // current state

        this.updateSize();
        window.addEventListener("resize", this.updateSize.bind(this));

        this.addWorld("confetti", ConfettiWorld);
        this.setWorld("confetti");

        this.start();
      }
      _createClass(Universe, [
        {
          key: "start",
          value: function start() {
            this.time.raf(this.tick.bind(this));
          },
        },
        {
          key: "tick",
          value: function tick(time) {
            this.time.update(time);

            if (this.time.hasFrames()) {
              this.update();
              this.time.processFrame();
            }

            this.render();
            this.time.raf(this.tick.bind(this));
          },
        },
        {
          key: "update",
          value: function update() {
            this.world.update(this.time.step);
          },
        },
        {
          key: "render",
          value: function render() {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.world.render(this.ctx);
          },

          // Helpers
        },
        {
          key: "updateSize",
          value: function updateSize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.el.width = this.width * this.pixelRatio;
            this.el.height = this.height * this.pixelRatio;
            this.el.style.width = window.innerWidth + "px";
            this.el.style.height = window.innerHeight + "px";
            this.ctx.scale(this.pixelRatio, this.pixelRatio);
          },
        },
        {
          key: "addWorld",
          value: function addWorld(worldName, World) {
            this.worlds[worldName] = new World();
            this.worlds[worldName].universe = this;
            this.worlds[worldName].init();
          },
        },
        {
          key: "setWorld",
          value: function setWorld(worldName) {
            this.world = this.worlds[worldName];
          },
        },
      ]);
      return Universe;
    })();

    var element = document.createElement("canvas"); //画布
    element.style.cssText = "position:fixed;top:0;left:0;z-index:-1";
    document.getElementsByTagName("body")[0].appendChild(element);
    new Universe(element);
  })();
})();
