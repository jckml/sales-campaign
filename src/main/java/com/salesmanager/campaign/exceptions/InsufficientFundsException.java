package com.salesmanager.campaign.exceptions;

public class InsufficientFundsException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	private String message;
	
	public InsufficientFundsException() {
		message = "Insufficient funds on account, Counld not perform operation";
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
