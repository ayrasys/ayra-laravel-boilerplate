<!-- BEGIN: Subheader -->
<div class="m-subheader ">
	<div class="d-flex align-items-center">
		<div class="mr-auto">
			<h3 class="m-subheader__title m-subheader__title--separator">
				Roles
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
							roles
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
					Roles List<small></small>
				</h3>
			</div>
		</div>


	</div>
	<div class="m-portlet__body">
		<!--begin: Search Form -->
		<div class="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30" >
			<div class="row align-items-center">
				<div class="col-xl-8 order-2 order-xl-1">
					<div class="form-group m-form__group row align-items-center">
						<div class="col-md-4">
							<div class="m-form__group m-form__group--inline">
								<div class="m-form__label">
									<label>Status:</label>
								</div>
								<div class="m-form__control">
									<select class="form-control m-bootstrap-select" id="m_form_status">
										<option value="">All</option>
										<option value="deactive">Deactive</option>
										<option value="active">Active</option>

									</select>
								</div>
							</div>
							<div class="d-md-none m--margin-bottom-10"></div>
						</div>
						<div class="col-md-4">
							<div class="m-form__group m-form__group--inline">
								<div class="m-form__label">
									<label class="m-label m-label--single">Type:</label>
								</div>
								<div class="m-form__control">


									<select class="form-control m-bootstrap-select" id="m_form_roles">
										<option value="">All</option>
										@foreach (\Spatie\Permission\Models\Role::all() as $role)
												<option value="{{$role->name}}">{{$role->name}}</option>
											@endforeach
									</select>
								</div>
							</div>
							<div class="d-md-none m--margin-bottom-10"></div>
						</div>
						<div class="col-md-4">
							<div class="m-input-icon m-input-icon--left">
								<input type="text" class="form-control m-input" placeholder="Search..." id="generalSearch">
								<span class="m-input-icon__icon m-input-icon__icon--left">
									<span><i class="la la-search"></i></span>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xl-4 order-1 order-xl-2 m--align-right">
					<a href="{{route('roles.create')}}" class="btn btn-primary m-btn m-btn--custom m-btn--icon m-btn m-btn--pill">
						<span>
							<i class="flaticon-add-circular-button"></i>
							<span>ADD NEW</span>
						</span>
					</a>
					<div class="m-separator m-separator--dashed d-xl-none"></div>
				</div>
			</div>
		</div>
		<!--end: Search Form -->

		<!--begin: Datatable -->
		<div class="m_datatable_roles_list" id="ajax_data"></div>
		<!--end: Datatable -->
	</div>
</div>



</div>
</div>
</div>
<!-- end:: Body -->
<!--begin::Modal-->
						<div class="modal fade" id="m_view_users" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div class="modal-dialog modal-lg" role="document">
								<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title" id="exampleModalLabel">
											Role details
										</h5>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">
												&times;
											</span>
										</button>
									</div>
									<div class="modal-body">
										<!-- row data  -->
										<div class="row">
													<div class="col-xl-8 offset-xl-2">
														<div class="m-form__section m-form__section--first">
															<div class="form-group m-form__group row">
																<label class="col-xl-3 col-lg-3 col-form-label">
																	* Name:
																</label>
																<div class="col-xl-9 col-lg-9">
																	<input type="text" name="name" id="txtUserName" disabled class="form-control m-input" placeholder="" value="Nick Stone">
																	<span class="m-form__help">

																	</span>
																</div>
															</div>

															<div class="form-group m-form__group row">
																<label class="col-xl-3 col-lg-3 col-form-label">
																	* Email:
																</label>
																<div class="col-xl-9 col-lg-9">
																	<input type="email" name="email" disabled class="form-control m-input" placeholder="" value="nick.stone@gmail.com">
																	<span class="m-form__help">

																	</span>
																</div>
															</div>

														</div>
														<div class="m-separator m-separator--dashed m-separator--lg"></div>
													</div>
												</div>

										<!-- row data  -->

									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-secondary" data-dismiss="modal">
											Close
										</button>
										<button type="button" class="btn btn-primary">
											Send message
										</button>
									</div>
								</div>
							</div>
						</div>
						<!--end::Modal-->
						<!--begin::Modal-->
												<div class="modal fade" id="m_edit_users" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
													<div class="modal-dialog modal-lg" role="document">
														<div class="modal-content">
															<div class="modal-header">
																<h5 class="modal-title" id="exampleModalLabel">
																	Edit Role Details
																</h5>
																<button type="button" class="close" data-dismiss="modal" aria-label="Close">
																	<span aria-hidden="true">
																		&times;
																	</span>
																</button>
															</div>
															<div class="modal-body">
																<!-- row data  -->
																<div class="row">
																			<div class="col-xl-8 offset-xl-2">
																				<div class="m-form__section m-form__section--first">
																					<div class="form-group m-form__group row">
																						<label class="col-xl-3 col-lg-3 col-form-label">
																							* Role's Name:
																						</label>
																						<div class="col-xl-9 col-lg-9">
																							<input type="text" name="name" id="edit_txtRoleName"  class="form-control m-input" placeholder="" value="Nick Stone">
																							<span class="m-form__help">

																							</span>
																						</div>
																					</div>


																				 <div class="m-form__group form-group">
																				 <label >Checked following permissions</label>
																				 <div class="m-checkbox-list editroleslist">

																				 </div>
																				 <span class="m-form__help"></span>
																			 </div>




																				</div>
																				<div class="m-separator m-separator--dashed m-separator--lg"></div>
																			</div>
																		</div>

																<!-- row data  -->

															</div>
															<div class="modal-footer">
																<button type="button" class="btn btn-secondary" data-dismiss="modal">
																	Close
																</button>
																<button type="button" class="btn btn-warning m-btn m-btn m-btn--icon">
																	Save Changes
																</button>
															</div>
														</div>
													</div>
												</div>
												<!--end::Modal-->
