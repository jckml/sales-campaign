package com.salesmanager.campaing.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Campaign {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;

	private String keyword; 
	
	private int bidAmount;
	
	private int campaignFunds;
	
	private boolean status; 
	
	private String town; 
	
	private int radius;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public int getBidAmount() {
		return bidAmount;
	}

	public void setBidAmount(int bidAmount) {
		this.bidAmount = bidAmount;
	}

	public int getCampaignFunds() {
		return campaignFunds;
	}

	public void setCampaignFunds(int campaignFunds) {
		this.campaignFunds = campaignFunds;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getTown() {
		return town;
	}

	public void setTown(String town) {
		this.town = town;
	}

	public int getRadius() {
		return radius;
	}

	public void setRadius(int radius) {
		this.radius = radius;
	}

	
}
