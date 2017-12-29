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

  describe('Standard Item', () => {
    let testItem;

    beforeEach(() => {
      testItem = new StandardItem('Jar of Jam', 10, 20);
    });

    describe('update', () => {
      it('decreases the sellIn by 1', () => {
        testItem.update();
        expect(testItem.sellIn).toEqual(9);
      });

      it('decreases the quality by 1', () => {
        testItem.update();
        expect(testItem.quality).toEqual(19);
      });

      it('decreases the quality by 2 if out of date', () => {
        testItem.sellIn = -1;
        testItem.update();
        expect(testItem.quality).toEqual(18);
      });

      it('cannot decrease quality below zero', () => {
        testItem.quality = 0;
        testItem.update();
        expect(testItem.quality).toEqual(0);
      });
    });
  });

  describe('Aged Brie', () => {
    let testBrie;

    beforeEach(() => {
      testBrie = new AgedBrie('Aged Brie', 10, 20);
    });

    describe('update', () => {
      it('decreases the sellIn by 1', () => {
        testBrie.update();
        expect(testBrie.sellIn).toEqual(9);
      });

      it('increases the quality by 1', () => {
        testBrie.update();
        expect(testBrie.quality).toEqual(21);
      });

      it('increases the quality by 2 if out of date', () => {
        testBrie.sellIn = -1;
        testBrie.update();
        expect(testBrie.quality).toEqual(22);
      });

      it('cannot increase the quality above 50', () => {
        testBrie.quality = 50;
        testBrie.update();
        expect(testBrie.quality).toEqual(50);
      });
    });
  });

  describe('Base Item', () => {
    let testSulfuras;
    
    beforeEach(() => {
      testSulfuras = new BaseItem('Sulfuras, Hand of Ragnaros', 10, 80);
    });
    
    describe('update', () => {
      it('does not change its sellIn', () => {
        testSulfuras.update();
        expect(testSulfuras.sellIn).toEqual(10);
      });

      it('does not change its quality', () => {
        testSulfuras.update();
        expect(testSulfuras.quality).toEqual(80);
      });
    });
  });

  describe('Backstage Passes', () => {
    let testPasses;

    beforeEach(() => {
      testPasses = new BackstagePasses('Backstage passes to a TAFKAL80ETC concert', 20, 20);
    });

    describe('update', () => {
      it('decreases the sellIn by 1', () => {
        testPasses.update();
        expect(testPasses.sellIn).toEqual(19);
      });

      it('increases the quality by 1', () => {
        testPasses.update();
        expect(testPasses.quality).toEqual(21);
      });

      it('increases the quality by 2 with 10 days remaining', () => {
        testPasses.sellIn = 10;
        testPasses.update();
        expect(testPasses.quality).toEqual(22);
      });

      it('increases the quality by 3 with 5 days remaining', () => {
        testPasses.sellIn = 5;
        testPasses.update();
        expect(testPasses.quality).toEqual(23);
      });

      it('decreases the quality to zero with no days remaining', () => {
        testPasses.sellIn = 0;
        testPasses.update();
        expect(testPasses.quality).toEqual(0);
      });

      it('cannot increase the quality above 50', () => {
        testPasses.quality = 50;
        testPasses.update();
        expect(testPasses.quality).toEqual(50);
      });
    });
  });

  describe('Conjured Item', () => {
    let testConjured;

    beforeEach(() => {
      testConjured = new ConjuredItem('Conjured Jar of Jam', 10, 20);
    });

    describe('update', () => {
      it('reduces the sellIn by 1', () => {
        testConjured.update();
        expect(testConjured.sellIn).toEqual(9);
      });

      it('reduces the quality by 2', () => {
        testConjured.update();
        expect(testConjured.quality).toEqual(18);
      });

      it('reduces the quality by 4 if out of date', () => {
        testConjured.sellIn = 0;
        testConjured.update();
        expect(testConjured.quality).toEqual(16);
      });

      it('cannot reduce the quality below zero', () => {
        testConjured.quality = 0;
        testConjured.update();
        expect(testConjured.quality).toEqual(0);
      });
    });
  });

  describe('Shop', () => {
    let testItems;
    let testShop;
    let jam;
    let brie;
    let sulfuras;
    let passes;
    let conjured;

    beforeEach(() => {
      jam = new Item('Jar of Jam', 10, 20);
      brie = new Item('Aged Brie', 10, 20);
      sulfuras = new Item('Sulfuras, Hand of Ragnaros', 10, 20);
      passes = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20);
      conjured = new Item('Conjured Jar of Jam', 10, 20);
      testItems = [jam, brie, sulfuras, passes, conjured];
      testShop = new Shop(testItems);
    });

    describe('categoriseItems', () => {
      beforeEach(() => {
        testShop.categoriseItems();
      });

      it('creates an array of categorised items', () => {
        expect(testShop.workingItems).toEqual(jasmine.any(Array));
      });

      it('turns any standard items into instances of the standard item class', () => {
        expect(testShop.workingItems[0]).toEqual(jasmine.any(StandardItem));
      });

      it('turns any Aged Brie into instances of the AgedBrie class', () => {
        expect(testShop.workingItems[1]).toEqual(jasmine.any(AgedBrie));
      });
      
      it('turns any Sulfuras into instances of the BaseItem class', () => {
        expect(testShop.workingItems[2]).toEqual(jasmine.any(BaseItem));
      });
      
      it('turns any backstage passes into instances of the BackstagePasses class', () => {
        expect(testShop.workingItems[3]).toEqual(jasmine.any(BackstagePasses));
      });

      it('turns any conjured items into instances of the ConjuredItem class', () => {
        expect(testShop.workingItems[4]).toEqual(jasmine.any(ConjuredItem));
      });
    });

    describe('updateOriginalList', () => {
      it('updates the original items list according to the workingItems list', () => {
        testShop.workingItems = [new StandardItem('Jar of Jam', 9, 19)];
        testShop.updateOriginalList();
        expect(jam.sellIn).toEqual(9);
      });
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
