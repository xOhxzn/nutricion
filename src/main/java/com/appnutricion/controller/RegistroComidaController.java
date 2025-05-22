package com.appnutricion.controller;

import com.appnutricion.model.RegistroComida;
import com.appnutricion.service.RegistroComidaService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


/**
 *Controlador REST para gestion de comidas
 *endpoints para registrar, consultar, y eliminar registros comida
 */
@RestController
@RequestMapping("/api/registro-comida")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistroComidaController {

    private final RegistroComidaService service;

    public RegistroComidaController(RegistroComidaService service) {
        this.service = service;
    }

    /**
     *Guarda una nueva comida consumida en la base de datos enlazandolos
     * @param registro objeto con los datos del registro de comida
     * @return el registro guardado con los datos calculados ya autamaticamente
     */
    @PostMapping
    public RegistroComida registrar(@RequestBody RegistroComida registro) {
        return service.registrar(registro);
    }

    /**
     *Obtiene los registros de comida de un usuario en una fecha
     * @param usuarioId identificador del usuario
     * @param fecha     fecha en formato YYYY-MM-DD
     * @return lista de registros de la fecha especifica
     */
    @GetMapping("/{usuarioId}/fecha")
    public List<RegistroComida> obtenerPorUsuarioYFecha(@PathVariable Long usuarioId, @RequestParam String fecha) {
        LocalDate dia = LocalDate.parse(fecha);
        return service.obtenerPorUsuarioYFecha(usuarioId, dia);
    }


    /**
     *Elimina un registro de comida por su identificador
     * @param id identificador del registro a eliminar
     */
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
