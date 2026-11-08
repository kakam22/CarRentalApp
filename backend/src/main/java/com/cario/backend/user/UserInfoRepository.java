
package com.cario.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInfoRepository
        extends JpaRepository<UserInfo, Integer> {

    Optional<UserInfo> findByEmail(String email);

    boolean existsByEmail(String email);
}
