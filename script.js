var rand;
let gridSize = {
  x: 5,
  y: 5,
  gap: 5
};

let possibleSquares = [
	`"CUNT... Sorry"`,
	`UNPROMPTED rags on gavin :)`,
	`shane "predicts" what someone would say`,
	`"you bitch!"`,
	`tangent where shane fullscreen's camera`,
	`shane makes a bad pun`,
	`beau mention`,
	`three cups mention`,
	`"uppies"`,
	`fanfic mention`,
	`gets mad at video game "HOW DO YOU..."`,
	`trip mention`,
	`shane is lewd`,
	`talks about sleep schedule`,
	`*sneezes*`,
	`shows recent purchase`,
	`"i'm innocent"`,
	`talks about football`,
	`misreads a chat message`,
	`name drops w/ username`,
	`"love that for us"`,
	`gives no spoiler speech`,
	`disney mention`,
	`cookie clicker`,
	`makes herself laugh`,
	`talks about elden ring lore`,
	`work mention`,
	`dies to non-boss`,
	`randomly sings for no reason`,
	`asks game question she does NOT want answered`,
	`asks game question she WANTS answered`
];

function generateBoard(button) {
	const inputBar = document.getElementById("seedInput");
	let randomSeed = inputBar.value;
	inputBar.style.display = `none`;
	button.style.display = `none`;
	setSeed(randomSeed);
	let seedDiv = document.getElementById(`seed`);
	seedDiv.innerHTML = `SEED: ${randomSeed}`;
	shuffle(possibleSquares);
	let bingoCard = document.getElementById(`bingoCard`);
	bingoCard.style.visibility = `visible`;
	bingoCard.style.gap = gridSize.gap + "px";
	let xSize = `calc(${100/gridSize.x}% - ${gridSize.gap - 1}px) `;
	bingoCard.style.gridTemplateColumns = xSize.repeat(gridSize.x);
	let ySize = `calc(${100/gridSize.y}% - ${gridSize.gap - 1}px) `;
	bingoCard.style.gridTemplateRows = ySize.repeat(gridSize.x);
	for (row = 0; row < gridSize.x; row++) {
	  for (column = 0; column < gridSize.y; column++) {
		  let newDiv = document.createElement(`div`);
		  newDiv.classList.add(`cell`);
		  newDiv.id = `${row},${column}`;
		  let newH1 = document.createElement(`H1`);
		  newH1.setAttribute(`data-dynamic-font-size`, "");
		  if(newDiv.id == `2,2`) {
			  let newText = document.createTextNode(`LATE (FREE SPACE)`);
			  newH1.appendChild(newText);
		  } else {
			  if(possibleSquares[(row * gridSize.x) + column]) {
				  let newText = document.createTextNode(possibleSquares[(row * gridSize.x) + column].toUpperCase());
				  newH1.appendChild(newText);
			  }
		  }
		  newDiv.appendChild(newH1);
		  bingoCard.appendChild(newDiv);
		  newDiv.onclick = toggleRed;
	  }
	}
  
	const dynamicFontSize = (textLength) => {
	  /**
	   * Edit these values to suit your needs
	   */
	  // Them minimum and maximum font sizes in pixels
	  const minFontSize = 14;
	  const maxFontSize = 35;
  
	  // The minimum and maximum line lengths in characters that should affect size
	  const minLineLength = 12;
	  const maxLineLength = 50;
  
	  // The minimum and maximum viewport widths in pixels where resizing should occur
	  const minViewportWidth = 1;
	  const maxViewportWidth = 1400;
  
	  /**
	   * Danger, calculations below, tread carefully
	   */
	  // Relative max font size, gets bigger the fewer characters there are, down to minLineLength
	  const relativeMaxFontSize =
		textLength < minLineLength
		  ? maxFontSize
		  : textLength > maxLineLength
		  ? minFontSize
		  : maxFontSize -
			((maxFontSize - minFontSize) * (textLength - minLineLength)) /
			  (maxLineLength - minLineLength);
  
	  // Relative max viewport width, gets smaller the bigger the font size so it doesn't resize too soon
	  const relativeMaxViewportWidth =
		maxViewportWidth * (minFontSize / relativeMaxFontSize);
  
	  // Relative min viewport width, gets bigger the smaller the font size so it doesn't resize too late
	  const relativeMinViewportWidth =
		minViewportWidth * (maxFontSize / relativeMaxFontSize);
  
	  // Viewport width calculations
	  const viewportWidth =
		(100 * (maxFontSize - minFontSize)) /
		(relativeMaxViewportWidth - relativeMinViewportWidth);
  
	  // Relative font size calculation
	  const relativeFontSize =
		(relativeMinViewportWidth * maxFontSize -
		  relativeMaxViewportWidth * minFontSize) /
		(relativeMinViewportWidth - relativeMaxViewportWidth);
  
	  // The magic clamp
	  return `clamp(${minFontSize / 16}rem, ${viewportWidth}vw + ${
		relativeFontSize / 16
	  }rem, ${relativeMaxFontSize / 16}rem)`;
	};
  
	const dynamicFontEls = document.querySelectorAll("[data-dynamic-font-size]");
  
	dynamicFontEls.forEach((dynamicFontEl) => {
	  dynamicFontEl.style.fontSize = dynamicFontSize(
		dynamicFontEl.textContent.replace(/(<([^>]+)>)/gi, "").trim().length
	  );
	});
  
}

window.onload = (event) => {
//in case I want to make something run at launch
}

function shuffle(array) {
	let currentIndex = array.length;
  
	// While there remain elements to shuffle...
	while (currentIndex != 0) {
  
	  // Pick a remaining element...
	  let randomIndex = Math.floor(rand() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
}

function toggleRed() {
	if(this.style.backgroundColor != `red`) {
		this.style.backgroundColor = `red`;
	} else {
		this.style.backgroundColor = ``;
	}
	
}

function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}

function sfc32(a, b, c, d) {
    return function() {
      a |= 0; b |= 0; c |= 0; d |= 0; 
      var t = (a + b | 0) + d | 0;
      d = d + 1 | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}

function setSeed(seedString) {
	var seedHash = cyrb128(seedString);
	rand = sfc32(seedHash[0], seedHash[1], seedHash[2], seedHash[3]);
}