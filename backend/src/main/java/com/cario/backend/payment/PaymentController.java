
package com.cario.backend.payment;

import com.cario.backend.payment.enums.PaymentStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Integer id) {
        return paymentService.getPaymentById(id);
    }

    // Get payment belonging to a specific rental
    @GetMapping("/rental/{rentalId}")
    public Payment getPaymentByRental(
            @PathVariable Integer rentalId) {
        return paymentService.getPaymentByRental(rentalId);
    }

    // Get payments by status
    @GetMapping("/status/{status}")
    public List<Payment> getPaymentsByStatus(
            @PathVariable PaymentStatus status) {
        return paymentService.getPaymentsByStatus(status);
    }

    @PostMapping("/rental/{rentalId}")
    public Payment createPayment(
            @PathVariable Integer rentalId,
            @RequestBody Payment payment) {
        return paymentService.createPayment(rentalId, payment);
    }

    @PatchMapping("/{id}/process")
    public Payment processPayment(@PathVariable Integer id) {
        return paymentService.processPayment(id);
    }

    @PatchMapping("/{id}/refund")
    public Payment refundPayment(@PathVariable Integer id) {
        return paymentService.refundPayment(id);
    }
}
