package com.amstech.invoice.managment.entity;

import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;


/**
 * The persistent class for the proforma_invoice_items database table.
 * 
 */
@Entity
@Table(name="proforma_invoice_items")
@NamedQuery(name="ProformaInvoiceItem.findAll", query="SELECT p FROM ProformaInvoiceItem p")
public class ProformaInvoiceItem implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private BigDecimal cost;

	@Column(name="created_at")
	private Timestamp createdAt;

	private String description;

	private BigDecimal tax;

	@Column(name="total_amount")
	private BigDecimal totalAmount;

	//bi-directional many-to-one association to ProformaInvoice
	@ManyToOne
	@JoinColumn(name="proforma_id")
	private ProformaInvoice proformaInvoice;

	public ProformaInvoiceItem() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public BigDecimal getCost() {
		return this.cost;
	}

	public void setCost(BigDecimal cost) {
		this.cost = cost;
	}

	public Timestamp getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getTax() {
		return this.tax;
	}

	public void setTax(BigDecimal tax) {
		this.tax = tax;
	}

	public BigDecimal getTotalAmount() {
		return this.totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

	public ProformaInvoice getProformaInvoice() {
		return this.proformaInvoice;
	}

	public void setProformaInvoice(ProformaInvoice proformaInvoice) {
		this.proformaInvoice = proformaInvoice;
	}

}