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
							Users
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
					Add New User<small></small>
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
      <form class="m-form m-form--label-align-left- m-form--state-"  action="{{ route('users.store')}}" method="post">
        @csrf
               <!--begin: Form Body -->
               <div class="m-portlet__body">
                   <!--begin: Form Wizard Step 1-->

                       <div class="row">
                           <div class="col-xl-8 offset-xl-2">
                               <div class="m-form__section m-form__section--first">
                                   <div class="m-form__heading">
                                       <h3 class="m-form__heading-title">User Details</h3>
                                   </div>
                                   <div class="form-group m-form__group row">
                                       <label class="col-xl-3 col-lg-3 col-form-label">* Name:</label>
                                       <div class="col-xl-9 col-lg-9">
                                           <input type="text" name="name" class="form-control m-input" placeholder="">
                                           <span class="m-form__help">Please enter your first and last names</span>
                                       </div>
                                   </div>
                                   <div class="form-group m-form__group row">
                                       <label class="col-xl-3 col-lg-3 col-form-label">* Email:</label>
                                       <div class="col-xl-9 col-lg-9">
                                           <input type="email" name="email" class="form-control m-input" placeholder="">
                                           <span class="m-form__help">We'll never share your email with anyone else</span>
                                       </div>
                                   </div>
                                   <div class="form-group m-form__group row">
                                       <label class="col-xl-3 col-lg-3 col-form-label">* Password</label>
                                       <div class="col-xl-9 col-lg-9">
                                           <div class="input-group">
                                               <div class="input-group-prepend"><span class="input-group-text"><i class="la la-key"></i></span></div>
                                               <input type="password" name="password" class="form-control m-input" placeholder="">
                                           </div>
                                           <span class="m-form__help">Enter your password</span>
                                       </div>
                                   </div>
                                   <div class="form-group m-form__group row">
                                       <label class="col-xl-3 col-lg-3 col-form-label">* Confirm Password</label>
                                       <div class="col-xl-9 col-lg-9">
                                           <div class="input-group">
                                               <div class="input-group-prepend"><span class="input-group-text"><i class="la la-key"></i></span></div>
                                               <input type="password" name="confirm-password" class="form-control m-input" placeholder="">
                                           </div>
                                           <span class="m-form__help">Enter your confirm password</span>
                                       </div>
                                   </div>
                                   <div class="form-group m-form__group row">
                                       <label class="col-xl-3 col-lg-3 col-form-label">* Roles</label>
                                       <div class="col-xl-9 col-lg-9">
                                           <div class="input-group">
                                                 {!! Form::select('roles[]', $roles,[], array('class' => 'form-control','multiple')) !!}
                                           </div>
                                           <span class="m-form__help">Enter your confirm password</span>
                                       </div>
                                   </div>

                               </div>
                               <div class="m-separator m-separator--dashed m-separator--lg"></div>
                               <div class="form-group m-form__group m-form__group--sm row">
                                     <div class="col-xl-12">
                                         <div class="m-checkbox-inline">
                                             <label class="m-checkbox m-checkbox--solid m-checkbox--brand">
                                             <input type="checkbox" name="accept" value="1">
                                             Click here to indicate that you have read and agree to the terms presented in the Terms and Conditions agreement
                                             <span></span>
                                             </label>
                                         </div>
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
