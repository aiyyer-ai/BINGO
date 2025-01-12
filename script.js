var rand;
let gridSize = {
  x: 5,
  y: 5,
  gap: 5
};

let possibleSquares = [
	`"CUNT... Sorry"`,
	`UNPROMPTED rags on gavin :)`,
	`"predicts" what someone would say`,
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
	`asks game question she WANTS answered`,
	`overgrips controller / panic crouch`,
	`clears throat mm-Hmm`,
	`talks about philly`,
	`"deez nuts"`,
	`whispers to self`,
	`"i hate it here"`,
];

var masterSquares = {};

window.onload = (event) => {
	//in case I want to make something run at launch
	if(window.location.search.replace(`?`,``) == `master`) {
		Array.from(document.querySelectorAll(`.notMaster`)).forEach((element) => {
			element.style.display = `none`;
		});
		let centerDiv = document.getElementById(`center`);
		let masterDiv = document.createElement(`div`);
		masterDiv.classList.add(`masterBoard`);
		masterDiv.id = `masterBoard`;
		let allFactors = {};
		let loopAttempts = 0;
		while(Object.keys(allFactors).length == 0) {
			allFactors = getPairedFactors(possibleSquares.length + loopAttempts);
			for([key, pair] of Object.entries(allFactors)) {
				if(pair[1] - pair[0] > 5) {
					delete allFactors[key];
				}
			}
			loopAttempts++;
		}
		let amountX = Object.values(allFactors)[0][1];
		let amountY = Object.values(allFactors)[0][0];
		let xSize = `calc(${100/amountX}% - ${gridSize.gap - gridSize.gap/amountX}px) `;
		masterDiv.style.gridTemplateColumns = xSize.repeat(amountX);
		let ySize = `calc(${100/amountY}% - ${gridSize.gap - gridSize.gap/amountY}px) `;
		masterDiv.style.gridTemplateRows = ySize.repeat(amountY);
		centerDiv.appendChild(masterDiv);
		let titleTextBounds = document.getElementById(`title`).getBoundingClientRect();
		masterDiv.style.top = titleTextBounds.bottom + 10 + "px";
		for (text of possibleSquares) {
		masterSquares[text] = false;
		let newDiv = document.createElement(`div`);
			newDiv.classList.add(`cell`);
			newDiv.id = text;
			let newH1 = document.createElement(`H1`);
			newH1.classList.add(`bingoText`, `needsResizing`);
			//newH1.setAttribute(`data-dynamic-font-size`, "");
			let newText = document.createTextNode(text.toUpperCase());
			newH1.appendChild(newText);
			newDiv.appendChild(newH1);
			let bellaX = document.createElement(`div`);
			bellaX.classList.add(`bellaX`);	
			newDiv.appendChild(bellaX);
			newDiv.bellaX = bellaX;
			masterDiv.appendChild(newDiv);
			newDiv.onclick = toggleMaster;
		}
		let checkBar = document.createElement(`div`);
			checkBar.classList.add(`checkBar`);
			centerDiv.appendChild(checkBar);
			let checkInput = document.createElement(`input`);
			checkInput.classList.add(`input`);
			checkInput.setAttribute(`type`, "text");
			checkInput.setAttribute(`id`, "checkInput");
			checkInput.setAttribute(`maxLength`, "6");
			checkInput.setAttribute(`placeholder`, "Card Seed");
			checkBar.appendChild(checkInput);
			let checkButton = document.createElement(`button`);
			checkButton.classList.add(`button`);
			checkButton.setAttribute(`onclick`, "checkBoardSeed()");
			checkButton.innerHTML = `Check!`;
			checkBar.appendChild(checkButton);
			let masterBounds = masterDiv.getBoundingClientRect();
			checkBar.style.top = masterBounds.top + "px";
			checkBar.style.left = masterBounds.right + (window.innerWidth - masterBounds.right) / 2 - checkBar.clientWidth / 2 + "px";
		let miniBingo = document.createElement(`div`);
			miniBingo.classList.add(`miniBingo`);
			centerDiv.appendChild(miniBingo);
			miniBingo.style.width = window.innerWidth - masterBounds.right - 50 + "px";
			miniBingo.style.height = window.innerWidth - masterBounds.right - 50 + "px";
			miniBingo.style.top = checkBar.getBoundingClientRect().bottom + 10 + "px";
			miniBingo.style.left = masterBounds.right + (window.innerWidth - masterBounds.right) / 2 - miniBingo.clientWidth / 2 + "px";
			miniBingo.style.gap = gridSize.gap + "px";
			let xSizeMini = `calc(${100/gridSize.x}% - ${gridSize.gap - 1}px) `;
			miniBingo.style.gridTemplateColumns = xSizeMini.repeat(gridSize.x);
			let ySizeMini = `calc(${100/gridSize.y}% - ${gridSize.gap - 1}px) `;
			miniBingo.style.gridTemplateRows = ySizeMini.repeat(gridSize.y);
		for (row = 0; row < gridSize.x; row++) {
			for (column = 0; column < gridSize.y; column++) {
				let newDiv = document.createElement(`div`);
				newDiv.classList.add(`cell`);
				newDiv.id = `${row},${column}`;
				let newH1 = document.createElement(`H1`);
				newH1.classList.add(`bingoText`);
				//newH1.setAttribute(`data-dynamic-font-size`, "");
				if(newDiv.id == `2,2`) {
					newH1.classList.add(`needsResizing`);
					let newText = document.createTextNode(`LATE (FREE SPACE)`);
					newH1.appendChild(newText);
				} else {
					let newText = document.createTextNode(``);
					newH1.appendChild(newText);
				}
				newDiv.appendChild(newH1);
				newDiv.textNode = newH1;
				let bellaX = document.createElement(`div`);
				bellaX.classList.add(`bellaX`);	
				newDiv.appendChild(bellaX);
				newDiv.bellaX = bellaX;
				miniBingo.appendChild(newDiv);
			}
		}
		adjustTextSize();
	}
}
	
