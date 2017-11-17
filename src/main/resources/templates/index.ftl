<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Sales Campaign</title>

<link href="/static/css/bootstrap.css" rel="stylesheet" />
<link href="/static/css/app.css" rel="stylesheet" />
<!-- load angularJS -->
<script
	src="http://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js"></script>
<script src="static/js/app.js"></script>
<head>
<body ng-app="CampaignManagement" ng-controller="CampaignController">

	<div class="panel-heading">
		<span class="lead">List of Campaigns</span>
	</div>
	<div class="panel-body">
		<div class="table-responsive"></div>
		<table style="width: 1000px; table-layout: fixed"
			class="table table-hover">
			<tr>
				<th style="width: 5%">Id</th>
				<th style="width: 20%">Name</th>
				<th style="width: 20%">Keyword</th>
				<th style="width: 10%">Bid</th>
				<th style="width: 10%">Funds</th>
				<th style="width: 7%">Status</th>
				<th style="width: 10%">Town</th>
				<th style="width: 8%">Radius</th>
				<th style="width: 15%"></th>
			</tr>

			<tr ng-repeat="campaign in campaigns">
				<td>{{ campaign.id }}</td>
				<td>{{ campaign.name }}</td>
				<td>{{ campaign.keyword }}</td>
				<td>{{ campaign.bidAmount }}</td>
				<td>{{ campaign.campaignFunds }}</td>
				<td>{{ campaign.status }}</td>
				<td>{{ campaign.town }}</td>
				<td>{{ campaign.radius }}</td>
				<td><button type="button" style="width: 100px"
						ng-click="editCampaign(campaign.id)"
						class="btn btn-success custom-width">Edit</button>
					<button type="button" style="width: 100px"
						ng-click="removeCampaign(id)" class="btn btn-danger custom-width">Remove</button></td>
				<!-- <td><a ng-click="editCampaign(campaign.id)" class="button">Edit</a>
					| <a ng-click="removeCampaign(id)" class="button">Remove</a></td> -->
			</tr>

		</table>
	</div>
	</div>
	<td>Account balance: {{ accountBalance }}</td>
<br></br>

	<div class="generic-container">
		<div class="panel panel-default">
			<div class="panel-heading clearfix">
				<span class="lead" id="tittle-panel">Add/Edit Campaign </span>
			</div>
			<div class="panel-body">
				<div class="formcontainer">
					<form ng-submit="submitCampaign()" name="campaignForm"
						class="form-horizontal" style="width: 600px">
						<div class="row">
							<div class="form-group col-md-12">
								<label class="col-md-2 control-lable">Name</label> <input
									type="text" ng-model="form.name" class="form-control input-sm"
									placeholder="Add your campaign name" required />
								</td>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-md-12">
								<label class="col-md-2 control-lable">Keyword</label> <input
									list="keywords" ng-model="form.keyword"
									class="form-control input-sm"
									placeholder="Add your campaign keyword" required />
								<datalist id="keywords">
									<option value="Clothes"></option>
									<option value="Instruments">
									<option value="Cars">
									<option value="Materials">
									<option value="Animals">
									<option value="Humans">
									<option value="Retail">
									<option value="Import">
									<option value="Export">
									<option value="Illegal">
								</datalist>
								</td>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-md-12">
								<label class="col-md-2 control-lable">Bid</label> <input
									type="text" ng-model="form.bidAmount"
									class="form-control input-sm"
									placeholder="Add minimal bid amount" required />
								</td>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-md-12">
								<label class="col-md-2 control-lable">Funds</label> <input
									type="text" ng-model="form.campaignFunds"
									class="form-control input-sm" placeholder="Add campaign funds"
									required />
								</td>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-md-12">
								<label class="col-md-2 control-lable">Status</label> <input
									type="checkbox" ng-model="form.status" class="checkDIV"
									required />
								</td>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-md-12">
								<label class="col-md-2 control-lable">Town</label> <select
									name="town" class="form-control" ng-model="form.town">
									<option value="Andrychow">Andrychow</option>
									<option value="Elblag">Elblag</option>
									<option value="Elk">Elk</option>
									<option value="Gdansk">Gdansk</option>
									<option value="Gdynia">Gdynia</option>
									<option value="Krakow">Krakow</option>
									<option value="Warszawa">Warszawa</option>
									<option value="Wroclaw">Wroclaw</option>
								</select>
								</td>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-md-12">
								<label class="col-md-2 control-lable">Radius</label> <input
									type="text" ng-model="form.radius"
									class="form-control input-sm" required />
								</td>
							</div>
						</div>
						<div class="row">
							<div class="buttonHolder">
								<input type="submit" value="Submit" id="btn_s"
									class="btn btn-primary btn-sm" />
							</div>
						</div>



					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>