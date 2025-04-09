
package com.amstech.invoice.managment.entity;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.Date;
import java.sql.Timestamp;
import java.util.List;


/**
 * The persistent class for the client database table.
 * 
 */
@Entity
@NamedQuery(name="Client.findAll", query="SELECT c FROM Client c")
public class Client implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Lob
	private String address;

	@Lob
	@Column(name="billing_address")
	private String billingAddress;

	@Column(name="business_name")
	private String businessName;

	@Column(name="company_name")
	private String companyName;

	@Column(name="created_at")
	private Timestamp createdAt;

	@Temporal(TemporalType.DATE)
	private Date date;

	private String email;

	@Column(name="first_name")
	private String firstName;

	@Column(name="is_deleted")
	private byte isDeleted;

	@Column(name="last_name")
	private String lastName;

	@Column(name="linkedin_profile_url")
	private String linkedinProfileUrl;

	@Column(name="mobile_number")
	private String mobileNumber;

	@Column(name="pan_number")
	private String panNumber;

	@Column(name="postal_zip_code")
	private String postalZipCode;

	@Lob
	@Column(name="specific_registration_details")
	private String specificRegistrationDetails;

	@Column(name="updated_at")
	private Timestamp updatedAt;

	//bi-directional many-to-one association to City
	@ManyToOne
	private City city;

	//bi-directional many-to-one association to Company
	@OneToMany(mappedBy="client")
	private List<Company> companies;

	//bi-directional many-to-one association to GenerateInvoice
	@OneToMany(mappedBy="client")
	private List<GenerateInvoice> generateInvoices;

	//bi-directional many-to-one association to Invoice
	@OneToMany(mappedBy="client")
	private List<Invoice> invoices;

	//bi-directional many-to-one association to Report
	@OneToMany(mappedBy="client")
	private List<Report> reports;

	public Client() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBillingAddress() {
		return this.billingAddress;
	}

	public void setBillingAddress(String billingAddress) {
		this.billingAddress = billingAddress;
	}

	public String getBusinessName() {
		return this.businessName;
	}

	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}

	public String getCompanyName() {
		return this.companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public Timestamp getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}

	public Date getDate() {
		return this.date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public byte getIsDeleted() {
		return this.isDeleted;
	}

	public void setIsDeleted(byte isDeleted) {
		this.isDeleted = isDeleted;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getLinkedinProfileUrl() {
		return this.linkedinProfileUrl;
	}

	public void setLinkedinProfileUrl(String linkedinProfileUrl) {
		this.linkedinProfileUrl = linkedinProfileUrl;
	}

	public String getMobileNumber() {
		return this.mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getPanNumber() {
		return this.panNumber;
	}

	public void setPanNumber(String panNumber) {
		this.panNumber = panNumber;
	}

	public String getPostalZipCode() {
		return this.postalZipCode;
	}

	public void setPostalZipCode(String postalZipCode) {
		this.postalZipCode = postalZipCode;
	}

	public String getSpecificRegistrationDetails() {
		return this.specificRegistrationDetails;
	}

	public void setSpecificRegistrationDetails(String specificRegistrationDetails) {
		this.specificRegistrationDetails = specificRegistrationDetails;
	}

	public Timestamp getUpdatedAt() {
		return this.updatedAt;
	}

	public void setUpdatedAt(Timestamp updatedAt) {
		this.updatedAt = updatedAt;
	}

	public City getCity() {
		return this.city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public List<Company> getCompanies() {
		return this.companies;
	}

	public void setCompanies(List<Company> companies) {
		this.companies = companies;
	}

	public Company addCompany(Company company) {
		getCompanies().add(company);
		company.setClient(this);

		return company;
	}

	public Company removeCompany(Company company) {
		getCompanies().remove(company);
		company.setClient(null);

		return company;
	}

	public List<GenerateInvoice> getGenerateInvoices() {
		return this.generateInvoices;
	}

	public void setGenerateInvoices(List<GenerateInvoice> generateInvoices) {
		this.generateInvoices = generateInvoices;
	}

	public GenerateInvoice addGenerateInvoice(GenerateInvoice generateInvoice) {
		getGenerateInvoices().add(generateInvoice);
		generateInvoice.setClient(this);

		return generateInvoice;
	}

	public GenerateInvoice removeGenerateInvoice(GenerateInvoice generateInvoice) {
		getGenerateInvoices().remove(generateInvoice);
		generateInvoice.setClient(null);

		return generateInvoice;
	}

	public List<Invoice> getInvoices() {
		return this.invoices;
	}

	public void setInvoices(List<Invoice> invoices) {
		this.invoices = invoices;
	}

	public Invoice addInvoice(Invoice invoice) {
		getInvoices().add(invoice);
		invoice.setClient(this);

		return invoice;
	}

	public Invoice removeInvoice(Invoice invoice) {
		getInvoices().remove(invoice);
		invoice.setClient(null);

		return invoice;
	}

	public List<Report> getReports() {
		return this.reports;
	}

	public void setReports(List<Report> reports) {
		this.reports = reports;
	}

	public Report addReport(Report report) {
		getReports().add(report);
		report.setClient(this);

		return report;
	}

	public Report removeReport(Report report) {
		getReports().remove(report);
		report.setClient(null);

		return report;
	}

}
