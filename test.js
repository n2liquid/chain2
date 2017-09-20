let {
  choice,
  clr,
  img,
  ln,
  runFlow,
  speech,
  sspk,
  str,
} = require('./lib');

let $ = document.querySelector.bind(document);

module.exports = () => runFlow({
  start: async () => {
    await clr();

    let imgArea = $('.imgArea');
    let img = document.createElement('img');

    img.src = 'title.jpg';

    imgArea.innerHTML = '';
    imgArea.appendChild(img);

    imgArea.classList.remove('hidden');

    await ln(`<sdl:40>Episode 1`);
    await ln(`The First Turnabout`);
    await ln();

    await ln(`- Back`);
    await ln(`- Confirm`);
    await ln(`- ???`);
    await ln();

    return choice({
      back: () => 'start',
      confirm: () => 'storyStart',
      '???': () => '???',
    });
  },

  '???': async () => {
    await clr();

    let imgArea = $('.imgArea');
    let img = document.createElement('img');

    img.src = 'wat.gif';

    imgArea.innerHTML = '';
    imgArea.appendChild(img);

    imgArea.classList.remove('hidden');

    await ln('- Back');
    await ln();

    return choice({
      back: () => 'start',
    });
  },

  storyStart: async () => {
    await clr();

    $('.imgArea').classList.add('hidden');

    await ln(`<sec:1><sdl:0>Episode 1<sec:1>`);
    await ln(`The First Turnabout<sec:3>`);
    await ln();
  },

  m10000: async () => {
    await ln(`<sdl:100>Inside the compressing walls of a small apartment,<sec:0.25>`);
    await ln(`blood runs all over a small statue held upside down`);
    await ln(`by a man.<sec:1>`);
    await ln();
  },

  m20000: async () => {
    await ln(`<sdl:100>The blood drips from it to the wooden floor beside a`);
    await ln(`fine lady's dead body...<sec:3>`);
    await ln();
  },

  m30000: async () => {
    await speech(async () => {
      await sspk('????');
      await ln(`<sdl:30>*gasp*...<sec:0.75> *gasp*...<sec:1.5>`);
      await ln(`<sdl:10>Dammit!<sec:1.25>`);
      await ln(`<sdl:300>...<sec:1><sdl:30> Why me?<sec:1.5>`);
      await ln(`<sdl:50>I can't get caught...<sec:1.5>`);
      await ln(`<sdl:10>Not like this!<sec:2>`);
    });

    await ln();
  },

  m40000: async () => {
    await ln(`<sdl:100>Shocked, the murderer stares at the woman he just`);
    await ln(`killed.<sec:2>`);
    await ln();
  },
});
