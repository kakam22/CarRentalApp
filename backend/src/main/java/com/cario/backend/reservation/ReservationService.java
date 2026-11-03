package com.cario.backend.reservation;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    private ReservationRepository repository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.repository = reservationRepository;
    }

    public Optional<Reservation> findReservationById(int id) {
        return repository.findById(id);
    }

    public Reservation createReservation(Reservation reservation) {
        return repository.save(reservation);
    }

    public List<Reservation> getAllReservations(){
        return repository.findAll();
    }
}
