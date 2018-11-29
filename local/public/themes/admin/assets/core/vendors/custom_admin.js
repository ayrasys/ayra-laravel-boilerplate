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

//custom code for basic action
function Page(){

    var self= this;
    var timeout = 0;
    var status = 0;
    var running = 0;
    var el;
    var w = $(window);
    var clock = $('.countDown span');
    var SPINTAX_PATTERN = /\{[^"\r\n\}]*\}/;
    var ItemPost = [];
    this.init= function(){
        self.FacebookAccount();


        //Tooltip
        $('[data-toggle="tooltip"]').tooltip({
            container: 'body'
        });

        //Popover
        $('[data-toggle="popover"]').popover();





        if($('.js-dataTable').length > 0 || $('.js-dataTableSchedule').length > 0 || $('.js-dataTableScheduleAjax').length > 0){
            _dataTable = $('.js-dataTable').DataTable({
                paging: false,
                columnDefs: [ {
                    targets: 0,
                    orderable: false
                }],
                aaSorting: [],
                language: {
                    search: 'Search ',
                },
                bPaginate: false,
                bLengthChange: false,
                bFilter: true,
                bInfo: false,
                bAutoWidth: false,
                responsive: true,
                emptyTable: Lang['emptyTable']
            });

            $('.filter_account,.filter_profile,.filter_group,.filter_page,.filter_friend,.filter_likedpage').change( function() {
                _dataTable.draw();
            });

            _dataTableSchedule = $('.js-dataTableSchedule').DataTable({
                paging: true,
                pageLength: 50,
                lengthMenu: [[10, 25, 50, 100, 200, 500, 1000, -1], [10, 25, 50, 100, 200, 500, 1000, "All"]],
                columnDefs: [ {
                    targets: 0,
                    orderable: false
                }],
                aaSorting: [],
                language: {
                    search: 'Search ',
                },
                bFilter: true,
                bInfo: true,
                bAutoWidth: false,
                responsive: true,
                pagingType: "full_numbers",
                emptyTable: Lang['emptyTable']
            });

            $('.filter_account').change( function() {
                _dataTableSchedule.draw();
            });

            _dataTableScheduleAjax = $('.js-dataTableScheduleAjax').DataTable({
                processing: true,
                serverSide: true,
                columnDefs: [ {
                    targets: 0,
                    orderable: false
                }],
                ajax: $.fn.dataTable.pipeline( {
                    url: CURRENT_URL+'/ajax_page',
                    pages: 1 // number of pages to cache
                }),
                paging: true,
                pageLength: 50,
                lengthMenu: [[10, 25, 50, 100, 200, 500], [10, 25, 50, 100, 200, 500]],

                aaSorting: [],
                language: {
                    search: 'Search ',
                },
                bFilter: true,
                bInfo: true,
                bAutoWidth: false,
                responsive: true,
                pagingType: "full_numbers",
                emptyTable: Lang['emptyTable']
            });

            $('.filter_account').change( function() {
                _dataTableScheduleAjax.draw();
            });

            //CUSTOM FILTER
            $.fn.dataTable.ext.search.push(
                function( settings, data, dataIndex ) {
                    var el_profile = $('.filter_profile');
                    var el_group   = $('.filter_group');
                    var el_page    = $('.filter_page');
                    var el_friend  = $('.filter_friend');
                    var el_liked   = $('.filter_likedpage');
                    var fbuser     = $('.filter_account').val();
                    var profile    = el_profile.is(':checked')?"profile":"";
                    var group      = el_group.is(':checked')?"group":"";
                    var page       = el_page.is(':checked')?"page":"";
                    var liked      = el_liked.is(':checked')?"liked":"";
                    var friend     = el_friend.is(':checked')?"friend":"";
                    var _account   = data[1];
                    var _type      = data[3];
                    if(fbuser != "" && fbuser != undefined){
                        if(el_profile.length > 0 || el_friend.length > 0){
                            if ((fbuser == _account) && (profile == _type || group == _type || page == _type || friend == _type || liked == _type)){
                                return true;
                            }
                        }else{
                            if (fbuser == _account){
                                return true;
                            }
                        }
                        return false;
                    }else{
                        if(el_profile.length > 0 || el_friend.length > 0){
                            if (profile == _type || group == _type || page == _type || friend == _type || liked == _type){
                                return true;
                            }
                            return false;
                        }
                        return true;
                    }

                }
            );
        }

        $(document).on('click', '.checkAll', function(){
            _that = $(this);
            if(_that.is(":checked")){
                $('.checkItem').prop('checked', true);
            }else{
                $('.checkItem').prop('checked', false);
            }
        });

        $(document).on('click', '.open-schedule', function(){
            _that = $(this);
            _box_schedule = $('.box-post-schedule');
            if(_that.hasClass('active')){
                _box_schedule.hide();
                _that.removeClass('active');
            }else{
                _box_schedule.show();
                _that.addClass('active');
            }
        });

        $(document).on('click', '.btnActionModule', function(){
            _that     = $(this);
            _type     = _that.data("action");
            _category = _that.data("categoty");
            _form     = _that.closest("form");
            _action   = _form.attr("action");
            _redirect = _form.data("redirect");
            _data     = _form.serialize();
            _data     = _data + '&' + $.param({token:token, action: _type, category: _category});
            _confirm = _that.data("confirm");
            _valid   = $('.checkItem:checkbox:checked').length;
            if(_valid > 0 || _type == "delete_all"){
                if(_type == "delete" || _type == "delete_all"){
                    self.showConfirmMessage(_confirm, function(){
                        $.post(_action, _data, function(result){
                            setTimeout(function(){
                                window.location.reload();
                            },2000);
                            self.showSuccessAutoClose(Lang["deleted"], "success", 2000);
                        },'json');
                    });
                }else{
                    $.post(_action, _data, function(result){
                        window.location.reload();
                    },'json');
                }
            }else{
                self.showSuccessAutoClose(Lang["selectoneitem"], "info", 2000);
            }

            return false;
        });

        $(document).on('click', '.btnActionModuleItem', function(){
            _that    = $(this);
            _tr  = _that.parents("tr");
            if(_tr.hasClass("child")){
                _tr = _tr.prev();
            }
            _action  = _tr.data("action");
            _type    = _that.data("action");
            _confirm = _that.data("confirm");
            _id      = _tr.data("id");

            if(_type == "delete"){
                _data    = $.param({token:token, action: _type, id: _id});
                self.showConfirmMessage(_confirm, function(){
                    $.post(_action, _data, function(result){
                        setTimeout(function(){
                            window.location.reload();
                        },2000);
                        self.showSuccessAutoClose(Lang["deleted"], "success", 2000);
                    },'json');
                });
            }else{
                _type  = (_that.is(":checked"))?"active":"disable";
                _data    = $.param({token:token, action: _type, id: _id});
                $.post(_action, _data, function(result){
                    //window.location.reload();
                },'json');
            }
        });

        $(document).on('click', '.btnFBGetToken', function(){
            _that    = $(this);
            _action  = _that.data("action");
            fbapp    = $(".fbapp").val();
            _data    = $.param({token:token, fbapp: fbapp});
            $(".page-loader-action").fadeIn();
            $.post(_action, _data, function(result){
                if(result['st'] == "success"){
                    window.location.assign(result['url']);
                }else{
                    self.showNotification(result['label'], result['txt'], 'bottom', 'center', 'animated bounceIn', 'animated bounceOut');
                }
                $(".page-loader-action").fadeOut();
            },'json');
        });

        $(document).on("click", ".btnFBGetToken2", function(){
            _that     = $(this);
            _form     = _that.closest("form");
            _action   = _form.data("action-token");
            _redirect = _form.data("redirect");
            _data     = _form.serialize();
            _data     = _data + '&' + $.param({token:token});
            $(".page-loader-action").fadeIn();
            if(!_form.hasClass('disable')){
                _form.addClass('disable');
                $.post(_action, _data, function(result){
                    _form.removeClass('disable');
                    $(".page-loader-action").fadeOut();
                    if(result['st'] == "success"){
                        //window.open(,'winname','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=700,height=600');
                        $(".open_iframe").html('<iframe src="'+result['url']+'"></iframe>');
                    }else{
                        self.showNotification(result['label'], result['txt'], 'bottom', 'center', 'animated bounceIn', 'animated bounceOut');
                    }
                },'json');
            }

            return false;
        });

        $(document).on('click', '.btnUpdateGroups', function(){
            _that    = $(this);
            _tr      = _that.parents("tr");
            if(_tr.hasClass("child")){
                _tr = _tr.prev();
            }
            _action  = _tr.data("action-groups");
            _type    = _that.data("type");
            _id      = _tr.data("id");
            _data    = $.param({token:token, type: _type, id: _id});
            $(".page-loader-action").fadeIn();
            $.post(_action, _data, function(result){
                self.showNotification(result['label'], result['txt'], 'bottom', 'center', 'animated bounceIn', 'animated bounceOut');
                $(".page-loader-action").fadeOut();
            },'json');
        });

        $(document).on('click', '.btnActionUpdate', function(){

            _that    = $(this);
            _form     = _that.closest("form");
            _action   = _form.attr("action");
            _redirect = _form.data("redirect");
            _data     = _form.serialize();
            _data     = _data + '&' + $.param({_token:CSRF_TOKEN});
            $(".page-loader-action").fadeIn();
            if(!_form.hasClass('disable')){
                _form.addClass('disable');
                $.post(_action, _data, function(result){
                    self.showNotification(result['label'], result['txt'], 'bottom', 'center', 'animated bounceIn', 'animated bounceOut');
                    _form.removeClass('disable');
                    $(".page-loader-action").fadeOut();
                    if(result['st'] == "success"){

                    }
                      
                },'json');
            }
            return false;
        });
    };

    this.Editor = function(){
        $('.dialog-upload').click(function() {
            var _that = $(this);
            var fm = $('<div/>').dialogelfinder({
                url : BASE+'assets/plugins/elfinder/php/connector.php',
                lang : 'en',
                width : ($(window).width() > 840)?840:$(window).width() - 30,
                resizable: false,
                destroyOnClose : true,
                getFileCallback : function(files, fm) {
                    _that.parents(".input-group").find("input").val(files.url);
                    switch(_type){
                        case "link":
                            $(".preview-box-2 .preview-box-image").css('background-image', 'url(' + self.spintax(files.url) + ')')
                            break;

                        case "image":
                            $(".preview-box-3 .preview-box-image").css('background-image', 'url(' + self.spintax(files.url) + ')')
                            break;
                    }
                },
                commandsOptions : {
                    getfile : {
                        oncomplete : 'close',
                        folders : true
                    }
                }
            }).dialogelfinder('instance');
        });

        $('.dialog-uploads').click(function() {
            var _that = $(this);
            var fm = $('<div/>').dialogelfinder({
                url : BASE+'assets/plugins/elfinder/php/connector.php',
                lang : 'en',
                width : ($(window).width() > 840)?840:$(window).width() - 30,
                resizable: false,
                destroyOnClose : true,
                getFileCallback : function(files, fm) {
                    $.each(files, function(index,value){
                        html  = '<li style="background-image: url('+value.url+')">';
                        html += '<div class="icon-remove remove-files fa fa-times"></div>';
                        html += '<input type="hidden" class="form-control" name="images_url[]" value="'+value.url+'">';
                        html += '</li>';
                        _that.parents(".tab-pane").find(".list-images").append(html);
                        history.pushState("", document.title, window.location.pathname);
                    });
                },
                commandsOptions : {
                    getfile : {
                        oncomplete : 'close',
                        folders : false,
                        multiple: true
                    }
                }
            }).dialogelfinder('instance');
        });

    }

    this.FacebookAccount = function(){
        $(".btnAllowPermission").click(function(){
            _that = $(this);
            _api  = _that.data("appid");
            _redirect = _that.parents(".item").data("redirect");
            _url  = _api;
            if(_redirect != undefined){
                _url = _redirect;
            }
            popwin = window.open(_url, "main_browser", "height=700,width=800");
        });

        $(document).on("click", ".btnFBAccountUpdate", function(){
            _that     = $(this);
            _form     = _that.closest("form");
            _action   = _form.attr("action");
            _redirect = _form.data("redirect");
            _data     = _form.serialize();
            _access_token = _form.find("textarea.access_token").val();
            _hash     = _access_token.replace(/^.*?#/, '');
            if(_hash != "" && _hash.indexOf("&") != -1){
                _pairs  = _hash.split('&');
                _values = _pairs[0].split('=');
                _access_token = _values[1];
            }
            _data     = _data + '&' + $.param({token:token, access_token: _access_token});
            $(".page-loader-action").fadeIn();
            if(!_form.hasClass('disable')){
                _form.addClass('disable');
                $.post(_action, _data, function(result){
                    self.showNotification(result['label'], result['txt'], 'bottom', 'center', 'animated bounceIn', 'animated bounceOut');
                    _form.removeClass('disable');
                    $(".page-loader-action").fadeOut();
                    if(result['st'] == "success")
                        window.location.assign(_redirect);
                },'json');
            }

            return false;
        });
    }









    this.showNotification = function(colorName, text, placementFrom, placementAlign, animateEnter, animateExit) {
        if (colorName === null || colorName === '') { colorName = 'bg-black'; }
        if (text === null || text === '') { text = 'Turning standard Bootstrap alerts'; }
        if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
        if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
        var allowDismiss = true;
        $.notify({
            message: text
        },
            {
                type: colorName,
                allow_dismiss: allowDismiss,
                newest_on_top: true,
                timer: 1000,
                placement: {
                    from: placementFrom,
                    align: placementAlign
                },
                animate: {
                    enter: animateEnter,
                    exit: animateExit
                },
                template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">x</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
            });
    };




    this.cutText = function(text, number){
        if(text.length > number){
            return text.substring(0, number)+"...";
        }else{
            return text;
        }
    }

    this.spintax = function (spun) {
        var match;
        while (match = spun.match(SPINTAX_PATTERN)) {
            match = match[0];
            var candidates = match.substring(1, match.length - 1).split("|");
            spun = spun.replace(match, candidates[Math.floor(Math.random() * candidates.length)])
        }
        return spun;
    }

    this.showConfirmMessage = function($message, $function) {
        swal({
            title: $message,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: Lang["yes"],
            closeOnConfirm: false
        }, $function);
    }

    this.showSuccessAutoClose = function($message, $label, $timeout) {
        swal({
            title: $message,
            type: $label,
            timer: $timeout,
            closeOnConfirm: false,
            showConfirmButton: false
        });
    }
}

Page= new Page();
$(function(){
    Page.init();
});
