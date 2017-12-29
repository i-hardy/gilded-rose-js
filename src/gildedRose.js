class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class StandardItem extends Item {
  update(){
    this.sellIn -= 1;
    this.quality -= this.sellIn < 0 ? 2 : 1;
    this.quality = this.quality < 0 ? 0 : this.quality;
  }
}

class AgedBrie extends Item {
  constructor (sellIn, quality) {
    super('Aged Brie', sellIn, quality);
  }
  update(){
    this.sellIn -= 1;
    this.quality += this.sellIn < 0 ? 2 : 1;
    this.quality = this.quality > 50 ? 50 : this.quality;
  }
}

class Sulfuras extends Item {
  constructor(sellIn, quality) {
    super('Sulfuras, Hand of Ragnaros', sellIn, quality);
  }
  update() {}
}

class BackstagePasses extends Item {
  constructor(sellIn, quality) {
    super('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);
  }
  determineQuality(){
    switch (true) {
      case this.sellIn < 0:
        this.quality = 0;
        break;
      case this.sellIn < 6:
        this.quality += 3;
        break;
      case this.sellIn < 11:
        this.quality += 2;
        break;
      default:
        this.quality += 1;
    }
  }
  update(){
    this.sellIn -= 1;
    this.determineQuality();
    this.quality = this.quality > 50 ? 50 : this.quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
