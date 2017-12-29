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
  update(){
    this.sellIn -= 1;
    this.quality += this.sellIn < 0 ? 2 : 1;
    this.quality = this.quality > 50 ? 50 : this.quality;
  }
}

class Sulfuras extends Item {
  update() {}
}

class BackstagePasses extends Item {
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

class ConjuredItem extends Item {
  update(){
    this.sellIn -= 1;
    this.quality -= this.sellIn < 0 ? 4 : 2;
    this.quality = this.quality < 0 ? 0 : this.quality;
  }
}

class Shop {
  constructor(items = []){
    this.items = items;
    this.itemClasses = {
      default: StandardItem,
      'Aged Brie': AgedBrie,
      'Sulfuras, Hand of Ragnaros': Sulfuras,
      'Backstage passes': BackstagePasses,
      'Conjured': ConjuredItem,
    };
  }
  getItemClass(item){
    const classNames = Object.keys(this.itemClasses);
    return classNames.find(name => item.name.includes(name)) || 'default';
  }
  categoriseItems(){
    this.workingItems = [];
    this.items.forEach(item => {
      const ThisClass = this.itemClasses[this.getItemClass(item)];
      this.workingItems.push(new ThisClass(item.name, item.sellIn, item.quality));
    })
  }
  updateOriginalList(){
    this.workingItems.forEach((item, index) => {
      this.items[index].sellIn = item.sellIn;
      this.items[index].quality = item.quality;
    })
  }
  updateQuality() {
    this.categoriseItems();
    this.workingItems.forEach(item => {
      item.update();
    });
    this.updateOriginalList();
  }
}
