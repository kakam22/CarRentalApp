package com.cario.backend.vehicle;

import com.cario.backend.vehicle.enums.VehicleStatus;
import com.cario.backend.vehicle.enums.VehicleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VehicleRepository
        extends JpaRepository<Vehicle, Integer> {

    Optional<Vehicle> findByLicensePlate(String licensePlate);

    List<Vehicle> findByStatus(VehicleStatus status);

    List<Vehicle> findByType(VehicleType type);

    List<Vehicle> findByLocation_LocationId(Integer locationId);

    boolean existsByLicensePlate(String licensePlate);
}