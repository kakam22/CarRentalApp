-- =========================
-- CUSTOMERS
-- =========================

MERGE INTO customer (user_id, first_name, last_name, email, password)
KEY(user_id)
VALUES
(1, 'John', 'Doe', 'john@example.com', 'password123'),
(2, 'Jane', 'Smith', 'jane@example.com', 'password123'),
(3, 'Michael', 'Johnson', 'michael@example.com', 'password123');


-- =========================
-- LOCATIONS
-- =========================

MERGE INTO location (location_id, name, address, city, country)
KEY(location_id)
VALUES
(1, 'Odense Central', 'Ostre Stationsvej 27', 'Odense', 'Denmark'),
(2, 'Copenhagen Airport', 'Lufthavnsboulevarden 6', 'Copenhagen', 'Denmark'),
(3, 'Aarhus Central', 'Banegardspladsen 1', 'Aarhus', 'Denmark');


-- =========================
-- VEHICLES
-- =========================

MERGE INTO vehicle
(vehicle_id, make, model, license_plate, type, daily_rate, status, location_id)
KEY(vehicle_id)
VALUES
(1, 'Toyota', 'Yaris', 'AB12345', 'ECONOMY', 350.00, 'AVAILABLE', 1),
(2, 'BMW', 'X5', 'CD67890', 'SUV', 950.00, 'RENTED', 1),
(3, 'Mercedes-Benz', 'C-Class', 'EF11223', 'LUXURY', 850.00, 'AVAILABLE', 2),
(4, 'Volkswagen', 'Transporter', 'GH44556', 'VAN', 700.00, 'RESERVED', 3),
(5, 'Tesla', 'Model 3', 'IJ77889', 'ELECTRIC', 650.00, 'MAINTENANCE', 2);


-- =========================
-- RESERVATIONS
-- =========================

MERGE INTO reservation
(reservation_id, customer_id, vehicle_id,
 pickup_location_id, return_location_id,
 pickup_date, return_date, reservation_status)
KEY(reservation_id)
VALUES
(1, 1, 2, 1, 1, DATE '2026-11-08', DATE '2026-11-12', 'CONFIRMED'),
(2, 2, 3, 2, 1, DATE '2026-10-01', DATE '2026-10-04', 'CONFIRMED'),
(3, 3, 4, 3, 3, DATE '2026-11-15', DATE '2026-11-18', 'PENDING');


-- =========================
-- RENTALS
-- =========================

MERGE INTO rental
(rental_id, reservation_id, vehicle_id,
 pickup_location_id, return_location_id,
 start_date, end_date, total_cost, status)
KEY(rental_id)
VALUES
(1, 1, 2, 1, 1, DATE '2026-11-08', DATE '2026-11-12', 3800.00, 'ACTIVE'),
(2, 2, 3, 2, 1, DATE '2026-10-01', DATE '2026-10-04', 2550.00, 'COMPLETED');


-- =========================
-- PAYMENTS
-- =========================

MERGE INTO payment
(payment_id, rental_id, amount, payment_date, method, status)
KEY(payment_id)
VALUES
(1, 1, 3800.00, DATE '2026-11-08', 'CREDIT_CARD', 'PAID'),
(2, 2, 2550.00, DATE '2026-10-01', 'PAYPAL', 'PAID');