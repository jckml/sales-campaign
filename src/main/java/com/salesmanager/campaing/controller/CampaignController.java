package com.salesmanager.campaing.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.salesmanager.campaign.exceptions.ErrorResponse;
import com.salesmanager.campaign.exceptions.NoSuchCampaignException;
import com.salesmanager.campaign.exceptions.InsufficientFundsException;
import com.salesmanager.campaing.dao.CampaignRepo;
import com.salesmanager.campaing.domain.Campaign;
import com.salesmanager.campaing.domain.EmeraldAccount;

@RestController
@RequestMapping(value = "/sales/campaign")
public class CampaignController {

	private final EmeraldAccount account;
	
	private final CampaignRepo campaignRepo;
	
	@Autowired
	public CampaignController(CampaignRepo campaignRepo, EmeraldAccount account) {
		this.account = account;
		this.campaignRepo = campaignRepo;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Campaign> getAllCampaigns() {
		return campaignRepo.findAll();
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void addCampaign(@RequestBody Campaign campaign) {
		checkAndDecreaseAccountBalance(campaign);
		campaignRepo.save(campaign);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Campaign getCampaign(@PathVariable int id) {
		
		Optional<Campaign> campaign = Optional.of(campaignRepo.findOne(id));
		if(!campaign.isPresent()) {
			throw new NoSuchCampaignException(id);
		}
		return campaign.get();
	}
	
	@RequestMapping(value = "/account", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public double getBalance() {
		return account.getBalance();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public Campaign updateCampaign(@PathVariable int id, @RequestBody Campaign campaign) {
		
		Optional<Campaign> currentCamapign = Optional.of(campaignRepo.findOne(id));
		currentCamapign.ifPresent(c ->  {
			c.setName(campaign.getName());
			c.setKeyword(campaign.getKeyword());
			c.setBidAmount(campaign.getBidAmount());
			c.setCampaignFunds(campaign.getCampaignFunds());
			c.setStatus(campaign.isStatus());
			c.setTown(campaign.getTown());
			c.setRadius(campaign.getRadius());
		});
		
		if(!currentCamapign.isPresent()) {
			throw new NoSuchCampaignException(id);
		}
		increaseAccountBalance(currentCamapign.get());
		checkAndDecreaseAccountBalance(campaign);
		campaignRepo.save(currentCamapign.get());
		return currentCamapign.get();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteCampaign(@PathVariable int id) {
		Optional<Campaign> campaign = Optional.of(campaignRepo.findOne(id));
		if(!campaign.isPresent()) {
			throw new NoSuchCampaignException(id);
		}
		increaseAccountBalance(campaign.get());
		campaignRepo.delete(campaign.get());
	}
	
	@ExceptionHandler(NoSuchCampaignException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ErrorResponse handleException(NoSuchCampaignException e) {
		return new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
	}
	
	@ExceptionHandler(InsufficientFundsException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse handleException(InsufficientFundsException e) {
		return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage());
	}
	
	/* Private Methods */
	
	private void checkAndDecreaseAccountBalance(Campaign c) {
		if(c.getCampaignFunds() > account.getBalance()) {
			throw new InsufficientFundsException();
		}
		account.setBalance(account.getBalance() - c.getCampaignFunds());
	}
	
	private void increaseAccountBalance(Campaign c) {
		account.setBalance(account.getBalance() + c.getCampaignFunds());
	}
}
