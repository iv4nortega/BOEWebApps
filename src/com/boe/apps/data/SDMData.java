package com.boe.apps.data;

import java.sql.SQLException;

import com.boe.apps.models.*;

/* 
 * @author : Iv�n Hern�ndez Ortega
 * @create date : 06 de Mayo 2016
*/
public interface SDMData 
{
	public UserBOEModel getUserProfile(String userLogin) throws SQLException;
}