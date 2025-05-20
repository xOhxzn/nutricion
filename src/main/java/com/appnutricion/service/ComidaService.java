package com.appnutricion.service;

import com.appnutricion.model.Comida;
import com.appnutricion.model.Usuario;
import com.appnutricion.repository.ComidaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 *Servicio encargado de la logica del programa Comida
 *metodos para obtener, guardar, actualizar y eliminar registros
 */
@Service
public class ComidaService {


    private final ComidaRepository repo;
    /**
     *Constructor que inyecta el repositorio de comidas
     * @param repo instancia del repositorio ComidaRepository
     */
    public ComidaService(ComidaRepository repo) {
        this.repo = repo;
    }

    /**
     *Retorna una lista con todas las comidas registradas
     * @return lista de objetos Comida
     */
    public List<Comida> obtenerTodas() {
        return repo.findAll();
    }

    /**
     *Busca una comida por su id
     * @param id identificador de la comida
     * @return objeto Optional que contiene una comida o puede no contenerlo
     */
    public Optional<Comida> obtenerPorId(Long id) {
        return repo.findById(id);
    }

    /**
     *Guarda una nueva comida en la base de datos
     * @param comida objeto Comida a guardar
     * @return comida guardada
     */
    public Comida guardar(Comida comida) {
        return repo.save(comida);
    }

    /**
     *Elimina una comida por su id
     * @param id identificador de la comida a eliminar
     */
    public void eliminar(Long id) {
        repo.deleteById(id);
    }

    /**
     *Actualiza los datos de una comida registrada
     * @param id identificador de la comida a actualizar
     * @param comidaActualizada datos actualizados
     * @return un objeto Comida actualizado
     */
    public Comida actualizar(Long id, Comida comidaActualizada) {
        comidaActualizada.setId(id);
        return repo.save(comidaActualizada);
    }
}
