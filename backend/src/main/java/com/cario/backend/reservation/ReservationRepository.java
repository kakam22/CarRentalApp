package com.cario.backend.reservation;

import com.cario.backend.reservation.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository
        extends JpaRepository<Reservation, Integer> {

    List<Reservation> findByUser_UserId(Integer userId);

    List<Reservation> findByVehicle_VehicleId(Integer vehicleId);

    List<Reservation> findByReservationStatus(
            ReservationStatus reservationStatus
    );
}