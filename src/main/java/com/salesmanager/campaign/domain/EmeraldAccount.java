package com.salesmanager.campaign.domain;

import org.springframework.stereotype.Component;

@Component
public class EmeraldAccount {

	private double balance;

	public EmeraldAccount() {
		setBalance(15777.34);
	}
	
	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}
	
}
