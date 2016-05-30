package com.finance.models;

public class CustomerModel 
{
	private int idCustomer;
	private String customerName;
	
	/*ID del cliente*/
	public int getCustomerId() {
		return idCustomer;
	}
	public void setCustomerId(int customerId) {
		this.idCustomer = customerId;
	}
	/*Nombre del cliente*/
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
}
