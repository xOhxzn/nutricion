package com.appnutricion.controller;

import com.appnutricion.model.Comida;
import com.appnutricion.service.ComidaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *Controlador REST para gestion de comidas
 *endpoints para consultar, crear, actualizar y eliminar comidas
 */
@RestController
@RequestMapping("/api/comidas")
@CrossOrigin(origins = "http://localhost:5173")
public class ComidaController {

    private final ComidaService service;

    public ComidaController(ComidaService service) {
        this.service = service;
    }

    /**
     *Obtiene la lista completa de comidas registradas
     * @return lista de objetos Comida
     */
    @GetMapping
    public List<Comida> listar() {
        return service.obtenerTodas();
    }

    /**
     *Guarda una nueva comida en la base de datos
     * @param comida objeto Comida recibido desde el input frontend
     * @return objeto Comida guardado
     */
    @PostMapping
    public Comida guardar(@RequestBody Comida comida) {
        return service.guardar(comida);
    }

    /**
     *Elimina una comida existente por su id
     * @param id identificador de la comida a eliminar
     */
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }

    /**
     *Actualiza una comida existente por su id
     * @param id identificador de la comida a actualizar
     * @param comida objeto Comida con los nuevos datos
     * @return objeto Comida actualizado
     */
    @PutMapping("/{id}")
    public Comida actualizar(@PathVariable Long id, @RequestBody Comida comida) {
        return service.actualizar(id, comida);
    }
}
