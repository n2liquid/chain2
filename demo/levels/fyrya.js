let {
  choice,
  clr,
  ln,
  runFlow,
  sec,
  speech,
  sspk,
} = require('chain');

let {
  heading,
  hr,
} = require('../lib');

let $ = document.querySelector.bind(document);

module.exports = st => runFlow({
  EV1000: async () => {
    await clr();

    await heading(`City of Fyrya`);
    await ln();

    //return 'EV3000';
  },

  EV1500: async () => {
    await ln(`<sdl:30>Welcome to Fyrya,<sec:0.4> the most popular dungeon city of the`);
    await ln(`Kingdom of Yggdrasil!<sec:1.5>`);
    await ln();

    await ln(`The city sits on a common travel and commerce path`);
    await ln(`that connects the capital,<sec:0.2> Freunheira,<sec:0.2> to the Old`);
    await ln(`World outside our Queen's Great Holy Land.<sec:1.5>`);
    await ln();

    await ln(`It's a rich city that thrives on a dangerous but`);
    await ln(`profitable dungeon.<sec:0.5> Lots of adventurers come by`);
    await ln(`the city to explore its dungeons,<sec:0.2> including many`);
    await ln(`novices who stay at the upper levels.<sec:1.5>`);
    await ln();

    await ln(`Oh.<sec:0.5> You do look severely underequipped!<sec:0.5> Is that`);
    await ln(`precisely what you're here for?<sec:1.5>`);
    await ln();

    await ln(`You'll have to register at the Adventure Registration`);
    await ln(`Office before you're allowed into the dungeon.<sec:2>`);
    await ln();

    await ln(`... Don't gimme that look!<sec:0.8> They'll be offering you free`);
    await ln(`automatic post-death time-traveling under the Queen's`);
    await ln(`magical Grace.<sec:0.8> Judging by your rusty sword,<sec:0.2> you'll be`);
    await ln(`using the service a lot!<sec:1.5>`);
    await ln();

    await ln(`Well,<sec:0.3> feel free to explore the city first,<sec:0.3> traveler!<sec:0.8>`);
    await ln(`Do make yourself home!<sec:1.5>`);
    await ln();

    await hr();
    await ln();
  },

  EV2000: async () => {
    await ln(`Where are you going?<sec:0.3>`);
    await ln();

    await ln(`- To the dungeon`);
    await ln(`- To the pub`);
    await ln(`- To the inn`);
    await ln(`- To the city office`);
    await ln();

    await choice({
      'to the dungeon': () => 'EV3000',
      //'to the pub': () => 'EV4000',
      //'to the inn': () => 'EV5000',
      //'to the city office': () => 'EV6000',
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
      await ln(`Come back when you have one.<sec:2>`);
    });

    await ln();

    return 'EV2000';
  },
});
