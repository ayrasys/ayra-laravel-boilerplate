var DatatableRemoteAjaxproductMasterList = {
    init: function() {
        var t;
        base_url=$('meta[name="csrf-base"]').attr('content');

        base_url_img="local/public/upload/";

        t = $(".m_datatable_productmasterlist").mDatatable({
            data: {
                type: "remote",
                source: {
                    read: {
                        url: base_url+"/api/getMasterProductList",
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
            },  {
                field: "logo",
                title: "Photo",
                attr: {
                    nowrap: "nowrap"
                },
                width: 150,
                template: function(t) {

                    if(t.logo==""){
                      //  return '<img class="m--img-rounded m--marginless ajrows" alt="photo" style="width:60px; height:60px;" src='+t.logo+'>'
                          return '<a href="javascript:void(0)" id="'+t.id+'"  title="Add Images" class="btn btn-brand m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air ajrows">\
                  									<i class="flaticon-plus"></i>\
                  								</a>'
                    }else{
                        logo_img=base_url_img+t.logo;
                        return '<div class="m-card-user m-card-user--sm">\
                          <div class="m-card-user__pic">\
                              <img src="'+logo_img+'" id="'+t.id+'" class="m--img-rounded m--marginless " alt="'+t.name+'">\
                          </div>\
                          <div class="m-card-user__details">\
                              <span class="m-card-user__name">'+t.name+'</span>\
                              <a href="javascript:void(0)" id="'+t.id+'" class="m-card-user__email m-link ajrowproductview">'+t.product_details+'</a>\
                              <a style="color:rgb(88, 103, 221)" href="javascript:void(0)" id="'+t.id+'" class="m-card-user__email m-link ajrows">Change</a>\
                          </div>\
                      </div>'
                    }

                }
            }, {
                field: "name",
                title: "Name"
            },{
                field: "status",
                title: "Status",
                template: function(t) {
                    var e = {
                        0: {
                            title: "Pending",
                            class: "m-badge--brand"
                        },
                        1: {
                            title: "Active",
                            class: "m-badge--brand"
                        }

                    };
                    return '<span class="m-badge ' + e[t.status].class + ' m-badge--wide">' + e[t.status].title + "</span>"
                }
            },{
                field: "mf_name",
                title: "Manufacture By",
                template: function(t) {
                  if(t.mf_name==""){
                      return 'N/A'
                  }else{
                      return '<a href="'+t.mf_id+'">'+t.mf_name+'</a>'
                  }
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
    DatatableRemoteAjaxproductMasterList.init();
});

$(document).ready(function() {
    var interval = setInterval(function() {
        var momentNow = moment();
        $('.np_time_date').html(momentNow.format('DD MMM YYYY') + ' <span class="m-badge m-badge--primary m-badge--wide">'+momentNow.format('dddd').substring(0,3).toUpperCase()+'</span>'+momentNow.format(' hh:mm:ss A') );
        $('#time-part').html(momentNow.format('A hh:mm:ss'));
    }, 100);
  //slug for product
  $('#product_name').keyup(function(){
    $('#product_slug').css('background','#F1f1f1',).css('border-color','#f1b10e');
    var product_name=$(this).val();

    str = product_name.replace(/ /g, '-');
      var base_urll=$('meta[name="csrf-base"]').attr('content');
    $('#product_slug').val(base_urll+"/np/"+str);
  });


      // alert('test');
      $(".aj_slug_edit").click(function(event){
       event.preventDefault();
         $('#product_slug').css('background','',).css('border-color','');
       $('#product_slug').removeAttr("disabled");
     });
     $( "#product_id" ).focusout(function() {
          // $('#product_slug').css('background','#F1f1f1',).css('border-color','#f1b10e');
          alert(534534);
      })




  $.key('ctrl+l', function() {
      var base_urll=$('meta[name="csrf-base"]').attr('content');
      var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
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
               url:base_urll+"/logout",
               type: 'POST',
               data: {_token: CSRF_TOKEN},
               success: function (resp) {
                  window.location.href=base_urll;
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
    var base_urll=$('meta[name="csrf-base"]').attr('content');
  window.location.href=base_urll;
});
