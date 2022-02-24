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
                </div>
                <div class="container lock-container">
                    <img class="icon unlock" src="./assets/unlock.png" alt="unlocked">
                    <img class="icon lock hidden" src="./assets/lock.png" alt="locked">
                </div>
                </div>
            </section>`
        }
        this.displayContainer.innerHTML = cards;
    }
    
}

mainPalette.createNew()