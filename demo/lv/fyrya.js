let {
  choice,
  clr,
  input,
  ln,
  runFlow,
  sec,
  speech,
  sspk,
} = require('chain');

let {
  heading,
  hr,
  saveState,
} = require('../lib');

let lv = require('.');

module.exports = ctx => runFlow({
  EV1000: async () => {
    await clr();

    ctx.st.levelId = 'fyrya';
    saveState(ctx);

    await heading(`City of Fyrya`);
    await ln();

    if (!ctx.st.fyrya.firstTime) {
      return 'EV2000';
    }
  },

  EV1500: async () => {
    await ln(`<sdl:30> "Welcome to Fyrya,<sec:0.3> the most popular dungeon city of`);
    await ln(`the Kingdom of Yggdrasil!"<w>`);
    await ln();

    await ln(` "The city sits on a common travel and commerce path`);
    await ln(`that connects the capital,<sec:0.2> Freunheira,<sec:0.2> to the Old`);
    await ln(`World outside our Queen's Great Holy Land."<w>`);
    await ln();

    await ln(` "It's a rich city that thrives on a dangerous but`);
    await ln(`profitable dungeon.<sec:0.5> Lots of adventurers come by`);
    await ln(`the city to explore its dungeons,<sec:0.2> including many`);
    await ln(`novices who stay at the upper levels."<w>`);
    await ln();

    await ln(` "Oh.<sec:0.5> You do look severely underequipped!<sec:0.5> Is that`);
    await ln(`precisely what you're here for?"<w>`);
    await ln();

    await ln(` "You'll have to register at the Adventurer`);
    await ln(`Registration Office before you're allowed into the`);
    await ln(`dungeon."<w>`);
    await ln();

    await ln(` "... Don't gimme that look!<sec:0.8> They'll be offering you`);
    await ln(`free automatic post-death time-traveling under the`);
    await ln(`Queen's magical Grace.<sec:0.8> Judging by your rusty sword,<sec:0.2>`);
    await ln(`you'll be using the service a lot!"<w>`);
    await ln();

    await ln(` "Well,<sec:0.3> feel free to explore the city first,<sec:0.3> traveler!<sec:0.8>`);
    await ln(`Do make yourself home!"<w>`);
    await ln();

    await hr();
    await ln();

    ctx.st.fyrya.firstTime = false;
    saveState(ctx);
  },

  EV2000: async () => {
    await ln(`<sdl:30>Where are you going?<sec:0.3>`);
    await ln();

    await ln(`- To the dungeon`);
    await ln(`- To the pub`);
    await ln(`- To the inn`);
    await ln(`- To the city office`);
    await ln();

    return choice({
      dungeon: () => 'EV3000',
      //pub: () => 'EV4000',
      //inn: () => 'EV5000',
      'city office': () => 'EV6000',
    });
  },

  EV3000: async () => {
    await clr();

    await heading(`Fyrya Dungeons Entrance`);
    await ln();

    await speech(async () => {
      await sspk('Guard');
      await ln(`<sdl:10>Halt!<sec:0.8><sdl:40> Where's your adventurer's badge?<sec:1>`);
      await ln(`I can't let you in without one.<sec:1>`);
      await ln(`You can get one at the city office.<sec:0.5>`);
      await ln(`Come back when you have one.<w>`);
    });

    await ln();

    let ret = await lv.fyryaDungeon1F(ctx);

    if (ret === 'backToTitle') {
      return ['breakFlow', ret];
    }

    return 'EV1000';
  },

  EV6000: async () => {
    await clr();

    await heading(`Fyrya's Adventurer Registration Office`);
    await ln();

    await ln(`<sdl:30>The city office is located inside this fancy-looking`);
    await ln(`building you've just found yourself in.<w>`);
    await ln();

    await ln(`You see people carrying all sorts of equipment doing`);
    await ln(`busy work.<sec:0.5> They don't look like novices,<sec:0.1> so it looks`);
    await ln(`like the adventurer registration office does more`);
    await ln(`than just issuing exploration permits.<w>`);
    await ln();

    await ln(`Amidst all the apparent rush, a calm middle-aged man`);
    await ln(`talks to you.<w>`);
    await ln();

    await speech(async () => {
      await sspk('Officer');
      await ln(`Hi there!<w>`);
      await ln(`I see you don't have a badge yet.<w>`);
      await ln(`Looking for your very own exploration`);
      await ln(`permit?<w>`);
      await ln(`I can help you with that!<w>`);
    });

    await ln();

    await ln(`You tighten the grip around the hilt.<w>`);
    await ln();

    await ln(`It's real!<sec:0.5> You'll soon be putting all your hard work`);
    await ln(`sword practice to use on those ugly beasts!<w>`);
    await ln();

    await speech(async () => {
      await sspk('Officer');
      await ln(`I like that sparkle in your eyes.<w>`);
      await ln(`We'll see how long that fire burns.<w>`);
      await ln();

      await ln(`Are you becoming a real warrior,<sec:0.3> or are you`);
      await ln(`soon running away in the face of the`);
      await ln(`hardships of this life you chose?<w>`);
      await ln();

      await ln(`<sdl:5>Do you have what it takes!?<w>`);
      await ln(`<sdl:30>Time sure will tell!<sec:0.5> Hah!<w>`);
      await ln();

      await ln(`Alright.<sec:1> All I really need before I can issue`);
      await ln(`you an adventurer's badge and a Level 1~2`);
      await ln(`exploration permit is your name and some`);
      await ln(`basic information.<w>`);
      await ln();

      await ln(`Please write your name right here,<sec:0.3> then`);
      await ln(`fill the rest of the form, please.<w>`);
      await ln();
    });

    await ln();

    await ln(`Please enter your name:`);
    await ln();

    let { party } = ctx.st;

    let elmina = party.find(x => x.id === 1000);

    let name = elmina.name = await input({
      default: elmina.name,
      maxLength: 10,
    });

    await ln(`You hurriedly fill in your name as well as the rest`);
    await ln(`of the form and sign it.<w>`);
    await ln();

    await speech(async () => {
      await sspk('Officer');
      await ln(`Alright, ${name}!<sec:0.5> Here's your badge.<w>`);
    });

    await ln();

    await ln(`★★★ Adventurer's Badge acquired! ★★★<w>`);
    await ln();

    await speech(async () => {
      await sspk('Officer');
      await ln(`You might have already heard of it, but I`);
      await ln(`should definitely mention:<w>`);
      await ln();

      await ln(`Our Great Queen's magical Grace spans our`);
      await ln(`whole Kingdom.<sec:0.8> If you die in combat in a`);
      await ln(`dungeon, you'll be time-travelled back to the`);
      await ln(`nearest city's rebirth point.<w>`);
      await ln();

      await ln(`Our City of Fyrya's good Guild is also`);
      await ln(`offering some gold and items for`);
      await ln(`newly-registered novices.<w>`);
      await ln(`I'm sure you'll make good use of them!<w>`);
    });

    await ln();

    await ln(`★★★ 5x Life Pots acquired! ★★★<w>`);
    await ln(`★★★ 1000 Gold acquired! ★★★<w>`);
    await ln();

    await speech(async () => {
      await sspk('Officer');
      await ln(`Before you charge carelessly into the`);
      await ln(`dungeon,<sec:0.1> it's always a good idea to pay a`);
      await ln(`visit to the weapon shop!<w>`);
      await ln(`Practice swords are hardly cut for real`);
      await ln(`combat.<w>`);
      await ln();

      await ln(`That's it!<w>`);
      await ln(`We hope you'll enjoy Fyrya's deep, rich`);
      await ln(`dungeons.<w>`);
    });

    await ln();

    await ln(`You say goodbye to the good officer and rush outside.<w>`);
    await ln();

    return 'EV1000';
  },
});
