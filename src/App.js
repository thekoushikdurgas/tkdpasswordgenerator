/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import passwordchart from "./img/passwordchart.png";
import Alert from './component/Alert/Alert';
import './App.css';

export default function MusicPlayer() {
  const [render, setrender] = useState(true);
  const [alertactive, setalertactive] = useState([false, '', '']);
  const [value, setvalue] = useState('');
  const [sliderspan, setsliderspan] = useState('');
  const [sliderspanleft, setsliderspanleft] = useState(2);
  const [sliderspanbackground, setsliderspanbackground] = useState(0);
  const [lenghtvalue, setlenghtvalue] = useState(6);
  const [lowercaseEl, setlowercaseEl] = useState(true);
  const [uppercaseEl, setuppercaseEl] = useState(true);
  const [numbersEl, setnumbersEl] = useState(false);
  const [symbolsEl, setsymbolsEl] = useState(false);
  const [similarcharactersEl, setsimilarcharactersEl] = useState(true);
  const [ambiguouscharactersEl, setambiguouscharactersEl] = useState(true);
  const max = 2048;
  const min = 6;
  const DIGITS = ["2", "3", "4", "5", "6", "7", "8", "9"];
  const LOCASE_CHARACTERS = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const UPCASE_CHARACTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const symbols = ["!", "#", "$", "%", "&", "*", "+", "-", "=", "?", "@", "^", "_"];
  const symbol1s = ["(", "}", "{", "[", "\\", "]", "(", ")", "/", '"', "`", "~", ",", ";", ":", ".", "<", ">", ")"];
  const similarsdigit = ["0", "1"];
  const similarslower = ["i", "l", "o"];
  const similarsupper = ["I", "O"];
  const similarssymbol = ["|"];
  const clipboardcode = (a) => {
    var textarea = document.createElement("textarea");
    if (!a) { return; }
    textarea.value = a;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    window.prompt('copied!', a);
    setalertactive([true, 'Success', 'Password is copied']);
  }
  const getRandomLower = () => {
    var choicearray = LOCASE_CHARACTERS;
    if (similarcharactersEl) { choicearray = choicearray.concat(similarslower); }
    return choicearray[Math.floor(Math.random() * choicearray.length)];
  }
  const getRandomUpper = () => {
    var choicearray = UPCASE_CHARACTERS;
    if (similarcharactersEl) { choicearray = choicearray.concat(similarsupper); }
    return choicearray[Math.floor(Math.random() * choicearray.length)];
  }
  const getRandomNumber = () => {
    var choicearray = DIGITS;
    if (similarcharactersEl) { choicearray = choicearray.concat(similarsdigit); }
    return choicearray[Math.floor(Math.random() * choicearray.length)];
  }
  const getRandomSymbol = () => {
    var choicearray = symbols;
    if (similarcharactersEl) { choicearray = choicearray.concat(similarssymbol); }
    if (ambiguouscharactersEl) { choicearray = choicearray.concat(symbol1s); }
    return choicearray[Math.floor(Math.random() * choicearray.length)];
  }
  const inputSlideroninput = (e, l) => {
    if (e >= min && e <= max) {
      if (e > 1024) {
        setlenghtvalue(l ? 2048 : 1024);
      } else if (e > 512) {
        setlenghtvalue(l ? 1024 : 512);
      } else if (e > 256) {
        setlenghtvalue(l ? 512 : 256);
      } else if (e > 128) {
        setlenghtvalue(l ? 256 : 128);
      } else {
        setlenghtvalue(e);
        setsliderspanleft((e - min + 2) * (100 / 124));
        setsliderspanbackground((100 * (e - min)) / (128 - min));
        setsliderspan("show");
        generatePassword();
      }
    }
  };
  const generatePassword = () => {
    var choicelist = [];
    if (lowercaseEl) { choicelist.push(1) }
    if (uppercaseEl) { choicelist.push(2) }
    if (numbersEl) { choicelist.push(3) }
    if (symbolsEl) { choicelist.push(4) }
    if (choicelist.length === 0) {
      return 0;
    }
    if (lenghtvalue <= 5) {
      return 0;
    }
    var a = "";
    var choicechar = 0;
    while (a.length < lenghtvalue) {
      choicechar = choicelist[Math.floor(Math.random() * choicelist.length)];
      if (choicechar === 1) { a += getRandomLower() }
      if (choicechar === 2) { a += getRandomUpper() }
      if (choicechar === 3) { a += getRandomNumber() }
      if (choicechar === 4) { a += getRandomSymbol() }
    }
    a = a.slice(0, lenghtvalue);
    setvalue(a);
    setalertactive([true, 'Success', 'Password is generated']);
  }
  useEffect(() => {
    if (render) {
      inputSlideroninput(min, true);
      generatePassword();
      setrender(false);
    }
  }, [render])
  return (
    <>
      <Alert alertactive={alertactive} />
      <div className="passwrapper">
        <form id="displayform" className="displayform">
          <input type="text" className="display1" value={value} readOnly />
        </form>
        <div className="w3-row1 row">
          <div className='col-4'><button className="button" type="button" onClick={() => { generatePassword() }}>Generate</button></div>
          <div className='col-4'><button className="button" type="button" onClick={() => { clipboardcode(value) }}><i className="fal fa-copy"></i></button></div>
          <div className='col-4'>
            <div className="decrementincrementtkd" type="button">
              <span className="input-number-decrement" onClick={() => { inputSlideroninput(lenghtvalue - 1, false) }}>–</span>
              <input className="input-number" type="text" value={lenghtvalue} min={min} max={max} readOnly />
              <span className="input-number-increment" onClick={() => { inputSlideroninput(lenghtvalue + 1, true) }}>+</span>
            </div>
          </div>
        </div>
        <div className="range-row" onMouseEnter={() => { setsliderspan('show') }} onMouseLeave={() => { setsliderspan('') }}>
          <div className="range">
            <div className="sliderValue">
              <span className={`sliderspan ${sliderspan}`} style={{ left: sliderspanleft + "%" }}>{lenghtvalue}</span>
            </div>
            <div className="field">
              <div className="value left">{min}</div>
              <input className="slider" type="range" min={min} max='128' onChange={(e) => inputSlideroninput(e.target.value, false)} value={lenghtvalue} style={{ background: `linear-gradient(90deg, hsl(${sliderspanbackground}deg 50% 50%) ${sliderspanbackground}%, #d3d3d3 ${sliderspanbackground + 0.1}%)` }} />
              <div className="value right">128</div>
            </div>
          </div>
        </div>
        <div className="w3-rowcheckboxs">
          <div className="bulgy-checkboxs">
            <label className="bulgy-checkboxs-label">
              <input type="checkbox" name="options" checked={lowercaseEl} onChange={() => { setlowercaseEl(!lowercaseEl); generatePassword();setalertactive([true, lowercaseEl?'Warning':'Success', `Lowercase is ${lowercaseEl?'un':''}checked`]); }} id="uppercase" />
              <span className="checkbox"></span>
              <span className="label"><span>I</span><span>n</span><span>c</span><span>l</span><span>u</span><span>d</span><span>e</span><span>&nbsp;</span><span>U</span><span>p</span><span>p</span><span>e</span><span>r</span><span>c</span><span>a</span><span>s</span><span>e</span><span>&nbsp;</span><span>C</span><span>h</span><span>a</span><span>r</span><span>a</span><span>c</span><span>t</span><span>e</span><span>r</span><span>s</span></span>
            </label>
          </div>
          <div className="bulgy-checkboxs">
            <label className="bulgy-checkboxs-label">
              <input type="checkbox" name="options" checked={uppercaseEl} onChange={() => { setuppercaseEl(!uppercaseEl); generatePassword();setalertactive([true, uppercaseEl?'Warning':'Success', `Uppercase is ${uppercaseEl?'un':''}checked`]); }} id="lowercase" />
              <span className="checkbox"></span>
              <span className="label"><span>I</span><span>n</span><span>c</span><span>l</span><span>u</span><span>d</span><span>e</span><span>&nbsp;</span><span>L</span><span>o</span><span>w</span><span>e</span><span>r</span><span>c</span><span>a</span><span>s</span><span>e</span><span>&nbsp;</span><span>C</span><span>h</span><span>a</span><span>r</span><span>a</span><span>c</span><span>t</span><span>e</span><span>r</span><span>s</span></span>
            </label>
          </div>
          <div className="bulgy-checkboxs">
            <label className="bulgy-checkboxs-label">
              <input type="checkbox" name="options" id="numbers" checked={numbersEl} onChange={() => { setnumbersEl(!numbersEl); generatePassword(); setalertactive([true, numbersEl?'Warning':'Success', `Number is ${numbersEl?'un':''}checked`]);}} />
              <span className="checkbox"></span>
              <span className="label"><span>I</span><span>n</span><span>c</span><span>l</span><span>u</span><span>d</span><span>e</span><span>&nbsp;</span><span>N</span><span>u</span><span>m</span><span>b</span><span>e</span><span>r</span><span>s</span></span>
            </label>
          </div>
          <div className="bulgy-checkboxs">
            <label className="bulgy-checkboxs-label">
              <input type="checkbox" name="options" id="symbols" checked={symbolsEl} onChange={() => { setsymbolsEl(!symbolsEl); generatePassword(); setalertactive([true, symbolsEl?'Warning':'Success', `Symbol is ${symbolsEl?'un':''}checked`]);}} />
              <span className="checkbox"></span>
              <span className="label"><span>I</span><span>n</span><span>c</span><span>l</span><span>u</span><span>d</span><span>e</span><span>&nbsp;</span><span>S</span><span>y</span><span>m</span><span>b</span><span>o</span><span>l</span><span>s</span></span>
            </label>
          </div>
          <div className="bulgy-checkboxs">
            <label className="bulgy-checkboxs-label">
              <input type="checkbox" name="options" checked={similarcharactersEl} onChange={() => { setsimilarcharactersEl(!similarcharactersEl); generatePassword();setalertactive([true, similarcharactersEl?'Warning':'Success', `Similarcharacters is ${similarcharactersEl?'un':''}checked`]); }} id="similarcharacters" />
              <span className="checkbox"></span>
              <span className="label"><span>E</span><span>x</span><span>c</span><span>l</span><span>u</span><span>d</span><span>e</span><span>&nbsp;</span><span>S</span><span>i</span><span>m</span><span>i</span><span>l</span><span>a</span><span>r</span><span>&nbsp;</span><span>C</span><span>h</span><span>a</span><span>r</span><span>a</span><span>c</span><span>t</span><span>e</span><span>r</span><span>s</span></span>
            </label>
          </div>
          <div className="bulgy-checkboxs">
            <label className="bulgy-checkboxs-label">
              <input type="checkbox" name="options" checked={ambiguouscharactersEl} onChange={() => { setambiguouscharactersEl(!ambiguouscharactersEl); generatePassword();setalertactive([true, ambiguouscharactersEl?'Warning':'Success', `Ambiguouscharacters is ${ambiguouscharactersEl?'un':''}checked`]); }} id="ambiguouscharacters" />
              <span className="checkbox"></span>
              <span className="label"><span>E</span><span>x</span><span>c</span><span>l</span><span>u</span><span>d</span><span>e</span><span>&nbsp;</span><span>A</span><span>m</span><span>b</span><span>i</span><span>g</span><span>u</span><span>o</span><span>u</span><span>s</span><span>&nbsp;</span><span>C</span><span>h</span><span>a</span><span>r</span><span>a</span><span>c</span><span>t</span><span>e</span><span>r</span><span>s</span></span>
            </label>
          </div>
        </div>
        <div className="button-row">
          <div className="qrcode">
            <img src={`https://chart.googleapis.com/chart?cht=qr&chl=${value}&chs=160x160&chld=L|0`} className="qr-code" alt="uncheck the Symbol and chick generate" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = passwordchart; }} />
          </div>
          <div className="buttonrow">
            <button id="basic_settings" type="button" title="Basic" className="button" onClick={() => { inputSlideroninput(12, false); setlowercaseEl(true); setuppercaseEl(true); setnumbersEl(true); setsymbolsEl(false); setsimilarcharactersEl(true); setambiguouscharactersEl(true); generatePassword(); }}>Basic</button>
            <button id="strong_settings" type="button" className="button" title="Strong" onClick={() => { inputSlideroninput(16, false); setlowercaseEl(true); setuppercaseEl(true); setnumbersEl(true); setsymbolsEl(true); setsimilarcharactersEl(true); setambiguouscharactersEl(true); generatePassword(); }}>Strong</button>
            <button id="secure_settings" type="button" className="button" title="Secure" onClick={() => { inputSlideroninput(32, false); setlowercaseEl(true); setuppercaseEl(true); setnumbersEl(true); setsymbolsEl(true); setsimilarcharactersEl(false); setambiguouscharactersEl(false); generatePassword(); }}>Secure</button>
            <button id="servers_settings" type="button" className="button" title="Servers" onClick={() => { inputSlideroninput(64, false); setlowercaseEl(true); setuppercaseEl(true); setnumbersEl(true); setsymbolsEl(true); setsimilarcharactersEl(false); setambiguouscharactersEl(true); generatePassword(); }}>Servers </button>
          </div>
        </div>
      </div>
    </>
  )
}
