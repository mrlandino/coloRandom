class Palette {
    constructor () {
        this.palette = this.createPalette();
        this.id= Date.now()
    }
    createPalette() {
        var palette = [];
        for (var i =0; i < 5; i++) {
            palette.push(new Color());
        }
        return palette;
    }
    refresh() {
        console.log(this.palette)
        for(var i = 0; i<5; i++) {
            if (!this.palette[i].locked) {
                this.palette.splice(i, 1, new Color());
            }
        }

    }
}
