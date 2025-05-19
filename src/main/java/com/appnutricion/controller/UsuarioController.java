package com.appnutricion.controller;

import com.appnutricion.model.Usuario;
import com.appnutricion.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de usuarios.
 * Proporciona endpoints para listar, guardar, actualizar y eliminar usuarios.
 */
@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService service;

    /**
     * Constructor para inyectar el servicio de usuarios.
     *
     * @param service instancia de UsuarioService
     */
    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    /**
     * Obtiene la lista completa de usuarios registrados.
     *
     * @return lista de usuarios
     */
    @GetMapping
    public List<Usuario> listar() {
        return service.obtenerTodos();
    }

    /**
     * Guarda un nuevo usuario en el sistema.
     *
     * @param usuario objeto Usuario a guardar
     * @return usuario guardado
     */
    @PostMapping
    public Usuario guardar(@RequestBody Usuario usuario) {
        return service.guardar(usuario);
    }

    /**
     * Actualiza los datos de un usuario existente por su ID.
     *
     * @param id identificador del usuario a actualizar
     * @param usuario datos nuevos del usuario
     * @return usuario actualizado
     */
    @PutMapping("/{id}")
    public Usuario actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return service.actualizar(id, usuario);
    }

    /**
     * Elimina un usuario del sistema por su ID.
     *
     * @param id identificador del usuario a eliminar
     */
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
