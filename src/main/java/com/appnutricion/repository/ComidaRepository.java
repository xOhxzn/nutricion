package com.appnutricion.repository;

import com.appnutricion.model.Comida;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 *Repositorio JPA para la entidad de Comida
 *da acceso a operaciones CRUD
 */
public interface ComidaRepository extends JpaRepository<Comida, Long> {
    //Metodo extra para buscar comida por tipo de platillo
    List<Comida> findByTipoPlatillo(String tipoPlatillo);
}