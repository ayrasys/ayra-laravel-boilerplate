var FormRepeater = {
    init: function() {
          $("#m_repeater_1").repeater({
            initEmpty: !1,
            defaultValues: {
                "text-input": "foo"
            },
            show: function() {

                $(this).slideDown()
                alert(444);
            },
            hide: function(e) {
                $(this).slideUp(e)
            }
        }),$("#m_repeater_2").repeater({
            initEmpty: !1,
            defaultValues: {
                "text-input": "foo"
            },
            show: function() {
                $(this).slideDown()
            },
            hide: function(e) {
              //s  confirm("Are you sure you want to delete this element?") && $(this).slideUp(e)
                swal({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    type: "warning",
                    showCancelButton: !0,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel!",
                    reverseButtons: !0
                }).then(function(ey) {
                  if(ey.value){
                    $(this).slideUp(e)
                      e.value ? swal("Deleted!", "Your file has been deleted.", "success") : "cancel" === e.dismiss && swal("Cancelled", "Your imaginary file is safe :)", "error")
                  }

                })

            }
        }), $("#m_repeater_3").repeater({
            initEmpty: !1,
            defaultValues: {
                "text-input": "foo"
            },
            show: function() {
                $(this).slideDown()
            },
            hide: function(e) {
                confirm("Are you sure you want to delete this element?") && $(this).slideUp(e)
            }
        }), $("#m_repeater_4").repeater({
            initEmpty: !1,
            defaultValues: {
                "text-input": "foo"
            },
            show: function() {
                $(this).slideDown()
            },
            hide: function(e) {
                $(this).slideUp(e)
            }
        }), $("#m_repeater_5").repeater({
            initEmpty: !1,
            defaultValues: {
                "text-input": "foo"
            },
            show: function() {
                $(this).slideDown()
            },
            hide: function(e) {
                $(this).slideUp(e)
            }
        }), $("#m_repeater_6").repeater({
            initEmpty: !1,
            defaultValues: {
                "text-input": "foo"
            },
            show: function() {
                $(this).slideDown()
            },
            hide: function(e) {
                $(this).slideUp(e)
            }
        })
    }
};
jQuery(document).ready(function() {
    FormRepeater.init()
});
