package com.boe.apps.data;

import java.util.List;

import com.boe.apps.models.CustomerModel;

public interface CustomerData 
{
	public List<CustomerModel> getAllCustomers();
	public List<CustomerModel> getSDMCustomers(String sdmName);
}
