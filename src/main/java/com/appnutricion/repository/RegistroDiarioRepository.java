package com.appnutricion.repository;

import com.appnutricion.model.RegistroDiario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

/**
 *Repositorio JPA para la entidad de RegistroDiario
 *da acceso a operaciones CRUD
 * basado en el usuario y fechha que aun no estasn implementadas
 */
public interface RegistroDiarioRepository extends JpaRepository<RegistroDiario, Long> {
    List<RegistroDiario> findByUsuarioId(Long usuarioId);
    List<RegistroDiario> findByUsuarioIdAndFecha(Long usuarioId, LocalDate fecha);
}
