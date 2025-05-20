package com.appnutricion.controller;

import com.appnutricion.model.Comida;
import com.appnutricion.model.RegistroDiario;
import com.appnutricion.model.Usuario;
import com.appnutricion.service.ComidaService;
import com.appnutricion.service.RegistroDiarioService;
import com.appnutricion.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


/**
 *Controlador REST para gestion de los registros diarios de consumo de ¡usaurios reggistrados
 *endpoints para consultar registros por usuario y fecha y registrar alimentos consumidos
 */
@RestController
@RequestMapping("/api/registro")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistroDiarioController {

    private final RegistroDiarioService registroService;
    private final UsuarioService usuarioService;
    private final ComidaService comidaService;

    public RegistroDiarioController(RegistroDiarioService registroService, UsuarioService usuarioService, ComidaService comidaService) {
        this.registroService = registroService;
        this.usuarioService = usuarioService;
        this.comidaService = comidaService;
    }

    /**
     *Obtiene todos los registros diarios de un usuario por su id
     * @param usuarioId identificador del usuario
     * @return lista de registros diarios
     */
    @GetMapping("/{usuarioId}")
    public List<RegistroDiario> obtenerPorUsuario(@PathVariable Long usuarioId) {
        return registroService.obtenerPorUsuario(usuarioId);
    }

    /**
     *Obtiene todos los registros diarios de un usuario por su id en una fecha especifica
     * @param usuarioId identificador del usuario
     * @param fecha fecha
     * @return lista de registros diarios para la fecha especifica
     */
    @GetMapping("/{usuarioId}/fecha")
    public List<RegistroDiario> obtenerPorUsuarioYFecha(@PathVariable Long usuarioId, @RequestParam String fecha) {
        LocalDate date = LocalDate.parse(fecha);
        return registroService.obtenerPorUsuarioYFecha(usuarioId, date);
    }

}
