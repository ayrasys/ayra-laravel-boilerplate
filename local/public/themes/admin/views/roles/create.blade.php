<!-- BEGIN: Subheader -->
<div class="m-subheader ">
	<div class="d-flex align-items-center">
		<div class="mr-auto">
			<h3 class="m-subheader__title m-subheader__title--separator">
				ADD NEW
			</h3>
			<ul class="m-subheader__breadcrumbs m-nav m-nav--inline">
				<li class="m-nav__item m-nav__item--home">
					<a href="#" class="m-nav__link m-nav__link--icon">
						<i class="m-nav__link-icon la la-home"></i>
					</a>
				</li>
				<li class="m-nav__separator">
					-
				</li>
				<li class="m-nav__item">
					<a href="" class="m-nav__link">
						<span class="m-nav__link-text">
							Roles
						</span>
					</a>
				</li>

			</ul>
		</div>

	</div>
</div>
<!-- END: Subheader -->
<div class="m-content">

<div class="m-portlet m-portlet--mobile" style="border-radius:10px 10px 0 0">
	<div class="m-portlet__head">
		<div class="m-portlet__head-caption">
			<div class="m-portlet__head-title">
				<h3 class="m-portlet__head-text">
					Add New Role<small></small>
				</h3>
			</div>
		</div>


	</div>
	<div class="m-portlet__body">
    @if (count($errors) > 0)
      <div class="alert alert-danger">
        <strong>Whoops!</strong> There were some problems with your input.<br><br>
        <ul>
           @foreach ($errors->all() as $error)
             <li>{{ $error }}</li>
           @endforeach
        </ul>
      </div>
    @endif
		  <!-- form to save data  -->
      <form class="m-form m-form--label-align-left- m-form--state-"  action="{{ route('roles.store')}}" method="post">
        @csrf
               <!--begin: Form Body -->
               <div class="m-portlet__body">
                   <!--begin: Form Wizard Step 1-->

                       <div class="row">
                           <div class="col-xl-8 offset-xl-2">
                               <div class="m-form__section m-form__section--first">
                                   <div class="m-form__heading">
                                       <h3 class="m-form__heading-title">Role Details</h3>
                                   </div>
                                   <div class="form-group m-form__group row">
                                       <label class="col-xl-3 col-lg-3 col-form-label">* Role's Name:</label>
                                       <div class="col-xl-9 col-lg-9">

																					   {!! Form::text('name', null, array('placeholder' => 'Name','class' => 'form-control m-input')) !!}

                                           <span class="m-form__help">Please enter role's name</span>
                                       </div>
                                   </div>
										 <div class="m-form__group form-group">
 										<label >Checked following permissions</label>
 										<div class="m-checkbox-list">
											@foreach($permission as $value)
											<label class="m-checkbox m-checkbox--solid m-checkbox--success">
														{{ Form::checkbox('permission[]', $value->id, false, array('class' => '')) }}
										 				{{ ucwords($value->name) }}
											<span></span>
											</label>
					            @endforeach
 										</div>
 										<span class="m-form__help">please checked permissions as per roles</span>
 									</div>





                               </div>


                                  <div class="m-separator m-separator--dashed m-separator--lg"></div>
                                 <div class="row">
										<div class="col-lg-6 m--align-left">
											<button type="button" class="btn btn-primary m-btn m-btn m-btn--icon backMe">
											<span>
											<i class="la la-arrow-left"></i>
											<span>Back</span>

											</span>
                    </button>
										</div>
										<div class="col-lg-6 m--align-right">

											<button type ="submit" class="btn btn-warning m-btn m-btn m-btn--icon">
											<span>
											<span>Save &amp; Continue</span>
											<i class="la la-arrow-right"></i>
											</span>
                    </button>
										</div>
									</div>

                           </div>
                       </div>

                 </div>
               </div>


		  <!-- form to save data  -->


</div>



</div>
</div>
</div>
<!-- end:: Body -->
