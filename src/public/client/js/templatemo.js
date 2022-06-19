/*

TemplateMo 559 Zay Shop

https://templatemo.com/tm-559-zay-shop

*/

'use strict';
$(document).ready(function () {

  // Accordion
  // var all_panels = $('.templatemo-accordion > li > ul').hide();

  // $('.templatemo-accordion > li > a').click(function() {
  //     var target =  $(this).next();
  //     if(!target.hasClass('active')){
  //         // all_panels.removeClass('active').slideUp();
  //         target.addClass('active').slideDown();
  //     }
  //     else if(target.hasClass('active')){
  //       target.removeClass('active').slideUp();
  //   }

  //   return false;
  // });
  // End accordion

  // Product detail
  $('.product-links-wap a').click(function () {
    var this_src = $(this).children('img').attr('src');
    $('#product-detail').attr('src', this_src);
    return false;
  });
  $('#btn-minus').click(function () {
    var val = $("#var-value").html();
    val = (val == '1') ? val : val - 1;
    $("#var-value").html(val);
    $("#product-quanity").val(val);
    return false;
  });
  $('#btn-plus').click(function () {
    var val = $("#var-value").html();
    val++;
    $("#var-value").html(val);
    $("#product-quanity").val(val);
    return false;
  });
  $('.btn-size').click(function () {
    var this_val = $(this).html();
    $("#product-size").val(this_val);
    $(".btn-size").removeClass('btn-secondary');
    $(".btn-size").addClass('btn-success');
    $(this).removeClass('btn-success');
    $(this).addClass('btn-secondary');
    return false;
  });
  // End roduct detail

});

// Check box for 1 choice
$("input:checkbox").on('click', function () {
  // in the handler, 'this' refers to the box clicked on
  var $box = $(this);
  if ($box.is(":checked")) {
    // the name of the box is retrieved using the .attr() method
    // as it is assumed and expected to be immutable
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    // the checked state of the group/box on the other hand will change
    // and the current value is retrieved using .prop() method
    $(group).prop("checked", false);
    $box.prop("checked", true);
  } else {
    $box.prop("checked", false);
  }
});


// Filter product by searchbar 
const searchingWord = document.querySelector('#myInput').addEventListener("keyup", function () {
  const keyword = document.querySelector('#myInput');
  const value = keyword.value.toLowerCase()

  const products = document.querySelectorAll('#myDIV').forEach(product => {
    const items = product.querySelector('*').innerText;
    var itemsRemoveComma = items.replaceAll(',', '');
    const inputHidden = product.querySelector('.input-hidden').value;

    if (value == '') {
      product.classList.remove("product-none")
    }

    else if (itemsRemoveComma.toLowerCase().indexOf(value) > -1 || inputHidden.toLowerCase().indexOf(value) > -1) {
      product.classList.remove("product-none")
    }

    else {
      product.classList.add("product-none")
    }
  });
});


// Filter product by leftside bar
const checkBtns = document.querySelectorAll('.check-btn').forEach(checkbox => {

  checkbox.addEventListener('change', function () {
    const products = document.querySelectorAll('#myDIV').forEach(product => {
      const items = product.querySelector('*').innerText;  
      var itemsRemoveComma = items.replaceAll(',', '');
      const inputHidden = product.querySelector('.input-hidden').value;
      
      if (this.checked) {
        const value = this.value.toLowerCase()

          if (itemsRemoveComma.toLowerCase().indexOf(value) > -1 || inputHidden.toLowerCase().indexOf(value) > -1) {
            product.classList.remove("product-none")
          }

          else {
            product.classList.add("product-none")
          }
      }
      else {
        product.classList.remove("product-none")
      }
      // isEmptyProDuct()
      // CheckEmpty()
    })
    
  });
})

//Check empty product list
//Show empty product list
// var productRow = document.querySelector('.js-product-area')
// var productRow2 = document.querySelector('.js-product-area-2')
// var products = productRow.querySelectorAll("#myDIV")

// function CheckEmpty() {
  
//     if(products == null) {
//       productRow.classList.add('p-list-empty')
//     }
//     else if(isEmptyProDuct == true) {
//       productRow.classList.add('p-list-empty')
//     }

//     else if(isEmptyProDuct == false) {
//       productRow.classList.remove('p-list-empty')
//     }
    
//     else {
//       productRow.classList.remove('p-list-empty')
//     }
// }

// function isEmptyProDuct() {
//   for(var i = 0; i < productRow2.children.length; i++) {
//     if(productRow2.children[i].classList.contains('product-none') == false){
//       return false;
//     }
//     else {
//       return true;
//     }
//   }
//   return true;
// }



