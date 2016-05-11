package com.finance.data;

import java.util.List;

import com.finance.models.*;

/**
 * @author Ivan Hernández Ortega
 */
public interface OpportunityData 
{
	public void addOpportunity(OpportunityModel opportunity);
	public void deleteOpportunity(int opportunityId );
	public void updateOpportunity(OpportunityModel opportunity);
	public List<OpportunityModel> getAllOpportunity();
	public OpportunityModel getOpportunityById(int oportunityId);
	public List<CustomerModel> getAllCustomers();
	public List<ServiceModel> getAllServices();
}