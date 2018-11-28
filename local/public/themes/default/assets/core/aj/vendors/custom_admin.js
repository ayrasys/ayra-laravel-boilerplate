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
    alert('Your Press Ctrl+c');
});
$(document).key('ctrl+shift+a', function() {
    //alert('ctrl+shift+a');
});



var mQuickSidebar_profile = function() {
    var t = $("#m_quick_sidebar"),
        e = $("#m_quick_sidebar_tabs"),
        a = t.find(".m-quick-sidebar__content"),
        n = function() {
            ! function() {
                var a = $("#m_quick_sidebar_tabs_messenger");
                if (0 !== a.length) {
                    var n = a.find(".m-messenger__messages"),
                        o = function() {
                            var o = t.outerHeight(!0) - e.outerHeight(!0) - a.find(".m-messenger__form").outerHeight(!0) - 120;
                            n.css("height", o), mApp.initScroller(n, {})
                        };
                    o(), mUtil.addResizeHandler(o)
                }
            }()            
            
        };
    return {
        init: function() {
            0 !== t.length && new mOffcanvas("m_quick_sidebar", {
                overlay: !0,
                baseClass: "m-quick-sidebar",
                closeBy: "m_quick_sidebar_close",
                toggleBy: "m_quick_sidebar_toggle"
            }).one("afterShow", function() {
                mApp.block(t), setTimeout(function() {
                    mApp.unblock(t), a.removeClass("m--hide"), n()
                }, 1e3)
            })
        }
    }
}();
$(document).ready(function() {
    mQuickSidebar_profile.init()
});

