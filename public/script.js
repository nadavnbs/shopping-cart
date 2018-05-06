
// var ShoppingCart = function () {
//  $cart = $('.cart-list');
//  var cart = [];
// let Total=0;
//   // an array with all of our cart items
//   var wrap ={
//     cart :cart,
//     Total:Total,
//   }
//   var updateCart = function () {
//     // TODO: Write this function. In this function we render the page.
//     // Meaning we make sure that all our cart items are displayed in the browser.
//     // Remember to empty the "cart div" before you re-add all the item elements.
//     $cart.empty();
//     var source = $('#cart-list-template').html();
//     var template = Handlebars.compile(source);
//     var newHTML = template(wrap);
//     $cart.append(newHTML);
//   }
//   var addItem = function (item) {
//     // TODO: Write this function. Remember this function has nothing to do with display. 
//     // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
//     cart.push(item);
//     Total=0;
//     for (let i=0 ; i<cart.length ;i++){
//       Total +=cart[i].itemPrice;
//     }
   
//   }
//   var clearCart = function () {
//     // TODO: Write a function that clears the cart ;-)
//     cart=[];
//     wrap = {};
//     updateCart(); 
//   }
  
  
//   return {
//     wrap:wrap,
//     updateCart: updateCart,
//     addItem: addItem,
//     clearCart: clearCart
//   }
// };
// var app = ShoppingCart();
// // update the cart as soon as the page loads!
// app.updateCart();
// //--------EVENTS---------
// $('.view-cart').on('click', function () {
//   // TODO: hide/show the shopping cart!
//   $('.shopping-cart').toggleClass('show');
// });
// $('.add-to-cart').on('click', function () {
//   // TODO: get the "item" object from the page
//   var itemName = $(this).closest('.item').data().name;
//   var itemPrice = $(this).closest('.item').data().price;
//   var item = {
//     itemName :itemName ,
//     itemPrice: itemPrice
//   }
//   app.addItem(item);
//   app.updateCart();
// });
// $('.clear-cart').on('click', function () {
//   app.clearCart();
// });

var ShoppingCart = function() {
  var STORAGE = 'ShoppingCart';
  var saveToLocalStorage = function() {
      localStorage.setItem(STORAGE, JSON.stringify(cart));
  }
  var getFromLocalStorage = function() {
      return JSON.parse(localStorage.getItem(STORAGE) || '[]');
  }

  var cart = getFromLocalStorage();
  let $shoppingCartList = $('.cart-list');

  var updateCart = function() {
      $shoppingCartList.empty();
      $('.total').html(calculateTotal());
      saveToLocalStorage();
      for (let i = 0; i < cart.length; i++) {
          var source = $('#cart-item-list').html();
          var template = Handlebars.compile(source);
          var newHTML = template(cart[i]);
          $('.cart-list').append(newHTML);
      }
  }

  var calculateTotal = function() {
      var total = 0;

      for (var i = 0; i < cart.length; i++) {
          total += cart[i].price;
      }
      return total;
  }

  var addItem = function(item) {
      cart.push(item)
      saveToLocalStorage();
  }

  var clearCart = function() {
      cart = [];
      updateCart();
      saveToLocalStorage();
  }


  return {
      $shoppingCart: $shoppingCartList,
      cart: cart,
      updateCart: updateCart,
      addItem: addItem,
      clearCart: clearCart
  }
};

var app = ShoppingCart();
app.updateCart();
//--------EVENTS---------
$('.view-cart').on('click', function() {
  $(".shopping-cart").toggleClass("show");
});

$('.add-to-cart').on('click', function() {
  let dataPrice = Number($(this).closest('div.card').attr('data-price'));
  let dataName = $(this).closest('div.card').attr('data-name');
  let item = { name: dataName, price: dataPrice }
  app.addItem(item);
  app.updateCart();
});

$('.clear-cart').on('click', function() {
  app.clearCart();
});