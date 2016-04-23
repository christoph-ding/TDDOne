// Dependencies
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var CartSummary = require('./../../src/part1/cart-summary.js');
var tax = require('./../../src/part1/tax.js');


describe('CartSummary', function() {
  it('getSubtotal() should return 0 if nothing was passed in', function() {
    var cartSummary = new CartSummary([]);
    expect(cartSummary.getSubtotal()).to.equal(0);
  })

  it('getSubtotal() return the total price of all the all items in the cart', function() {
    var cartSummary = new CartSummary([{
    id: 1,
    quantity: 4,
    price: 50
    }, {
    id: 2,
    quantity: 2,
    price: 30
    }, {
    id: 3,
    quantity: 1,
    price: 40
    }]);
    expect(cartSummary.getSubtotal()).to.equal(300);
  })
});

describe('getTax()', function() {
  beforeEach(function () {
    // for testing the calculate method of tax, we are gonna use this function instead
    sinon.stub(tax, 'calculate', function(subtotal, state, done) {
      // calculate simply waits 0 ms, then invokes callback 'done' with an object with amount 30
      setTimeout(function() {
        done({
          amount: 30
        });
      }, 0);
    });
  });

  afterEach(function () {
    tax.calculate.restore();
  });

  it('get Tax() should execute the callback function with the tax amount', function(done) {
    var cartSummary = new CartSummary([{
      id: 1,
      quantity: 4,
      price: 50
    }, {
      id: 2,
      quantity: 2,
      price: 30 
    }, {
      id: 3,
      quantity: 1,
      price: 40 
    }]);

    cartSummary.getTax('NY', function(taxAmount) {
      expect(taxAmount).to.equal(30);
      done();
    });
  });
});
