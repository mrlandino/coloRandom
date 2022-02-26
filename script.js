var mainPalette = {
  displayContainer: document.querySelector('.display-container'),
  buttonContainer: document.querySelector('.button-container'),
  savedPaletteContainer: document.querySelector('.saved-palettes-container'),
  currentPalette: '',
  savedPalettes: [],

  createNew() {
      this.currentPalette = new Palette();
      this.displayMain()
  },

  newPaletteButton() {
      this.currentPalette.refresh();
      this.displayMain()
  },

  resetLocks() {
    this.currentPalette.palette.forEach((color) => {
      color.locked = false;
    })
  },
  
  savePaletteButton() {
    if (this.savedPalettes.length = 8) {
      this.savedPalettes.pop()
    }
    this.savedPalettes.unshift(this.currentPalette);
    this.resetLocks();
    this.createNew();
    this.displaySaved();
  },

  displaySaved() {
    var smallPalettes = '';
    console.log(this.savedPalettes)
    this.savedPalettes.forEach((object) =>{
     smallPalettes += `<section class="container saved-palette" data-palette-number="${object.id}">
        <section class="swatch-small" style="background-color:${object.palette[0].hexCode};" ></section>
        <section class="swatch-small" style="background-color:${object.palette[1].hexCode};" ></section>
        <section class="swatch-small" style="background-color:${object.palette[2].hexCode};" ></section>
        <section class="swatch-small" style="background-color:${object.palette[3].hexCode};" ></section>
        <section class="swatch-small" style="background-color:${object.palette[4].hexCode};" ></section>
        <img class="icon trash" src="./assets/trashcan.svg" alt="trash can">
      </section>`
    })
    this.savedPaletteContainer.innerHTML = smallPalettes;
  },

  displayMain() {
    var cards = '';
    for (i = 0; i < this.currentPalette.palette.length; i++) {
      var unlock = ""
      var lock = "hidden"
    if (this.currentPalette.palette[i].locked) {
      unlock = "hidden"
      lock = ""
    }
      cards += `<section class="card large" >
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
  }
}

var savedPalettes = [];




window.addEventListener('load', mainPalette.createNew());

mainPalette.displayContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains("unlock") || e.target.classList.contains("lock")) {
    var lockId = e.target.dataset.indexNumber;
    mainPalette.currentPalette.toggleLock(lockId);
    mainPalette.displayMain();
  } 
})

mainPalette.buttonContainer.addEventListener('click', function (e) {
  if (e.target.id === "newPalette") {
    mainPalette.newPaletteButton();
  } else if (e.target.id === "savePalette") {
    mainPalette.savePaletteButton();
  }
})