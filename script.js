var mainPalette = {
    displayContainer: document.querySelector('.display-container'),
    currentPalette: '',

    createNew() {
        this.currentPalette = new Palette();
        this.display()
    },

    newPaletteButton() {
        this.currentPalette.refresh();
        this.display()
    },

    savePaletteButton() {
      console.log("save works")
    },

    display() {
        var cards = '';
        for (i = 0; i < this.currentPalette.palette.length; i++) {
            cards += `<section class="card large" data-index-number="${i}">
                <div class= "container swatch-display-container">
                <section class ="swatch-large" style="background-color:${this.currentPalette.palette[i].hexCode};"></section>
                </div>
                <div class ="container swatch-info-container">
                <div class="container hex-container">
                    <label class="hex-code">${this.currentPalette.palette[i].hexCode}</label>
                </div>`
            if(!this.currentPalette.palette[i].locked) {
              cards += `
                <div class="container lock-container">
                    <img class="icon unlock" src="./assets/unlock.svg" alt="unlocked">
                    <img class="icon lock hidden" src="./assets/lock.svg" alt="locked">
                </div>
                </div>
            </section>`
          } else {
            cards += `
                <div class="container lock-container">
                    <img class="icon unlock hidden" src="./assets/unlock.svg" alt="unlocked">
                    <img class="icon lock" src="./assets/lock.svg" alt="locked">
                </div>
                </div>
            </section>`
          }
        }
        this.displayContainer.innerHTML = cards;
    }
}

window.addEventListener('load', mainPalette.createNew());

document.addEventListener('click', function(e) {
  if(e.target.classList.contains("unlock") || e.target.classList.contains("lock")) {
    var lockId = e.target.parentNode.parentNode.parentNode.dataset.indexNumber;
    mainPalette.currentPalette.toggleLock(lockId);
    mainPalette.display();
  } else if(e.target.id === "newPalette") {
    mainPalette.newPaletteButton();
  } else if(e.target.id === "savePalette"){
    mainPalette.savePaletteButton();
  }
})
