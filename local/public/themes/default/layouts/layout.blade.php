<!DOCTYPE html>
<html lang="en">

    <head>
        {!! meta_init() !!}
        <meta name="keywords" content="@get('keywords')">
        <meta name="description" content="@get('description')">
        <meta name="author" content="@get('author')">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="csrf-base" content="{{ URL::to('/') }}">
        <!--begin::Web font -->
    		<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
    		<script>
              WebFont.load({
                google: {"families":["Poppins:300,400,500,600,700","Roboto:300,400,500,600,700"]},
                active: function() {
                    sessionStorage.fonts = true;
                }
              });
    		</script>
        <!--end::Web font -->
        <link media="all" type="text/css" rel="stylesheet" href="{{ asset('local/public/themes/default/assets/core/vendors/custom/fullcalendar/fullcalendar.bundle.css') }}">
        <link media="all" type="text/css" rel="stylesheet" href="{{ asset('local/public/themes/default/assets/core/vendors/base/vendors.bundle.css') }}">
        <link media="all" type="text/css" rel="stylesheet" href="{{ asset('local/public/themes/default/assets/core/demo/default/base/style.bundle.css') }}">
        <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">

        <title>@get('title')</title>

        <!-- @styles() -->

    </head>

    <body  class="m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default"  >

        @partial('header')
        @partial('left_sidebar')
        @content()
        @partial('footer')
        @partial('right_sidebar')

        <!-- @scripts() -->
        <!-- <script src="{{ asset('local/public/themes/admin/assets/core/vendors/langlist_datagrid.js') }}"></script> -->


        <script src="{{ asset('local/public/themes/default/assets/core/vendors/base/vendors.bundle.js') }}"></script>

        <script src="{{ asset('local/public/themes/default/assets/core/demo/default/base/scripts.bundle.js') }}"></script>
        <script src="{{ asset('local/public/themes/default/assets/core/vendors/hotkey.js') }}"></script>
        <script src="{{ asset('local/public/themes/default/assets/core/vendors/custom_admin.js') }}"></script>
        <script src="{{ asset('local/public/themes/default/assets/core/vendors/custom/fullcalendar/fullcalendar.bundle.js') }}"></script>
        <script src="{{ asset('local/public/themes/default/assets/core/app/js/dashboard.js') }}"></script>
        <script src="{{ asset('local/public/themes/default/assets/core/vendors/users_list.js') }}"></script>

        <script type="text/javascript">
        BASE_URL=$('meta[name="csrf-base"]').attr('content');
        CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
        </script>

    </body>

</html>
