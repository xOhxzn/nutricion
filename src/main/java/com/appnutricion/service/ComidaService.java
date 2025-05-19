package com.appnutricion.service;

import com.appnutricion.model.Comida;
import com.appnutricion.repository.ComidaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComidaService {

    private final ComidaRepository repo;

    public ComidaService(ComidaRepository repo) {
        this.repo = repo;
    }

    public List<Comida> obtenerTodas() {
        return repo.findAll();
    }

    public Comida guardar(Comida comida) {
        return repo.save(comida);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }

    public Comida actualizar(Long id, Comida comidaActualizada) {
        comidaActualizada.setId(id);
        return repo.save(comidaActualizada);
    }
}
