package com.cario.backend.vehicle;

import com.cario.backend.vehicle.enums.VehicleStatus;
import com.cario.backend.vehicle.enums.VehicleType;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle getVehicleById(Integer vehicleId) {
        return vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException(
                        "Vehicle not found"
                ));
    }

    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicleStatus(
            Integer vehicleId,
            VehicleStatus status
    ) {
        Vehicle vehicle = getVehicleById(vehicleId);

        vehicle.updateStatus(status);

        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Integer vehicleId) {
        vehicleRepository.deleteById(vehicleId);
    }
    
    public List<Vehicle> getVehiclesByType(VehicleType type) {
        return vehicleRepository.findByType(type);
    }

    public List<Vehicle> getVehiclesByStatus(VehicleStatus status) {
        return vehicleRepository.findByStatus(status);
    }

    public List<Vehicle> getVehiclesByLocation(Integer locationId) {
        return vehicleRepository.findByLocation_LocationId(locationId);
    }
}