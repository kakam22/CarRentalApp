package com.cario.backend.location;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository
        extends JpaRepository<Location, Integer> {

    List<Location> findByCity(String city);

    List<Location> findByCountry(String country);

    List<Location> findByCityAndCountry(
            String city,
            String country
    );
}