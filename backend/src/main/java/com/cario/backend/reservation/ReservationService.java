package com.cario.backend.reservation;

import com.cario.backend.reservation.enums.ReservationStatus;
import com.cario.backend.vehicle.Vehicle;
import com.cario.backend.vehicle.VehicleRepository;
import com.cario.backend.vehicle.enums.VehicleStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final VehicleRepository vehicleRepository;

    public ReservationService(
            ReservationRepository reservationRepository,
            VehicleRepository vehicleRepository
    ) {
        this.reservationRepository = reservationRepository;
        this.vehicleRepository = vehicleRepository;
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(Integer reservationId) {
        return reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException(
                        "Reservation not found"
                ));
    }

    @Transactional
    public Reservation createReservation(Reservation reservation) {

        if (reservation.getPickupDate() == null
                || reservation.getReturnDate() == null) {
            throw new IllegalArgumentException(
                    "Pickup and return dates are required"
            );
        }

        if (reservation.getReturnDate()
                .isBefore(reservation.getPickupDate())) {
            throw new IllegalArgumentException(
                    "Return date cannot be before pickup date"
            );
        }

        Vehicle vehicle = vehicleRepository.findById(
                reservation.getVehicle().getVehicleId()
        ).orElseThrow(() -> new RuntimeException(
                "Vehicle not found"
        ));

        if (!vehicle.isAvailable()) {
            throw new IllegalStateException(
                    "Vehicle is not available"
            );
        }

        reservation.create();

        vehicle.updateStatus(VehicleStatus.RESERVED);

        vehicleRepository.save(vehicle);

        return reservationRepository.save(reservation);
    }

    @Transactional
    public Reservation confirmReservation(Integer reservationId) {

        Reservation reservation = getReservationById(reservationId);

        if (reservation.getReservationStatus()
                != ReservationStatus.PENDING) {
            throw new IllegalStateException(
                    "Only pending reservations can be confirmed"
            );
        }

        reservation.confirm();

        return reservationRepository.save(reservation);
    }

    @Transactional
    public Reservation cancelReservation(Integer reservationId) {

        Reservation reservation = getReservationById(reservationId);

        if (reservation.getReservationStatus()
                == ReservationStatus.CANCELLED) {
            throw new IllegalStateException(
                    "Reservation is already cancelled"
            );
        }

        reservation.cancel();

        Vehicle vehicle = reservation.getVehicle();

        if (vehicle != null
                && vehicle.getStatus() == VehicleStatus.RESERVED) {

            vehicle.updateStatus(VehicleStatus.AVAILABLE);

            vehicleRepository.save(vehicle);
        }

        return reservationRepository.save(reservation);
    }

    public List<Reservation> getReservationsByCustomer(Integer customerId) {
        return reservationRepository.findByUser_UserId(customerId);
    }

    public List<Reservation> getReservationsByVehicle(Integer vehicleId) {
        return reservationRepository.findByVehicle_VehicleId(vehicleId);
    }

    public List<Reservation> getReservationsByStatus(
            ReservationStatus status) {
        return reservationRepository.findByReservationStatus(status);
    }
}