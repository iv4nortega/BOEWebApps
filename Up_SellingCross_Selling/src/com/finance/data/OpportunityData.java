package com.finance.data;

import java.sql.SQLException;
import java.util.List;

import com.finance.models.*;

/**
 * @author Ivan Hernández Ortega
 */
public interface OpportunityData 
{
	public void addOpportunity(OpportunityModel opportunity)throws SQLException;
	public void addComments(CommentsModel comments) throws SQLException;
	public void deleteOpportunity(int opportunityId ) throws SQLException;
	public void deleteComment(int commentId ) throws SQLException;
	public void updateOpportunity(OpportunityModel opportunity) throws SQLException;
	public List<CommentsModel> getComments(int laoId) throws SQLException;
	public List<OpportunityModel> getAllOpportunity() throws SQLException;
	public OpportunityModel getOpportunityById(int oportunityId) throws SQLException;
	public List<CustomerModel> getAllCustomers() throws SQLException;
	public List<ServiceModel> getAllServices() throws SQLException;
}