function checkBoardSeed() {
	const inputData = document.getElementById("checkInput");
	let inputSeed = inputData.value.toUpperCase();
	setSeed(inputSeed);
	let squaresCopy = [...possibleSquares];
	shuffle(squaresCopy);
	for (row = 0; row < gridSize.x; row++) {
		for (column = 0; column < gridSize.y; column++) {
			let checkSquare = document.getElementById(`${row},${column}`);
			if(checkSquare.id != `2,2`) {
				checkSquare.textNode.childNodes[0].nodeValue = squaresCopy[(row * gridSize.x) + column].toUpperCase();
				checkSquare.textNode.classList.add(`needsResizing`);
				if(masterSquares[squaresCopy[(row * gridSize.x) + column]]) {
					checkSquare.bellaX.style.backgroundColor = `deeppink`;
				} else {
					checkSquare.bellaX.style.backgroundColor = ``;
				}
			} else {
				checkSquare.bellaX.style.backgroundColor = `deeppink`;
			}
		}
	}
	adjustTextSize();
}

function generateBoard(button) {
	const inputBar = document.getElementById("seedInput");
	const shaneGif = document.getElementById("gif");
	const gabPeek = document.getElementById("gabpeek");
	const bellsPeek = document.getElementById("bellspeek");
	let randomSeed = inputBar.value.toUpperCase();
	inputBar.style.display = `none`;
	button.style.display = `none`;
	shaneGif.style.display = `none`;
	gabPeek.style.display = `none`;
	bellsPeek.style.display = `none`;
	setSeed(randomSeed);
	let seedDiv = document.getElementById(`seed`);
	seedDiv.innerHTML = `SEED: ${randomSeed}`;
	shuffle(possibleSquares);
	let bingoCard = document.getElementById(`bingoCard`);
	if(bingoCard.clientWidth > window.innerWidth) {
		bingoCard.style.width = `100vw`;
		bingoCard.style.height = `100vw`;
	}
	bingoCard.style.visibility = `visible`;
	bingoCard.style.gap = gridSize.gap + "px";
	let xSize = `calc(${100/gridSize.x}% - ${gridSize.gap - 1}px) `;
	bingoCard.style.gridTemplateColumns = xSize.repeat(gridSize.x);
	let ySize = `calc(${100/gridSize.y}% - ${gridSize.gap - 1}px) `;
	bingoCard.style.gridTemplateRows = ySize.repeat(gridSize.y);
	for (row = 0; row < gridSize.x; row++) {
	  for (column = 0; column < gridSize.y; column++) {
		  let newDiv = document.createElement(`div`);
		  newDiv.classList.add(`cell`);
		  newDiv.id = `${row},${column}`;
		  let newH1 = document.createElement(`H1`);
		  newH1.classList.add(`bingoText`, `needsResizing`);
		  //newH1.setAttribute(`data-dynamic-font-size`, "");
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
		  let bellaX = document.createElement(`div`);
		  bellaX.classList.add(`bellaX`);	
		  newDiv.appendChild(bellaX);
		  newDiv.bellaX = bellaX;
		  bingoCard.appendChild(newDiv);
		  newDiv.onclick = toggleRed;
	  }
	}
  
	adjustTextSize();

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
	if(this.bellaX.style.backgroundColor != `deeppink`) {
		this.bellaX.style.backgroundColor = `deeppink`;
	} else {
		this.bellaX.style.backgroundColor = ``;
	}
	
}

