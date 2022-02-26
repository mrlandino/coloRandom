var mainPalette = {
  displayContainer: document.querySelector('.display-container'),
  buttonContainer: document.querySelector('.button-container'),
  savedPaletteContainer: document.querySelector('.saved-palettes-container'),
  currentPalette: '',
  savedPalettes: [],

  createNew() {
      this.currentPalette = new Palette();
      this.display()
  },

  newPaletteButton() {
      this.currentPalette.refresh();
      this.display()
  },

  resetLocks() {
    this.currentPalette.palette.forEach((color) => {
      color.locked = false;
    })
  },
  
  savePaletteButton() {
    this.savedPalettes.push(this.currentPalette);
    this.resetLocks();
    this.createNew();
  },

  display() {
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
    this.displayContainer.innerHTML = cards
  }
}

var savedPalettes = [];




window.addEventListener('load', mainPalette.createNew());

mainPalette.displayContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains("unlock") || e.target.classList.contains("lock")) {
    var lockId = e.target.dataset.indexNumber;
    mainPalette.currentPalette.toggleLock(lockId);
    mainPalette.display();
  } 
})

mainPalette.buttonContainer.addEventListener('click', function (e) {
  if (e.target.id === "newPalette") {
    mainPalette.newPaletteButton();
  } else if (e.target.id === "savePalette") {
    mainPalette.savePaletteButton();
  }
})