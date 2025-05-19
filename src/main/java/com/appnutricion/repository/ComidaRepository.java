package com.appnutricion.repository;

import com.appnutricion.model.Comida;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComidaRepository extends JpaRepository<Comida, Long> {}
