package com.boe.apps.models;
/**
 * @author Iván Hernández Ortega
 *
 */
public class NotesModel 
{
	private int idNote;
	private int idParentItem;
	private String idTableName;
	private String note;
	private String addedBy;
	
	/*ID DE NOTA*/
	public int getIDNote() {
		return idNote;
	}
	public void setIDNote(int noteId) {
		this.idNote = noteId;
	}
	/*ID DE LA TABLA PADRE*/
	public int getIDParentItem() {
		return idParentItem;
	}
	public void setIDParentItem(int parentId) {
		this.idParentItem = parentId;
	}
	/*NOMBRE DE LA TABLA PROVENIENTE*/
	public String getIDTableName() {
		return idTableName;
	}
	public void setIDTableName(String tablename) {
		this.idTableName = tablename;
	}
	/*ID DE NOTA*/
	public String getNote() {
		return note;
	}
	public void setNote(String notes) {
		this.note = notes;
	}
	/*NOMBRE DE QUIEN AGREGA LA NOTA*/
	public String getAddedBy() {
		return addedBy;
	}
	public void setAddedBy(String addedBy) {
		this.addedBy = addedBy;
	}
}