function toggleMaster() {
	masterSquares[this.id] = !masterSquares[this.id];
	if(this.bellaX.style.backgroundColor != `deeppink`) {
		this.bellaX.style.backgroundColor = `deeppink`;
	} else {
		this.bellaX.style.backgroundColor = ``;
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

function getPairedFactors(num) {
	const factors = {};
	let factorNum = 0;
  
	for (let i = 1; i <= Math.sqrt(num); i++) {
	  if (num % i === 0) {
		factors[factorNum] = [i, num / i];
	  }
	}
  
	return factors;
}

// function adjustTextSize() {
// 	const dynamicFontSize = (textLength, halfTextSize = false) => {
// 		/**
// 		 * Edit these values to suit your needs
// 		 */
// 		// Them minimum and maximum font sizes in pixels
// 		const minFontSize = 14;
// 		const maxFontSize = 35;

// 		// The minimum and maximum line lengths in characters that should affect size
// 		const minLineLength = 12;
// 		const maxLineLength = 50;

// 		// The minimum and maximum viewport widths in pixels where resizing should occur
// 		const minViewportWidth = 1;
// 		const maxViewportWidth = 4000;

// 		/**
// 		 * Danger, calculations below, tread carefully
// 		 */
// 		// Relative max font size, gets bigger the fewer characters there are, down to minLineLength
// 		const relativeMaxFontSize =
// 			textLength < minLineLength
// 			? maxFontSize
// 			: textLength > maxLineLength
// 			? minFontSize
// 			: maxFontSize -
// 				((maxFontSize - minFontSize) * (textLength - minLineLength)) /
// 				(maxLineLength - minLineLength);

// 		// Relative max viewport width, gets smaller the bigger the font size so it doesn't resize too soon
// 		const relativeMaxViewportWidth =
// 			maxViewportWidth * (minFontSize / relativeMaxFontSize);

// 		// Relative min viewport width, gets bigger the smaller the font size so it doesn't resize too late
// 		const relativeMinViewportWidth =
// 			minViewportWidth * (maxFontSize / relativeMaxFontSize);

// 		// Viewport width calculations
// 		const viewportWidth =
// 			(100 * (maxFontSize - minFontSize)) /
// 			(relativeMaxViewportWidth - relativeMinViewportWidth);

// 		// Relative font size calculation
// 		const relativeFontSize =
// 			(relativeMinViewportWidth * maxFontSize -
// 			relativeMaxViewportWidth * minFontSize) /
// 			(relativeMinViewportWidth - relativeMaxViewportWidth);

// 		// The magic clamp
// 		if(halfTextSize) {
// 			return `clamp(${minFontSize / 32}rem, ${viewportWidth}vw + ${
// 				relativeFontSize / 32
// 			}rem, ${relativeMaxFontSize / 32}rem)`;
// 		} else {
// 			return `clamp(${minFontSize / 16}rem, ${viewportWidth}vw + ${
// 				relativeFontSize / 16
// 			}rem, ${relativeMaxFontSize / 16}rem)`;
// 		}

// 	};

// 		const dynamicFontEls = document.querySelectorAll("[data-dynamic-font-size]");

// 		dynamicFontEls.forEach((dynamicFontEl) => {
// 			dynamicFontEl.style.fontSize = dynamicFontSize(
// 				dynamicFontEl.textContent.replace(/(<([^>]+)>)/gi, "").trim().length
// 			);
// 		});

// 		const dynamicSmaller = document.querySelectorAll("[data-dynamic-font-size-smaller]");

// 		dynamicSmaller.forEach((dynamicFontSmall) => {
// 			dynamicFontSmall.style.fontSize = dynamicFontSize(
// 				dynamicFontSmall.textContent.replace(/(<([^>]+)>)/gi, "").trim().length,
// 				true
// 			);
// 		});
// }

function adjustTextSize() {

	const isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => (scrollWidth > clientWidth) || (scrollHeight > clientHeight);

	const resizeText = ({ element, elements, minSize = 1, maxSize = 20, step = 1, unit = 'vh' }) => {
	(elements || [element]).forEach(el => {
		let i = minSize
		let overflow = false

			const parent = el.parentNode

		while (!overflow && i < maxSize) {
			el.style.fontSize = `${i}${unit}`
			overflow = isOverflown(parent)

		if (!overflow) i += step
		}

		// revert to last state where no overflow happened
		el.style.fontSize = `${i - step}${unit}`
		el.classList.remove(`needsResizing`);
	})
	}

	resizeText({
		elements: document.querySelectorAll('.needsResizing'),
		step: 0.25
	  })

}