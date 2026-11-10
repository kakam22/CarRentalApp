
package com.cario.backend.rental;

import com.cario.backend.rental.enums.RentalStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    private final RentalService rentalService;

    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @GetMapping
    public List<Rental> getAllRentals() {
        return rentalService.getAllRentals();
    }

    @GetMapping("/{id}")
    public Rental getRentalById(@PathVariable Integer id) {
        return rentalService.getRentalById(id);
    }

    // Get all rentals for a specific vehicle
    @GetMapping("/vehicle/{vehicleId}")
    public List<Rental> getRentalsByVehicle(
            @PathVariable Integer vehicleId) {
        return rentalService.getRentalsByVehicle(vehicleId);
    }

    // Get rental belonging to a specific reservation
    @GetMapping("/reservation/{reservationId}")
    public Rental getRentalByReservation(
            @PathVariable Integer reservationId) {
        return rentalService.getRentalByReservation(reservationId);
    }

    // Get rentals by status
    @GetMapping("/status/{status}")
    public List<Rental> getRentalsByStatus(
            @PathVariable RentalStatus status) {
        return rentalService.getRentalsByStatus(status);
    }

    // Create rental using an existing reservation
    @PostMapping("/reservation/{reservationId}")
    public Rental createRental(
            @PathVariable Integer reservationId) {
        return rentalService.createRental(reservationId);
    }

    @PatchMapping("/{id}/complete")
    public Rental completeRental(@PathVariable Integer id) {
        return rentalService.completeRental(id);
    }

    @PatchMapping("/{id}/cancel")
    public Rental cancelRental(@PathVariable Integer id) {
        return rentalService.cancelRental(id);
    }
}
