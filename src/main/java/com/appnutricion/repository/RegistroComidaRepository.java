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
    /**
     *Obtiene todos los registros de comida de un usuario para una fecha
     * aun no ha sido usada pero puedo immplementarla para ver las demas dietas de los dias anteriores
     * @param usuarioId identificador del usuario
     * @param fecha     fecha a consultar
     * @return lista de registros de comida del dia especifico
     */
    //Metodo extra para buscar po rusuario y fecha
    List<RegistroComida> findByUsuario_IdAndFecha(Long usuarioId, LocalDate fecha);
}
