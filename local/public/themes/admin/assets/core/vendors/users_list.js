var DatatableUsersList = {
    init: function() {
        var t;



        t = $(".m_datatable_users_list").mDatatable({
            data: {
                type: "remote",
                source: {
                    read: {
                        url: BASE_URL+"/api/getUsersList",
                        map: function(t) {
                            var e = t;
                            return void 0 !== t.data && (e = t.data), e
                        }
                    }
                },
                pageSize: 10,
                serverPaging: !0,
                serverFiltering: !0,
                serverSorting: !0
            },
            layout: {
                scroll: !1,
                footer: !1
            },
            sortable: !0,
            pagination: !0,
            toolbar: {
                items: {
                    pagination: {
                        pageSizeSelect: [10, 20, 30, 50, 100]
                    }
                }
            },
            search: {
                input: $("#generalSearch")
            },

            columns: [{
                field: "id",
                title: "#",
                sortable: !1,
                width: 40,
                selector: !1,
                textAlign: "center"
            },   {
                field: "name",
                title: "Name"
            },{
                field: "status",
                title: "Status",
                template: function(t) {
                    var e = {
                        0: {
                            title: "Deactive",
                            class: "m-badge--warning"
                        },
                        1: {
                            title: "Active",
                            class: "m-badge--success"
                        }

                    };
                    return '<span class="m-badge ' + e[t.status].class + ' m-badge--wide">' + e[t.status].title + "</span>"
                }

            },{
                field: "role",
                title: "Role",
                template: function(t) {
                    var e = {
                        'Admin': {
                            title: "Adminstrator",
                            class: "m-badge--info"
                        },
                        'User': {
                            title: "User",
                            class: "m-badge--brand"
                        }

                    };
                    return '<span class="m-badge ' + e[t.role].class + ' m-badge--wide">' + e[t.role].title + "</span>"
                }


            },  {
                field: "Actions",
                width: 110,
                title: "Actions",
                sortable: !1,
                overflow: "visible",
                template: function(t, e, a) {
                //  console.log(t);

                  $('.ajrows').click(function(){
                      var id=$(this).attr('id');
                      $('input[name="product_id"]').val(id);
                      $('#m_modal_1').modal('show');
                  });
                  // ajrowproductview
                  $('.ajrowproductview').click(function(){
                      var id=$(this).attr('id');
                      var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
                      var base_urll=$('meta[name="csrf-base"]').attr('content');
                       $.ajax({
                            url:base_urll+"/api/getMasterProductListbyID",
                            type: 'POST',
                            data: {_token: CSRF_TOKEN,product_id:id},
                            success: function (resp) {

                              $('.proinfo').html("Information of "+resp.name);
                              $('#m-p-name').html(resp.name);
                              $('#np_product_title').html(resp.name);
                              $('#np_product_title').html(resp.name);
                            }
                        });
                      $('#np_product_title').html(id);
                      $('#m_modal_productView').modal('show');
                  });

                    return '\t\t\t\t\t\t<div class="dropdown ' + (a.getPageSize() - e <= 4 ? "dropup" : "") +'">\t\t\t\t\t\t\t<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">                                <i class="la la-ellipsis-h"></i>                            </a>\t\t\t\t\t\t  \t<div class="dropdown-menu dropdown-menu-right">\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\t\t\t\t\t\t  \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\t\t\t\t\t\t\t<i class="la la-edit"></i>\t\t\t\t\t\t</a>\t\t\t\t\t\t<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">\t\t\t\t\t\t\t<i class="la la-trash"></i>\t\t\t\t\t\t</a>\t\t\t\t\t'
                }
            }]
        }), $("#m_form_status").on("change", function() {
            t.search($(this).val(), "status")
        }), $("#m_form_type").on("change", function() {
            t.search($(this).val(), "Type")
        }), $("#m_form_status, #m_form_type").selectpicker()

    }
};
jQuery(document).ready(function() {
    DatatableUsersList.init();
});

$(document).ready(function() {
         // alert('test');
         //
         //
$('.backMe').click(function(){
  window.history.back();
});


$.key('ctrl+k', function() {
    window.history.back();
});
  $.key('ctrl+l', function() {

      swal({
          title: "Are you sure want to logout?",
          type: "warning",
          showCancelButton: !0,
          confirmButtonText: "Yes, Log me out!",
          cancelButtonText: "No, cancel!",
          reverseButtons: !0
      }).then(function(ey) {
        if(ey.value){

          $.ajax({
               url:BASE_URL+"/logout",
               type: 'POST',
               data: {_token: CSRF_TOKEN},
               success: function (resp) {
                  window.location.href=BASE_URL;
               }
           });

        }

      })

});







  })

  // setTimeout(function(){
  //    window.location.reload(1);
  // }, 10000);

$.key('alt+p', function() {
    alert('esc');
});

$.key('ctrl+c', function() {
    alert('ctrl+c');
});

$(document).key('ctrl+shift+a', function() {

  window.location.href=BASE_URL;
});
