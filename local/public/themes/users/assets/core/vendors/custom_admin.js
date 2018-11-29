var DOMReady = function() {
    var t = function() {
      
            $("#m_form_3").validate({
                  rules: {
                      name: {
                          required: !0
                      },
                      phone: {
                          required: !0
                      }
                  },
                  invalidHandler: function(e, r) {
                      mUtil.scrollTo("m_form_3", -200), swal({
                          title: "",
                          text: "There are some errors in your submission. Please correct them.",
                          type: "error",
                          confirmButtonClass: "btn btn-secondary m-btn m-btn--wide",
                          onClose: function(e) {
                              console.log("on close event fired!")
                          }
                      }), e.preventDefault()
                  },
                  submitHandler: function(e) {
                      return swal({
                          title: "",
                          text: "Form validation passed. All good!",
                          type: "success",
                          confirmButtonClass: "btn btn-secondary m-btn m-btn--wide"
                      }), !1
                  }
              }),


      $("#editProfileName").click(function(event){
          event.preventDefault();
          $('.editProfileName').css('background','',).css('border-color','#F1F1F1');
          $('.editProfileName').removeAttr("disabled");
          $('.editProfileNameSave').css("display","block");

      }),
      $('#btnSaveProfile').click(function(){
        $('.editProfileName').attr("disabled", "disabled");
        $('.editProfileNameSave').css("display","none");

      }),
      $("#editProfileAddress").click(function(event){
          event.preventDefault();
          $('.editProfileName').css('background','',).css('border-color','#F1F1F1');
          $('.editProfileName').removeAttr("disabled");
          $('.editProfileNameAddress').css("display","block");

      }),
      $('#btnSaveProfileAddress').click(function(){
        alert('address');
        $('.editProfileName').attr("disabled", "disabled");
        $('.editProfileNameAddress').css("display","none");

      }),
      $.key('esc', function() {
         // alert('esc');
      }),
      $.key('ctrl+c', function() {
          alert('Your Press A Ctrl+c');
      }),
      $.key('ctrl+c', function() {
          //alert('Your Press Ctrl+c');
      }),
      $(document).key('ctrl+shift+a', function() {
          //alert('ctrl+shift+a');
      })




    }
  return {
      init: function() {
          t()
      }
  }

}();
jQuery(document).ready(function() {
    DOMReady.init()
});
