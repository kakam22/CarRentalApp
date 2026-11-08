
package com.cario.backend.location;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }

    @GetMapping("/{id}")
    public Location getLocationById(@PathVariable Integer id) {
        return locationService.getLocationById(id);
    }

    // Get locations in a specific city
    @GetMapping("/city/{city}")
    public List<Location> getLocationsByCity(
            @PathVariable String city) {
        return locationService.getLocationsByCity(city);
    }

    // Get locations in a specific country
    @GetMapping("/country/{country}")
    public List<Location> getLocationsByCountry(
            @PathVariable String country) {
        return locationService.getLocationsByCountry(country);
    }

    // Get locations by city and country
    @GetMapping("/search")
    public List<Location> getLocationsByCityAndCountry(
            @RequestParam String city,
            @RequestParam String country) {
        return locationService.getLocationsByCityAndCountry(
                city, country);
    }

    @PostMapping
    public Location createLocation(
            @RequestBody Location location) {
        return locationService.saveLocation(location);
    }

    @DeleteMapping("/{id}")
    public void deleteLocation(@PathVariable Integer id) {
        locationService.deleteLocation(id);
    }
}
