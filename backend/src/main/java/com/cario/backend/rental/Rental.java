package com.cario.backend.rental;

import com.cario.backend.location.Location;
import com.cario.backend.payment.Payment;
import com.cario.backend.rental.enums.RentalStatus;
import com.cario.backend.reservation.Reservation;
import com.cario.backend.vehicle.Vehicle;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer rentalId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @Column(precision = 10, scale = 2)
    private BigDecimal totalCost;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RentalStatus status;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id", nullable = false, unique = true)
    @JsonIgnore
    private Reservation reservation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @OneToOne(mappedBy = "rental", fetch = FetchType.LAZY)
    @JsonIgnore
    private Payment payment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pickup_location_id", nullable = false)
    private Location pickupLocation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "return_location_id", nullable = false)
    private Location returnLocation;

    public BigDecimal calculateCost() {

        if (startDate == null || endDate == null || vehicle == null) {
            throw new IllegalStateException(
                    "Rental dates and vehicle must be provided"
            );
        }

        if (endDate.isBefore(startDate)) {
            throw new IllegalArgumentException(
                    "End date cannot be before start date"
            );
        }

        long days = ChronoUnit.DAYS.between(startDate, endDate);

        // Minimum rental duration is one day.
        if (days == 0) {
            days = 1;
        }

        this.totalCost = vehicle.getDailyRate()
                .multiply(BigDecimal.valueOf(days));

        return this.totalCost;
    }

    public void startRental() {
        this.status = RentalStatus.ACTIVE;
    }

    public void completeRental() {
        this.status = RentalStatus.COMPLETED;
    }
}