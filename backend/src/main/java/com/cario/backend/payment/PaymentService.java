package com.cario.backend.payment;

import com.cario.backend.payment.enums.PaymentStatus;
import com.cario.backend.rental.Rental;
import com.cario.backend.rental.RentalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final RentalRepository rentalRepository;

    public PaymentService(
            PaymentRepository paymentRepository,
            RentalRepository rentalRepository) {
        this.paymentRepository = paymentRepository;
        this.rentalRepository = rentalRepository;
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Integer paymentId) {
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException(
                        "Payment not found"
                ));
    }

    // NEW: Get payment by rental ID
    public Payment getPaymentByRental(Integer rentalId) {
        return paymentRepository.findByRental_RentalId(rentalId)
                .orElseThrow(() -> new RuntimeException(
                        "Payment not found for this rental"
                ));
    }

    // NEW: Get payments by status
    public List<Payment> getPaymentsByStatus(PaymentStatus status) {
        return paymentRepository.findByStatus(status);
    }

    @Transactional
    public Payment createPayment(
            Integer rentalId,
            Payment payment) {

        Rental rental = rentalRepository.findById(rentalId)
                .orElseThrow(() -> new RuntimeException(
                        "Rental not found"
                ));

        if (paymentRepository.findByRental_RentalId(rentalId)
                .isPresent()) {
            throw new IllegalStateException(
                    "Payment already exists for this rental"
            );
        }

        payment.setRental(rental);
        payment.setAmount(rental.getTotalCost());
        payment.setStatus(PaymentStatus.PENDING);

        return paymentRepository.save(payment);
    }

    @Transactional
    public Payment processPayment(Integer paymentId) {
        Payment payment = getPaymentById(paymentId);

        if (payment.getStatus() != PaymentStatus.PENDING) {
            throw new IllegalStateException(
                    "Only pending payments can be processed"
            );
        }

        payment.processPayment();

        return paymentRepository.save(payment);
    }

    @Transactional
    public Payment refundPayment(Integer paymentId) {
        Payment payment = getPaymentById(paymentId);

        payment.refund();

        return paymentRepository.save(payment);
    }
}