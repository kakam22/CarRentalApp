package com.cario.backend.location;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Location getLocationById(Integer locationId) {
        return locationRepository.findById(locationId)
                .orElseThrow(() -> new RuntimeException(
                        "Location not found"
                ));
    }

    public Location saveLocation(Location location) {
        return locationRepository.save(location);
    }

    public void deleteLocation(Integer locationId) {
        locationRepository.deleteById(locationId);
    }

    public List<Location> getLocationsByCity(String city) {
    return locationRepository.findByCity(city);
}

    public List<Location> getLocationsByCountry(String country) {
        return locationRepository.findByCountry(country);
    }

    public List<Location> getLocationsByCityAndCountry(
            String city, String country) {
        return locationRepository.findByCityAndCountry(city, country);
    }
}