package com.cario.backend.reservation;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {
    private ReservationService service;

    public ReservationController(ReservationService service){
        this.service = service;
    }

    @PostMapping("/create")
    public Reservation createReservation(@RequestBody Reservation reservation) {
        System.out.println("createReservation");
        System.out.println(reservation);
        return service.createReservation(reservation);
    }

    @GetMapping("/")
    public List<Reservation> getReservations() {
        return service.getAllReservations();
    }
}
