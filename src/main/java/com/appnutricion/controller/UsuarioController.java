package com.appnutricion.controller;

import com.appnutricion.model.Usuario;
import com.appnutricion.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *Controlador REST para gestion de usuarios
 *endpoints para consultar, crear, actualizar y eliminar usarios
 */
@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    /**
     *Obtiene la lista completa de usarios registrados
     * @return lista de objetos Usario
     */
    @GetMapping
    public List<Usuario> listar() {
        return service.obtenerTodos();
    }

    /**
     *Obtiene un usuario por su id
     * @param id identificador del usuario
     * @return ResponseEntity con el usuario encontrado o 404 si no existe
     */
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    /**
     *Guarda un nueevo usuario en la base de datos
     * @param usuario objeto Usuario recibido desde el input frontend
     * @return objeto Usuario guardado
     */
    @PostMapping
    public Usuario guardar(@RequestBody Usuario usuario) {
        return service.guardar(usuario);
    }

    /**
     *Elimina un usuario existente por su id
     * @param id identificador del usuario a eliminar
     */
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }

    /**
     *Actualiza un usuario existente por su id
     * @param id identificador del usuario a actualizar
     * @param usuario objeto Usuario con los nuevos datos
     * @return objeto Usuario actualizado
     */
    @PutMapping("/{id}")
    public Usuario actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return service.actualizar(id, usuario);
    }

}
