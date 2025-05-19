package com.appnutricion.controller;

import com.appnutricion.model.Comida;
import com.appnutricion.service.ComidaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comidas")
@CrossOrigin(origins = "http://localhost:5173")
public class ComidaController {

    private final ComidaService service;

    public ComidaController(ComidaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Comida> listar() {
        return service.obtenerTodas();
    }

    @PostMapping
    public Comida guardar(@RequestBody Comida comida) {
        return service.guardar(comida);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }

    @PutMapping("/{id}")
    public Comida actualizar(@PathVariable Long id, @RequestBody Comida comida) {
        return service.actualizar(id, comida);
    }
}
