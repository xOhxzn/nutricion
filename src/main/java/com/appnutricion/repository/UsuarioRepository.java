package com.appnutricion.repository;

import com.appnutricion.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *Repositorio JPA para la entidad de Usuarios
 *da acceso a operaciones CRUD
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {}
