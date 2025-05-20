package com.appnutricion.service;

import com.appnutricion.model.Usuario;
import com.appnutricion.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 *Servicio encargado de la logica del programa Usuarios
 *metodos para obtener, guardar, actualizar y eliminar registros
 */
@Service
public class UsuarioService {

    private final UsuarioRepository repo;

    public UsuarioService(UsuarioRepository repo) {
        this.repo = repo;
    }

    /**
     *Retorna una lista con todos los usuarios registrados
     * @return lista de objetos Usuario
     */
    public List<Usuario> obtenerTodos() {
        return repo.findAll();
    }

    /**
     *Busca un usuario por su id
     * @param id identificador del usuario
     * @return objeto Optional que contiene un Usuario o puede contenerlo
     */
    public Optional<Usuario> obtenerPorId(Long id) {
        return repo.findById(id);
    }

    /**
     *Guarda un nuevo usuario en la base de datos
     * @param usuario objeto Usuario a guardar
     * @return usuario guardado
     */
    public Usuario guardar(Usuario usuario) {
        return repo.save(usuario);
    }

    /**
     *Elimina un usuario por su id
     * @param id identificador del usuario a eliminar
     */
    public void eliminar(Long id) {
        repo.deleteById(id);
    }
    /**
     *Actualiza los datos de un usuario registrado
     * @param id identificador del usuario a actualizar
     * @param usuarioActualizado datos actualizados
     * @return un objeto Usuario actualizado
     */
    public Usuario actualizar(Long id, Usuario usuarioActualizado) {
        usuarioActualizado.setId(id);
        return repo.save(usuarioActualizado);
    }
}
