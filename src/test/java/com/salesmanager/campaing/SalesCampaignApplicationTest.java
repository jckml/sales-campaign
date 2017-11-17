package com.salesmanager.campaing;

import static org.hamcrest.CoreMatchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.salesmanager.campaign.SalesCampaignApplication;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes=SalesCampaignApplication.class)
@WebAppConfiguration
public class SalesCampaignApplicationTest {

	@Autowired
	WebApplicationContext webctx;
	
	MockMvc mockMvc;
	
	@Before
	public void setUp() throws Exception {
		mockMvc = MockMvcBuilders.webAppContextSetup(webctx).build();
	}
	
	@Test
	public void contextLoads() throws Exception{
		mockMvc.perform(get("/sales/campaign")).andExpect(status().is(200));
		
	}
	
	
}
