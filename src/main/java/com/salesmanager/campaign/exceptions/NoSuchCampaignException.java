package com.salesmanager.campaign.exceptions;

public class NoSuchCampaignException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private int id;
	
	private String message;
	
	public NoSuchCampaignException(int id) {
		this.id = id;
		message = "Cannot find campaign with id: " + id;
	}

	public int getId() {
		return id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
