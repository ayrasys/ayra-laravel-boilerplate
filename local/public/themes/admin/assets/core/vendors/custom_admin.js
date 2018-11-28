$("#editProfileName").click(function(event){
    event.preventDefault();
    $('.editProfileName').css('background','',).css('border-color','#F1F1F1');
    $('.editProfileName').removeAttr("disabled");
    $('.editProfileNameSave').css("display","block");

});
  $('#btnSaveProfile').click(function(){
    $('.editProfileName').attr("disabled", "disabled");
    $('.editProfileNameSave').css("display","none");

  });

  $("#editProfileAddress").click(function(event){
      event.preventDefault();
      $('.editProfileName').css('background','',).css('border-color','#F1F1F1');
      $('.editProfileName').removeAttr("disabled");
      $('.editProfileNameAddress').css("display","block");

  });
  $('#btnSaveProfileAddress').click(function(){
    alert('address');
    $('.editProfileName').attr("disabled", "disabled");
    $('.editProfileNameAddress').css("display","none");

  });
$.key('esc', function() {
   // alert('esc');
});

$.key('ctrl+c', function() {
    //alert('Your Press Ctrl+c');
});
$(document).key('ctrl+shift+a', function() {
    //alert('ctrl+shift+a');
});
