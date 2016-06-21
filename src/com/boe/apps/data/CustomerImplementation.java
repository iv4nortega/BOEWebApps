package com.boe.apps.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.boe.apps.models.CustomerModel;
import com.boe.apps.util.DBUtil;

/**
 *  
 **/
public class CustomerImplementation implements CustomerData 
{
	private Connection conn;
	
	public CustomerImplementation(){
		this.conn = DBUtil.getConnection();		
	}
	
	/**
	 * Obtiene el listado de todos los clientes
	 **/
	@Override
	public List<CustomerModel> getAllCustomers() {
		List<CustomerModel> returnValues = new ArrayList<CustomerModel>();
		try {
			Statement statement = DBUtil.VerifyConnection( this.conn );
			ResultSet resultSet = statement.executeQuery("SELECT * FROM D_Customer Order By D_Customer.CName;");

			while( resultSet.next() ) {
				CustomerModel customer = new CustomerModel();
				
				customer.setCustomerId( resultSet.getInt("IDCustomer" ) );
				customer.setCustomerName( resultSet.getString("CName" ) );

				returnValues.add( customer );
			}
			resultSet.close();
			statement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return returnValues;
	}

	/**
	 * Obtiene el listado de los clientes asociados a los proyectos gestionados 
	 * por el SDM
	 **/
	@Override
	public List<CustomerModel> getSDMCustomers(String sdmName) {
		List<CustomerModel> returnValues = new ArrayList<CustomerModel>();
		try {
			
			
			PreparedStatement statement = this.conn.prepareStatement( 
					" SELECT DISTINCT D_Customer.* " + 
					"   FROM D_Project " +
					"    INNER JOIN D_Customer On D_Project.IDCustomer 	= D_Customer.IDCustomer " +
					"    INNER JOIN D_SDMs ON D_Project.IDSDM 			= D_SDMs.IDSDM " + 
					" WHERE D_SDMs.SDMBOEFullName = ? " +
					" 	AND D_Project.ValidTo is null " + 
					" Order By D_Customer.CName ");
			
			statement.setString(1, sdmName);
			ResultSet resultSet = statement.executeQuery();
			while( resultSet.next() ) {
				CustomerModel customer = new CustomerModel();
				
				customer.setCustomerId( resultSet.getInt("IDCustomer" ) );
				customer.setCustomerName( resultSet.getString("CName" ) );

				returnValues.add( customer );
			}
			resultSet.close();
			statement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return returnValues;
	}


}
