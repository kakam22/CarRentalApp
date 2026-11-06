package com.cario.backend.payment;

import com.cario.backend.payment.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository
        extends JpaRepository<Payment, Integer> {

    List<Payment> findByStatus(PaymentStatus status);

    Optional<Payment> findByRental_RentalId(Integer rentalId);
}