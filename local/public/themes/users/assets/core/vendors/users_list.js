function delete_user(rowid){

   swal({
       title: "Are you sure?",
       text: "You won't be able to revert this!",
       type: "warning",
       showCancelButton: !0,
       confirmButtonText: "Yes,Delete",
       cancelButtonText: "No, Cancel!",
       reverseButtons: !1
   }).then(function(ey) {
     if(ey.value){

       $.ajax({
            url:BASE_URL+"/api/deleteUser",
            type: 'POST',
            data: {_token: CSRF_TOKEN,user_id:rowid},
            success: function (resp) {
               swal("Deleted!", "Your file has been deleted.", "success").then(function(eyz){
                 if(eyz.value){
                   window.location.href=BASE_URL;
                 }
               });

            }
        });

     }

   })

}
function edit_user(rowid){
  $.ajax({
     url:BASE_URL+"/api/getUserDetails",
     type: 'POST',
     data: {_token: CSRF_TOKEN,user_id:rowid},
     success: function (resp) {
          console.log(resp);
          $('input[name="name"]').val(resp.name);
          $('input[name="email"]').val(resp.email);
          $('input[name="roles"]').val(resp.roles);

          $('.rolelistClass').html("");
            $.each(resp.roles_list, function (key, val) {
                if(val==resp.user_role){

                  $('.rolelistClass').append('<option  value="'+val+'">'+val+'</option>');
                }else{
                    $('.rolelistClass').append('<option value="'+val+'">'+val+'</option>');
                }
            });
          $('#m_edit_users').modal('show');
     }
 });

}
function view_user(rowid){
     $.ajax({
        url:BASE_URL+"/api/getUserDetails",
        type: 'POST',
        data: {_token: CSRF_TOKEN,user_id:rowid},
        success: function (resp) {
           console.log(resp);
            $('#txtUserName').val(resp.name);
            $('#m_view_users').modal('show');
        }
    });



}


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
                field: "currently",
                title: "Current Status"
            },{
                field: "status",
                title: "Status",
                template: function(t) {
                  //  console.log(t);
                    var e = {
                        'deactive': {
                            title: "Deactive",
                            class: "m-badge--warning"
                        },
                        'active': {
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
                            title: "Admin",
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
                    var rowid=t.rowid;
                    return '\t\t\t\t\t\t<div class="dropdown ' + (a.getPageSize() - e <= 4 ? "dropup" : "") +'">\t\t\t\t\t\t\t<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown"><i class="la la-ellipsis-h"></i></a>\t\t\t\t\t\t\t<div class="dropdown-menu dropdown-menu-right">\t\t\t\t\t\t    \t<a class="dropdown-item" href="javascript:void(0)" onclick="view_user('+rowid+')"><i class="la la-edit"></i>\
                     View Details</a>\t\t\t\t\t\t\t<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\t\t\t\t\t\t \t<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\t\t\t\t\t\t  \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a href="javascript:void(0)" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details" onclick="edit_user('+rowid+')" >\t\t\t\t\t\t\t<i class="la la-edit"></i>\t\t\t\t\t\t</a>\t\t\t\t\t\t<a href="javascript:void(0)" onclick="delete_user('+rowid+')"  class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">\t\t\t\t\t\t\t<i class="la la-trash"></i>\t\t\t\t\t\t</a>\t\t\t\t\t';

                }

            }

          ]
        }), $("#m_form_status").on("change", function() {
            t.search($(this).val(), "status")
        }), $("#m_form_roles").on("change", function() {
            t.search($(this).val(), "role")
        }), $("#m_form_status, #m_form_roles").selectpicker()


    }
};
jQuery(document).ready(function() {
    DatatableUsersList.init();
});
