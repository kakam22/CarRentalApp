package com.cario.backend.location;

import com.cario.backend.vehicle.Vehicle;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer locationId;

    private String name;

    private String address;

    private String city;

    private String country;

    @OneToMany(mappedBy = "location", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Vehicle> vehicles = new ArrayList<>();
}