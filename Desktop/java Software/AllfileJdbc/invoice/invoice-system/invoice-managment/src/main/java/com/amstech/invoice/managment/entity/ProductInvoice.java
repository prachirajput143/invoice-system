package com.amstech.invoice.managment.entity;

import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the product_invoices database table.
 * 
 */
@Entity
@Table(name="product_invoices")
@NamedQuery(name="ProductInvoice.findAll", query="SELECT p FROM ProductInvoice p")
public class ProductInvoice implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Lob
	@Column(name="account_details")
	private String accountDetails;

	@Column(name="buyer_details")
	private String buyerDetails;

	@Temporal(TemporalType.DATE)
	private Date date;

	@Temporal(TemporalType.DATE)
	@Column(name="due_date")
	private Date dueDate;

	@Column(name="handling_costs")
	private BigDecimal handlingCosts;

	@Column(name="order_number")
	private String orderNumber;

	@Column(name="payment_method")
	private String paymentMethod;

	@Column(name="payment_term")
	private String paymentTerm;

	private BigDecimal shipping;

	private String supplier;

	@Column(name="tax_calculation")
	private BigDecimal taxCalculation;

	@Column(name="total_payable")
	private BigDecimal totalPayable;

	//bi-directional many-to-one association to InvoiceType
	@OneToMany(mappedBy="productInvoice")
	private List<InvoiceType> invoiceTypes;

	//bi-directional many-to-one association to ProductInvoiceItem
	@OneToMany(mappedBy="productInvoice")
	private List<ProductInvoiceItem> productInvoiceItems;
	
	@Column(name="is_deleted")
	private int isDeleted;

	public int getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}

	public ProductInvoice() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAccountDetails() {
		return this.accountDetails;
	}

	public void setAccountDetails(String accountDetails) {
		this.accountDetails = accountDetails;
	}

	public String getBuyerDetails() {
		return this.buyerDetails;
	}

	public void setBuyerDetails(String buyerDetails) {
		this.buyerDetails = buyerDetails;
	}

	public Date getDate() {
		return this.date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Date getDueDate() {
		return this.dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public BigDecimal getHandlingCosts() {
		return this.handlingCosts;
	}

	public void setHandlingCosts(BigDecimal handlingCosts) {
		this.handlingCosts = handlingCosts;
	}

	public String getOrderNumber() {
		return this.orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getPaymentMethod() {
		return this.paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public String getPaymentTerm() {
		return this.paymentTerm;
	}

	public void setPaymentTerm(String paymentTerm) {
		this.paymentTerm = paymentTerm;
	}

	public BigDecimal getShipping() {
		return this.shipping;
	}

	public void setShipping(BigDecimal shipping) {
		this.shipping = shipping;
	}

	public String getSupplier() {
		return this.supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	public BigDecimal getTaxCalculation() {
		return this.taxCalculation;
	}

	public void setTaxCalculation(BigDecimal taxCalculation) {
		this.taxCalculation = taxCalculation;
	}

	public BigDecimal getTotalPayable() {
		return this.totalPayable;
	}

	public void setTotalPayable(BigDecimal totalPayable) {
		this.totalPayable = totalPayable;
	}

	public List<InvoiceType> getInvoiceTypes() {
		return this.invoiceTypes;
	}

	public void setInvoiceTypes(List<InvoiceType> invoiceTypes) {
		this.invoiceTypes = invoiceTypes;
	}

	public InvoiceType addInvoiceType(InvoiceType invoiceType) {
		getInvoiceTypes().add(invoiceType);
		invoiceType.setProductInvoice(this);

		return invoiceType;
	}

	public InvoiceType removeInvoiceType(InvoiceType invoiceType) {
		getInvoiceTypes().remove(invoiceType);
		invoiceType.setProductInvoice(null);

		return invoiceType;
	}

	public List<ProductInvoiceItem> getProductInvoiceItems() {
		return this.productInvoiceItems;
	}

	public void setProductInvoiceItems(List<ProductInvoiceItem> productInvoiceItems) {
		this.productInvoiceItems = productInvoiceItems;
	}

	public ProductInvoiceItem addProductInvoiceItem(ProductInvoiceItem productInvoiceItem) {
		getProductInvoiceItems().add(productInvoiceItem);
		productInvoiceItem.setProductInvoice(this);

		return productInvoiceItem;
	}

	public ProductInvoiceItem removeProductInvoiceItem(ProductInvoiceItem productInvoiceItem) {
		getProductInvoiceItems().remove(productInvoiceItem);
		productInvoiceItem.setProductInvoice(null);

		return productInvoiceItem;
	}

}