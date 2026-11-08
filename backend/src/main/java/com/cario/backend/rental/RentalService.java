package com.cario.backend.rental;

import com.cario.backend.rental.enums.RentalStatus;
import com.cario.backend.reservation.Reservation;
import com.cario.backend.reservation.ReservationRepository;
import com.cario.backend.reservation.enums.ReservationStatus;
import com.cario.backend.vehicle.Vehicle;
import com.cario.backend.vehicle.VehicleRepository;
import com.cario.backend.vehicle.enums.VehicleStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RentalService {

    private final RentalRepository rentalRepository;
    private final ReservationRepository reservationRepository;
    private final VehicleRepository vehicleRepository;

    public RentalService(
            RentalRepository rentalRepository,
            ReservationRepository reservationRepository,
            VehicleRepository vehicleRepository
    ) {
        this.rentalRepository = rentalRepository;
        this.reservationRepository = reservationRepository;
        this.vehicleRepository = vehicleRepository;
    }

    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }

    public Rental getRentalById(Integer rentalId) {
        return rentalRepository.findById(rentalId)
                .orElseThrow(() -> new RuntimeException(
                        "Rental not found"
                ));
    }

    @Transactional
    public Rental createRental(Integer reservationId) {

        Reservation reservation = reservationRepository
                .findById(reservationId)
                .orElseThrow(() -> new RuntimeException(
                        "Reservation not found"
                ));

        if (reservation.getReservationStatus()
                != ReservationStatus.CONFIRMED) {
            throw new IllegalStateException(
                    "Reservation must be confirmed first"
            );
        }

        if (rentalRepository
                .findByReservation_ReservationId(reservationId)
                .isPresent()) {
            throw new IllegalStateException(
                    "Rental already exists for this reservation"
            );
        }

        Vehicle vehicle = reservation.getVehicle();

        Rental rental = new Rental();

        rental.setReservation(reservation);
        rental.setVehicle(vehicle);
        rental.setPickupLocation(reservation.getPickupLocation());
        rental.setReturnLocation(reservation.getReturnLocation());
        rental.setStartDate(reservation.getPickupDate());
        rental.setEndDate(reservation.getReturnDate());
        rental.setStatus(RentalStatus.ACTIVE);

        rental.calculateCost();

        vehicle.updateStatus(VehicleStatus.RENTED);

        vehicleRepository.save(vehicle);

        return rentalRepository.save(rental);
    }

    @Transactional
    public Rental completeRental(Integer rentalId) {

        Rental rental = getRentalById(rentalId);

        if (rental.getStatus() != RentalStatus.ACTIVE) {
            throw new IllegalStateException(
                    "Only active rentals can be completed"
            );
        }

        rental.completeRental();

        Vehicle vehicle = rental.getVehicle();

        vehicle.updateStatus(VehicleStatus.AVAILABLE);

        vehicleRepository.save(vehicle);

        return rentalRepository.save(rental);
    }

    @Transactional
    public Rental cancelRental(Integer rentalId) {

        Rental rental = getRentalById(rentalId);

        if (rental.getStatus() != RentalStatus.ACTIVE) {
            throw new IllegalStateException(
                    "Only active rentals can be cancelled"
            );
        }

        rental.setStatus(RentalStatus.CANCELLED);

        Vehicle vehicle = rental.getVehicle();

        vehicle.updateStatus(VehicleStatus.AVAILABLE);

        vehicleRepository.save(vehicle);

        return rentalRepository.save(rental);
    }

    public List<Rental> getRentalsByVehicle(Integer vehicleId) {
    return rentalRepository.findByVehicle_VehicleId(vehicleId);
}

    public Rental getRentalByReservation(Integer reservationId) {
        return rentalRepository
                .findByReservation_ReservationId(reservationId)
                .orElseThrow(() -> new RuntimeException(
                        "Rental not found for this reservation"
                ));
    }

    public List<Rental> getRentalsByStatus(RentalStatus status) {
        return rentalRepository.findByStatus(status);
    }
    
}