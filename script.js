var mainPalette = {
  displayContainer: document.querySelector('.display-container'),
  buttonContainer: document.querySelector('.button-container'),
  savedPaletteContainer: document.querySelector('.saved-palettes-container'),
  currentPalette: '',
  savedPalettes: [],

  newPaletteButton() {
    this.currentPalette.refresh();
    this.displayMain();
  },

  savePaletteButton() {
    if (this.savedPalettes.length === 8) {
      this.savedPalettes.pop();
    }
    this.savedPalettes.unshift(this.currentPalette);
    this.createNew();
    this.displaySaved();
  },

  createNew() {
    this.currentPalette = new Palette();
    this.displayMain();
  },

  deletePalette(paletteId) {
    this.savedPalettes.splice(paletteId, 1);
    this.displaySaved();
  },

  displayMain() {
    var cards = '';
    for (i = 0; i < this.currentPalette.palette.length; i++) {
      var unlock = "";
      var lock = "hidden";
      if (this.currentPalette.palette[i].locked) {
        unlock = "hidden";
        lock = "";
      }
      cards += `
      <section class="card large" >
        <div class= "container swatch-display-container">
          <section class ="swatch-large" style="background-color:${this.currentPalette.palette[i].hexCode};"></section>
        </div>
        <div class ="container swatch-info-container">
          <div class="container hex-container">
            <label class="hex-code">${this.currentPalette.palette[i].hexCode}</label>
          </div>
          <div class="container lock-container">
            <img class="icon unlock ${unlock}" data-index-number="${i}" src="./assets/unlock.svg" alt="unlocked">
            <img class="icon lock ${lock}" data-index-number="${i}" src="./assets/lock.svg" alt="locked">
          </div>
        </div>
      </section>`
    }
    this.displayContainer.innerHTML = cards;
  },

  displaySaved() {
    var smallPalettes = '';
    this.savedPalettes.forEach((object, index) => {
      smallPalettes += `
      <section class="container saved-palette" data-palette-number="${index}">
        <section class="swatch-small" style="background-color:${object.palette[0].hexCode};" ></section>
        <section class="swatch-small" style="background-color:${object.palette[1].hexCode};" ></section>
        <section class="swatch-small" style="background-color:${object.palette[2].hexCode};" ></section>
        <section class="swatch-small" style="background-color:${object.palette[3].hexCode};" ></section>
        <section class="swatch-small" style="background-color:${object.palette[4].hexCode};" ></section>
        <img class="icon trash" src="./assets/trashcan.svg" alt="trash can">
      </section>`
    });
    this.savedPaletteContainer.innerHTML = smallPalettes;
  }
}

window.addEventListener('load', mainPalette.createNew());

mainPalette.displayContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains("icon")) {
    mainPalette.currentPalette.toggleLock(e.target.dataset.indexNumber);
    mainPalette.displayMain();
  }
});

mainPalette.buttonContainer.addEventListener('click', function (e) {
  if (e.target.id === "newPalette") {
    mainPalette.newPaletteButton();
  } else if (e.target.id === "savePalette") {
    mainPalette.savePaletteButton();
  }
});

mainPalette.savedPaletteContainer.addEventListener('click', function (e) {
  mainPalette.deletePalette(e.target.parentNode.dataset.paletteNumber);
});
