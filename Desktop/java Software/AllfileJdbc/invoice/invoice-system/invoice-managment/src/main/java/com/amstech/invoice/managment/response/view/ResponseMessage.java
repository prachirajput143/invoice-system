
package com.amstech.invoice.managment.response.view;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public class ResponseMessage {
    
    private int statusCode;
    private String message;
    private Long totalRecords;
    private String status;

    // Constructor for success or error messages
    public ResponseMessage(HttpStatus status, String message) {
        this(status, message, null);
    }

    // Constructor for messages with total records
    public ResponseMessage(HttpStatus status, String message, Long totalRecords) {
        this.statusCode = status.value();
        this.message = message;
        this.status = status.name();
        this.totalRecords = totalRecords;
    }

    // Getters and Setters
    public int getStatusCode() { return statusCode; }
    public String getMessage() { return message; }
    public Long getTotalRecords() { return totalRecords; }
    public String getStatus() { return status; }

    public void setStatus(HttpStatus status) {
        this.statusCode = status.value();
        this.status = status.name();
    }
    public void setMessage(String message) { this.message = message; }
    public void setTotalRecords(Long totalRecords) { this.totalRecords = totalRecords; }
}
