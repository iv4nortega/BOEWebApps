package com.boe.apps.util;
/*Metodo reutilizable para obtener un listado
 * ListItems*/
public class ListItem {
	
	private int value;
	private String text;
	/*Obtiene el valor del dato*/
	public int getValue(){
		return this.value;
	}
	public void setValue(int val){
		this.value = val;
	}
	/*Obtiene el valor del dato*/
	public String getText(){
		return this.text;
	}
	/*Obtiene el texto del dato*/
	public void setText(String text){
		this.text = text;
	}
}
