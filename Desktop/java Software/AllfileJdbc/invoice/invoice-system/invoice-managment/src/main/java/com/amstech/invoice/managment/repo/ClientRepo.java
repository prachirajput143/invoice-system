package com.amstech.invoice.managment.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amstech.invoice.managment.entity.Client;
import com.amstech.invoice.managment.entity.Invoice;

public interface ClientRepo extends JpaRepository<Client,Integer> {
	 boolean existsById(int i);   //if user exist then user can be create a invoice
	
}