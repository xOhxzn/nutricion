package com.appnutricion.repository;

import com.appnutricion.model.RegistroComida;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

/**
 *Repositorio JPA para la entidad de RegistroComida
 *da acceso a operaciones CRUD
 */
public interface RegistroComidaRepository extends JpaRepository<RegistroComida, Long> {
    List<RegistroComida> findByUsuario_IdAndFecha(Long usuarioId, LocalDate fecha);
}
