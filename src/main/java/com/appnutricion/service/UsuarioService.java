package com.appnutricion.service;

import com.appnutricion.model.Usuario;
import com.appnutricion.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository repo;

    public UsuarioService(UsuarioRepository repo) {
        this.repo = repo;
    }

    public List<Usuario> obtenerTodos() {
        return repo.findAll();
    }

    public Usuario guardar(Usuario usuario) {
        return repo.save(usuario);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }

    public Usuario actualizar(Long id, Usuario usuarioActualizado) {
        usuarioActualizado.setId(id);
        return repo.save(usuarioActualizado);
    }
}
