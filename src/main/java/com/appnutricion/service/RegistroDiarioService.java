package com.appnutricion.service;

import com.appnutricion.model.RegistroDiario;
import com.appnutricion.repository.RegistroDiarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 *Servicio encargado de la logica con los registros diarios de consumo nutricional
 *metodos para guardar registros y consultarlos por usuario o por fecha
 *sera cambiado mas adelante
 */
@Service
public class RegistroDiarioService {

    private final RegistroDiarioRepository repo;

    /**
     *Constructor que inyecta el repositorio de registros diarios
     * @param repo instancia del repositorio RegistroDiarioRepository
     */
    public RegistroDiarioService(RegistroDiarioRepository repo) {
        this.repo = repo;
    }

    /**
     *Guarda un nuevo registro en la base de datos
     * @param registro objeto RegistroDiario a guardar
     * @return registro guardado
     */
    public RegistroDiario guardar(RegistroDiario registro) {
        return repo.save(registro);
    }

    /**
     *Busca todos los registros diarios asociados a un usuario
     * @param usuarioId identificador del usuario
     * @return lista de registros diarios encontrados
     */
    public List<RegistroDiario> obtenerPorUsuario(Long usuarioId) {
        return repo.findByUsuarioId(usuarioId);
    }

    /**
     *Busca los registros diarios de un usuario en una fecha especifica, aun no esat bien implementada
     * @param usuarioId identificador del usuario
     * @param fecha fecha a consultar
     * @return lista de registros diarios del usuario en esa fecha
     */
    public List<RegistroDiario> obtenerPorUsuarioYFecha(Long usuarioId, LocalDate fecha) {
        return repo.findByUsuarioIdAndFecha(usuarioId, fecha);
    }
}
