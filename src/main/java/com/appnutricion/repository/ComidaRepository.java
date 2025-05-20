package com.appnutricion.repository;

import com.appnutricion.model.Comida;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *Repositorio JPA para la entidad de Comida
 *da acceso a operaciones CRUD
 */
public interface ComidaRepository extends JpaRepository<Comida, Long> {}