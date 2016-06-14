package com.boe.apps.models;
/**
 * @author Ivan Hernández Ortega
 * @version 1.0.0
 * @create 06 de Mayo 2016
 * @update 09 de Junio 2016
 */
public class QuartersModel {

	private int year;
	private int quarter;
	private int IDTime;
	
	/*Year of quarter*/
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	/*Quarter */
	public int getQuarter(){
		return quarter;
	}
	public void setQuarter(int quarter){
		this.quarter = quarter;
	}
	/*Fecha de quarter of year*/
	public int getIdTime(){
		return IDTime;
	}
	public void setIdTime(int idtime){
		this.IDTime = idtime;
	}
	
}
