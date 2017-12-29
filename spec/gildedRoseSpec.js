describe('Gilded Rose', () => {
  describe('Item', () => {
    let testItem;

    beforeEach(() => {
      testItem = new Item('Aged Brie', 10, 30);
    });

    it('has a name', () => {
      expect(testItem.name).toEqual('Aged Brie');
    });

    it('has a sellIn value', () => {
      expect(testItem.sellIn).toEqual(10);
    });

    it('has a quality value', () => {
      expect(testItem.quality).toEqual(30);
    });
  });

  describe('Shop', () => {
    let testItems;
    let testShop;
    let jam;
    let brie;
    let sulfuras;
    let passes;

    beforeEach(() => {
      jam = new Item('Jar of Jam', 10, 20);
      brie = new Item('Aged Brie', 10, 20);
      sulfuras = new Item('Sulfuras, Hand of Ragnaros', 10, 20);
      passes = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20);
      testItems = [jam, brie, sulfuras, passes];
      testShop = new Shop(testItems);
    });

    describe('updateQuality', () => {
      it('lowers the sellIn value of an item by 1', () => {
        testShop.updateQuality();
        expect(jam.sellIn).toEqual(9);
      });

      it('lowers the quality of a standard item by 1', () => {
        testShop.updateQuality();
        expect(jam.quality).toEqual(19);
      });

      it('increases the quality of Aged Brie by 1', () => {
        testShop.updateQuality();
        expect(brie.quality).toEqual(21);
      });

      it('does not effect the sellIn of Sulfuras, Hand of Ragnaros', () => {
        testShop.updateQuality();
        expect(sulfuras.sellIn).toEqual(10);
      });

      it('does not effect the quality of Sulfuras, Hand of Ragnaros', () => {
        testShop.updateQuality();
        expect(sulfuras.quality).toEqual(20);
      });

      it('increases the quality of Backstage Passes by 2 if the sellIn is between 10 and 6', () => {
        testShop.updateQuality();
        expect(passes.quality).toEqual(22);
      });

      it('increases the quality of Backstage Passes by 3 if the sellIn is between 5 and 0', () => {
        passes.sellIn = 5;
        testShop.updateQuality();
        expect(passes.quality).toEqual(23);
      });

      it('decreases the quality of a standard item by 2 if the sellIn is less than 0', () => {
        jam.sellIn = -1;
        testShop.updateQuality();
        expect(jam.quality).toEqual(18);
      });

      it('increases the quality of Aged Brie by 2 if the sellIn is less than 0', () => {
        brie.sellIn = -1;
        testShop.updateQuality();
        expect(brie.quality).toEqual(22);
      });

      it('decreases the quality of Backstage Passes to 0 if the sellIn is less than 0', () => {
        passes.sellIn = -1;
        testShop.updateQuality();
        expect(passes.quality).toEqual(0);
      });

      it('cannot decrease quality below 0', () => {
        jam.quality = 0;
        testShop.updateQuality();
        expect(jam.quality).toEqual(0);
      });

      it('cannot increase quality above 50', () => {
        brie.quality = 50;
        testShop.updateQuality();
        expect(brie.quality).toEqual(50);
      });
    });
  });
});
