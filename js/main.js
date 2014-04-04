$(function() {
  // get user input and validate
  function validate() {
    $('.submitBox').keypress(function(event) {
      var item = $(this).val();
      if (item.trim() == "") {
        return
      }
      if (event.which == 13 && item) {
        $('.activeItems').prepend(
          $('<div class="item"><form><input class="checkBox floatL" type="checkbox"><span class="itemContent floatL">' + item + '</span><button class="delete floatR">X</button></form></div>')
          .fadeIn('slow')
        );
        $(this).val("");
        event.preventDefault();
        itemAnimate();
        editItem();
        moveItem();
        deleteItem();
      }
    });
  }
  
  // complete or uncomplete item
  function moveItem() {
    $('input[type=checkbox]').change(function() {
      var listItem = $(this).closest('.item');
      if (this.checked) {
        $(listItem).prependTo('.completeItems').animate({'opacity': '.3'}).addClass('complete');
      } else {
        $(listItem).appendTo('.activeItems').animate({'opacity': '1'}).removeClass('complete');
      }
    });
  }
  
  // edit item
  function editItem() {
    $('.item').dblclick(function(event) {
      $(this).find('.itemContent').hide();
      $(this).closest('.item').append('<input class="edit floatL" type="text" maxlength="31">');
      var newText = $(this).find('.edit');
      newText.focus();
      event.stopImmediatePropagation();
      
      // click outside of item div to esc
      $(document).one("click", function() {
        $(this).find('.itemContent').show();
        newText.remove(); 
      });
      
      // enter new content or esc
      newText.keydown(function(event) {
        var item = newText.val();
        if (event.which == 27) {
          $(this).closest('.item').find('.itemContent').show();
          newText.remove();
        }
        if (item.trim() == "") {
          return
        }
        if (event.which == 13 && item) {
          $(this).closest('.item').find('.itemContent').text(item).show();
          newText.remove();
        }
      });
    }); 
  }
  
  // delete item
  function deleteItem() {
    $('.delete').click(function(event) {
      $(this).closest('.item').fadeOut('fast', function() {
        $(this).remove();
      });
      event.preventDefault();
    })
  }
  
  // delete item animation
  function itemAnimate() {
    $('.item').mouseenter(function() {
      $(this).find('.delete').finish().show().animate({'opacity': '1'});
    })
    .mouseleave(function() {
      $(this).find('.delete').hide().css({'opacity': '0'})
    });
  }
  
  // reset list
  function resetList() {
    $('.reset').click(function() {
      $('.item').remove();
      $('.item').fadeOut('fast', function() {
        $('.item').remove();
      });
      event.preventDefault();
    })
  }
  
  // instructions
  function instructions() {
    $('.howTo').click(function(event) {
      $('.item').hide();
      $('.addHow').fadeIn('slow');
      $('.demo').fadeIn('slow');
      $('.demo').find('.delete').show();
      $(":input").prop("disabled", true);
      event.stopPropagation();
      $(document).one('click', function() {
        $('.item').fadeIn('slow');
        $('.addHow').hide();
        $('.demo').hide();
        $(":input").prop("disabled", false);
      });
    });
  }
  
  // start handlers
  itemAnimate();
  validate();
  moveItem();
  editItem();
  deleteItem();
  resetList();
  instructions();
})