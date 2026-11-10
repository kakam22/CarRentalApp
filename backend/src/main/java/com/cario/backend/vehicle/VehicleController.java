
package com.cario.backend.vehicle;

import com.cario.backend.vehicle.enums.VehicleStatus;
import com.cario.backend.vehicle.enums.VehicleType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/{id}")
    public Vehicle getVehicleById(@PathVariable Integer id) {
        return vehicleService.getVehicleById(id);
    }

    @GetMapping("/type/{type}")
    public List<Vehicle> getVehiclesByType(
            @PathVariable VehicleType type) {
        return vehicleService.getVehiclesByType(type);
    }

    @GetMapping("/status/{status}")
    public List<Vehicle> getVehiclesByStatus(
            @PathVariable VehicleStatus status) {
        return vehicleService.getVehiclesByStatus(status);
    }

    @GetMapping("/location/{locationId}")
    public List<Vehicle> getVehiclesByLocation(
            @PathVariable Integer locationId) {
        return vehicleService.getVehiclesByLocation(locationId);
    }

    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.saveVehicle(vehicle);
    }

    @PatchMapping("/{id}/status")
    public Vehicle updateVehicleStatus(
            @PathVariable Integer id,
            @RequestParam VehicleStatus status) {
        return vehicleService.updateVehicleStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void deleteVehicle(@PathVariable Integer id) {
        vehicleService.deleteVehicle(id);
    }
}
