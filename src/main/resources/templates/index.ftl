<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Sales Campaign</title>

<link href="/static/css/bootstrap.css" rel="stylesheet"/>

<!-- load angularJS -->
<script
	src="http://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js"></script>
<script src="static/js/app.js"></script>
<style>
.button {
	cursor: pointer;
	color: blue;
}

td, th {
	border: 1px solid gray;
	width: 25%;
	text-align: left;
}

table {
	width: 580px;
}
</style>
<head>
<body ng-app="CampaignManagement" ng-controller="CampaignController">
	<h1>List of Campaigns</h1>

	<table>
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Keyword</th>
			<th>Bid</th>
			<th>Funds</th>
			<th>Status</th>
			<th>Town</th>
			<th>Radius</th>
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
			<td><a ng-click="editCampaign(campaign.id)" class="button">Edit</a>
				| <a ng-click="removeCampaign(id)" class="button">Remove</a></td>
		</tr>

	</table>
	<td>Account balance: {{ accountBalance }}</td>
	<h2>Add/Edit Campaign</h2>

	<form ng-submit="submitCampaign()" name="campaignForm">
		<table>
			<tr>
				<td>Name</td>
				<td><input type="text" ng-model="form.name" size="60" required/></td>
			</tr>

			<tr>
				<td>Keyword</td>
				<td><input list="keywords" ng-model="form.keyword" size="60" required/>
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
					</datalist></td>
				</td>
			</tr>
			<tr>
				<td>Bid</td>
				<td><input type="text" ng-model="form.bidAmount" size="60" required/></td>
			</tr>
			<tr>
				<td>Campaign Fund</td>
				<td><input type="text" ng-model="form.campaignFunds" size="60" required/></td>
			</tr>
			<tr>
				<td>Status(on/off)</td>
				<td><input type="checkbox" ng-model="form.status" size="60" /></td>
			</tr>
			<tr>
				<td>Town</td>
				<td><select name="town" ng-model="form.town">
						<option value="Andrychow">Andrychow</option>
						<option value="Elblag">Elblag</option>
						<option value="Elk">Elk</option>
						<option value="Gdansk">Gdansk</option>
						<option value="Gdynia">Gdynia</option>
						<option value="Krakow">Krakow</option>
						<option value="Warszawa">Warszawa</option>
						<option value="Wroclaw">Wroclaw</option>
				</select>
			</tr>
			<tr>
				<td>Radius</td>
				<td><input type="text" ng-model="form.radius" size="60"
					placeholder="km" required/></td>
			</tr>
			<tr>
				<td colspan="2"><input type="submit" value="Submit" /></td>
			</tr>

		</table>
	</form>
</body>
</html>