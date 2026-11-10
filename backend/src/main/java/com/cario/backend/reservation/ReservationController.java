
package com.cario.backend.reservation;

import com.cario.backend.reservation.enums.ReservationStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(
            ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public Reservation getReservationById(
            @PathVariable Integer id) {
        return reservationService.getReservationById(id);
    }

    // Get all reservations belonging to a specific customer
    @GetMapping("/customer/{customerId}")
    public List<Reservation> getReservationsByCustomer(
            @PathVariable Integer customerId) {
        return reservationService.getReservationsByCustomer(customerId);
    }

    // Get all reservations for a specific vehicle
    @GetMapping("/vehicle/{vehicleId}")
    public List<Reservation> getReservationsByVehicle(
            @PathVariable Integer vehicleId) {
        return reservationService.getReservationsByVehicle(vehicleId);
    }

    // Get reservations by status
    @GetMapping("/status/{status}")
    public List<Reservation> getReservationsByStatus(
            @PathVariable ReservationStatus status) {
        return reservationService.getReservationsByStatus(status);
    }

    @PostMapping
    public Reservation createReservation(
            @RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    @PatchMapping("/{id}/confirm")
    public Reservation confirmReservation(
            @PathVariable Integer id) {
        return reservationService.confirmReservation(id);
    }

    @PatchMapping("/{id}/cancel")
    public Reservation cancelReservation(
            @PathVariable Integer id) {
        return reservationService.cancelReservation(id);
    }
}
