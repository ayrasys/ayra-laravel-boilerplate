var DatatableRemoteAjaxDemoLang = {

    init: function() {
        var t;
        var baseURL= $('meta[name="csrf-base"]').attr('content');
        var edit_url=baseURL+"/editLang/";


        var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
        t = $(".m_datatable_languageList").mDatatable({
            data: {
                type: "remote",
                source: {
                    read: {
                        url: baseURL+"/api/getLanglist",
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
                field: "RecordID",
                title: "#",
                sortable: !1,
                width: 40,
                selector: !1,
                textAlign: "center"
            },
            {
                field: "group",
                title: "Group"
            },
            {
                field: "key",
                title: "Key"
            },
            {
                field: "text_string",
                title: "Language"
            }, {
                field: "Actions",
                width: 110,
                title: "Actions",
                sortable: !1,
                overflow: "visible",
                template: function(t, e, a) {
                    return '\t\t\t\t\t\t<div class="dropdown ' + (a.getPageSize() - e <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t \t\t\t\t\t\t    \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a href="'+edit_url+t.lang_id+'" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\t\t\t\t\t\t\t<i class="la la-edit"></i>\t\t\t\t\t\t</a>\t\t\t\t\t\t<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">\t\t\t\t\t\t\t<i class="la la-trash"></i>\t\t\t\t\t\t</a>\t\t\t\t\t'

                }
            }]
        }), $("#m_form_status").on("change", function() {
            t.search($(this).val(), "Status")
        }), $("#m_form_type").on("change", function() {
            t.search($(this).val(), "Type")
        }), $("#m_form_status, #m_form_type").selectpicker()
    }
};
jQuery(document).ready(function() {
    DatatableRemoteAjaxDemoLang.init()
});
