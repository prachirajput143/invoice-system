
package com.amstech.invoice.managment.request.view;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public class generateInvoiceRequest {
	private int userId;
	private String invoiceNumber;    
    private Date issueDate;	
    private Date dueDate;
    private String inviceType;
    
    private String customerName;
    private String email;
    private String phoneNumber;
    private String billingAddress;
    private String shippingAddress;
    private String city;
    private String state;
    private String taxId;
    private List<invoiceItem>items;
    
    private double subtotal;
    private double discount;
    private double tax;
    private BigDecimal totalAmount;
    
    private String paymenTerms;
    private String currency;
    
    private boolean autoGenerateInvoice;
    private boolean existingClient;
    
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getInvoiceNumber() {
		return invoiceNumber;
	}
	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}
	public Date getIssueDate() {
		return issueDate;
	}
	public void setIssueDate(Date issueDate) {
		this.issueDate = issueDate;
	}
	
	public Date getDueDate() {
		return dueDate;
	}
	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}
	public String getInviceType() {
		return inviceType;
	}
	public void setInviceType(String inviceType) {
		this.inviceType = inviceType;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getBillingAddress() {
		return billingAddress;
	}
	public void setBillingAddress(String billingAddress) {
		this.billingAddress = billingAddress;
	}
	public String getShippingAddress() {
		return shippingAddress;
	}
	public void setShippingAddress(String shippingAddress) {
		this.shippingAddress = shippingAddress;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getTaxId() {
		return taxId;
	}
	public void setTaxId(String taxId) {
		this.taxId = taxId;
	}
	public List<invoiceItem> getItems() {
		return items;
	}
	public void setItems(List<invoiceItem> items) {
		this.items = items;
	}
	public double getSubtotal() {
		return subtotal;
	}
	public void setSubtotal(double subtotal) {
		this.subtotal = subtotal;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public double getTax() {
		return tax;
	}
	public void setTax(double tax) {
		this.tax = tax;
	}
	public BigDecimal getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}
	public String getPaymenTerms() {
		return paymenTerms;
	}
	public void setPaymenTerms(String paymenTerms) {
		this.paymenTerms = paymenTerms;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public boolean isAutoGenerateInvoice() {
		return autoGenerateInvoice;
	}
	public void setAutoGenerateInvoice(boolean autoGenerateInvoice) {
		this.autoGenerateInvoice = autoGenerateInvoice;
	}
	public boolean isExistingClient() {
		return existingClient;
	}
	public void setExistingClient(boolean existingClient) {
		this.existingClient = existingClient;
	}
}
