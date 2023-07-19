package com.thoughtspot.WorldBank.repository;

import com.thoughtspot.WorldBank.model.View;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ViewRepository extends JpaRepository<View, Long> {
    List<View> findByCountryAndIndicator(String country, String indicator);

    View save(View view);

    Optional<Object> findById(Long viewId);
}