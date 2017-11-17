package com.salesmanager.campaign.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.salesmanager.campaign.domain.Campaign;

public interface CampaignRepo extends JpaRepository<Campaign, Integer>{

}
