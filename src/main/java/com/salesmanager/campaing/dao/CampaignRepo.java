package com.salesmanager.campaing.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.salesmanager.campaing.domain.Campaign;

public interface CampaignRepo extends JpaRepository<Campaign, Integer>{

}
