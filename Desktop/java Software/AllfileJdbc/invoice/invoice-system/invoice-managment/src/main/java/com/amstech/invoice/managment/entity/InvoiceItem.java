package com.amstech.invoice.managment.entity;

import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;


/**
 * The persistent class for the invoice_items database table.
 * 
 */
@Entity
@Table(name="invoice_items")
@NamedQuery(name="InvoiceItem.findAll", query="SELECT i FROM InvoiceItem i")
public class InvoiceItem implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private String category;

	private BigDecimal discount;

	private BigDecimal price;

	@Column(name="product_code")
	private String productCode;

	private int quantity;

	private BigDecimal tax;

	private BigDecimal total;

	private String type;

	//bi-directional many-to-one association to Invoice
	@OneToMany(mappedBy="invoiceItem")
	private List<Invoice> invoices;

	//bi-directional many-to-one association to TaxDetail
	@OneToMany(mappedBy="invoiceItem")
	private List<TaxDetail> taxDetails;

	public InvoiceItem() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public BigDecimal getDiscount() {
		return this.discount;
	}

	public void setDiscount(BigDecimal discount) {
		this.discount = discount;
	}

	public BigDecimal getPrice() {
		return this.price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getProductCode() {
		return this.productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public int getQuantity() {
		return this.quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getTax() {
		return this.tax;
	}

	public void setTax(BigDecimal tax) {
		this.tax = tax;
	}

	public BigDecimal getTotal() {
		return this.total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<Invoice> getInvoices() {
		return this.invoices;
	}

	public void setInvoices(List<Invoice> invoices) {
		this.invoices = invoices;
	}

	public Invoice addInvoice(Invoice invoice) {
		getInvoices().add(invoice);
		invoice.setInvoiceItem(this);

		return invoice;
	}

	public Invoice removeInvoice(Invoice invoice) {
		getInvoices().remove(invoice);
		invoice.setInvoiceItem(null);

		return invoice;
	}

	public List<TaxDetail> getTaxDetails() {
		return this.taxDetails;
	}

	public void setTaxDetails(List<TaxDetail> taxDetails) {
		this.taxDetails = taxDetails;
	}

	public TaxDetail addTaxDetail(TaxDetail taxDetail) {
		getTaxDetails().add(taxDetail);
		taxDetail.setInvoiceItem(this);

		return taxDetail;
	}

	public TaxDetail removeTaxDetail(TaxDetail taxDetail) {
		getTaxDetails().remove(taxDetail);
		taxDetail.setInvoiceItem(null);

		return taxDetail;
	}

}