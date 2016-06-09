package com.boe.apps.util;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

/**
 * @author Ivan Hern�ndez Ortega
 * @version 1.0.0
 */
public class DBUtil 
{
	private static Connection conn;
	
	/**
	 * Metodo que obtiene la conexi�n a la base de datos a partir
	 * del archivo properties (datos de la conexi�n)
	 * @return Conexi�n a la BD
	 */
	public static Connection getConnection() 
	{
		if( conn != null)
		{
			return conn;
		}
		else
		{
			InputStream inputStream = 
					DBUtil.class.getClassLoader().getResourceAsStream( "/db.properties" );
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
				//System.out.println(e.toString());
				e.printStackTrace();
			} 
			catch (ClassNotFoundException e) 
			{
				//System.out.println(e.toString());
				e.printStackTrace();
			}
			catch (SQLException e) 
			{
				//System.out.println(e.toString());
				e.printStackTrace();
			}
		}
		return conn;
	}
	/**
	 * Metodo que cierra la conexi�n a la base de datos
	 * */
	public static void closeConnection(Connection toBeClosed ) 
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
	/**
	 * Metodo que verifica la conexi�n a la base de datos
	 * @throws SQLException 
	 * */
	public static Statement VerifyConnection(Connection connection) throws SQLException
	{
		if(connection == null){
			connection = DBUtil.getConnection();
		}
		if(connection.isClosed()){
			connection = null;
			connection = DBUtil.getConnection();
		}
		Statement statement = connection.createStatement();
		return statement;
	}
}
