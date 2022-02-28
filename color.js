class Color {
  constructor() {
    this.hexCode = this.getRandomHex();
    this.locked = false;
  }

  getRandomHex() {
    var hex = '#';
    for(var i=0; i< 6; i++) {
      hex += this.getRandomElement();
    }
    return hex;
  }

  getRandomElement() {
    var hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    return hexArray[Math.floor(Math.random() * hexArray.length)];
  }
}
  
