package com.cario.backend.payment;

import com.cario.backend.payment.enums.PaymentMethod;
import com.cario.backend.payment.enums.PaymentStatus;
import com.cario.backend.rental.Rental;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal amount;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate paymentDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod method;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rental_id", nullable = false, unique = true)
    @JsonIgnore
    private Rental rental;

    public void processPayment() {
        this.status = PaymentStatus.PAID;
        this.paymentDate = LocalDate.now();
    }

    public void refund() {
        if (this.status != PaymentStatus.PAID) {
            throw new IllegalStateException(
                    "Only paid payments can be refunded"
            );
        }

        this.status = PaymentStatus.REFUNDED;
    }
}