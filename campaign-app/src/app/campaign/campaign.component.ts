import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Campaign } from './campaign';
import { EmeraldAccount } from './emerald-account';
import { CampaignService } from './campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
  providers: [CampaignService]
})

export class CampaignComponent implements OnInit {

  campaigns: Campaign[];
  
  
  campaignForm: FormGroup;
  
  campaignId = -1;
  
  account: EmeraldAccount;
  
  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.fetchAllCampaigns();
    this.campaignForm = new FormGroup({
       name: new FormControl('', Validators.required),
       keyword: new FormControl('', Validators.required),
       bidAmount: new FormControl(0, Validators.required),
       campaignFunds: new FormControl(0, Validators.required),
       status: new FormControl(false, Validators.nullValidator),
       town: new FormControl('', Validators.nullValidator),
       radius: new FormControl(0, Validators.required)
    });
  }
  
  fetchAllCampaigns() {
    this.campaignService.fetchAllCampaigns().subscribe(data => this.campaigns = data, err => console.log(err));
  }
  
  fetchAccountBalance() {
    this.campaignService.fetchAccountBalance().subscribe(data => this.account = data, err => console.log(err));
  }
  
  submit() {
    if (this.campaignForm.valid) {
      if (this.campaignId === -1) {
         let campaign: Campaign = new Campaign(null,
           this.campaignForm.controls['name'].value,
           this.campaignForm.controls['keyword'].value,
           this.campaignForm.controls['bidAmount'].value,
           this.campaignForm.controls['campaignFunds'].value,
           this.campaignForm.controls['status'].value,
           this.campaignForm.controls['town'].value,
           this.campaignForm.controls['radius'].value);
        this.campaignService.saveCampaign(campaign).subscribe(success => {
           this.fetchAllCampaigns();
           this.fetchAccountBalance();                            
        },
        error => console.log(error));
      } else {
        let campaign: Campaign = new Campaign(this.campaignId,
           this.campaignForm.controls['name'].value,
           this.campaignForm.controls['keyword'].value,
           this.campaignForm.controls['bidAmount'].value,
           this.campaignForm.controls['campaignFunds'].value,
           this.campaignForm.controls['status'].value,
           this.campaignForm.controls['town'].value,
           this.campaignForm.controls['radius'].value);
        this.campaignService.updateCampaign(this.campaignId, campaign).subscribe(success => {
           this.fetchAllCampaigns();
           this.fetchAccountBalance();                            
        },
        error => console.log(error));
      }
      this.campaignForm.reset();
    }
  }
  
  edit(campaign: Campaign) {
    
  }
  
  remove(campaign: Campaign) {
    if (campaign) {
      this.campaignService.deleteCampaignById(campaign.id).subscribe(success => {
        this.fetchAllCampaigns();
        this.fetchAccountBalance();
        this.campaignForm.reset();
        console.log('campaign removed');
      },
      error => console.log(error));
    }
  }

}
