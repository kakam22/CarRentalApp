package com.cario.backend.rental;

import com.cario.backend.rental.enums.RentalStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RentalRepository extends JpaRepository<Rental, Integer> {

    List<Rental> findByStatus(RentalStatus status);

    List<Rental> findByVehicle_VehicleId(Integer vehicleId);

    Optional<Rental> findByReservation_ReservationId(
            Integer reservationId
    );
}