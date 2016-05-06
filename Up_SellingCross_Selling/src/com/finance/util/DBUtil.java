package com.finance.util;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

/**
 * @author Ivan Hernández Ortega
 * @version 1.0.0
 */
public class DBUtil 
{
	private static Connection conn;
	
	/**
	 * Metodo que obtiene la conexión a la base de datos a partir
	 * del archivo properties (datos de la conexión)
	 * @return Conexión a la BD
	 */
	public static Connection getConnection() 
	{
		if( conn != null)
			return conn;
		InputStream inputStream = DBUtil.class.getClassLoader().getResourceAsStream( "/db.properties" );
		Properties properties = new Properties();
		try 
		{
			properties.load( inputStream );
			String driver = properties.getProperty("driver");
			String url = properties.getProperty("url");
			String user = properties.getProperty("user");
			String password = properties.getProperty("password");
			Class.forName(driver);
			conn = DriverManager.getConnection( url, user, password );
		} 
		catch (IOException e) 
		{
			System.out.println(e.toString());
			//e.printStackTrace();
		} 
		catch (ClassNotFoundException e) 
		{
			System.out.println(e.toString());
			//e.printStackTrace();
		}
		catch (SQLException e) 
		{
			System.out.println(e.toString());
			//e.printStackTrace();
		}
		return conn;
	}
	/**
	 * Metodo que cierra la conexión a la base de datos
	 * */
	public static void closeConnection( Connection toBeClosed ) 
	{
		if(toBeClosed == null)
			return;
		try 
		{
			toBeClosed.close();
		} 
		catch (SQLException e) 
		{
			e.printStackTrace();
		}
	}
}
