package com.appnutricion.service;

import com.appnutricion.model.Comida;
import com.appnutricion.model.RegistroComida;
import com.appnutricion.model.Usuario;
import com.appnutricion.repository.ComidaRepository;
import com.appnutricion.repository.RegistroComidaRepository;
import com.appnutricion.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 *Servicio encargado de gestionar el registro de comidas de los usuarios
 *calcula los datos nutrimentales con los datos dados
 */
@Service
public class RegistroComidaService {

    private final RegistroComidaRepository repo;
    private final UsuarioRepository usuarioRepo;
    private final ComidaRepository comidaRepo;

    /**
     *Constructor que inyecta el repositorio de RegistroComida, Uusario y Comidas
     * @param repo instancia del repositorio RegistroComidaRepository
     * @param usuarioRepo instancia del repositorio UsuarioRepository
     * @param comidaRepo instancia del repositorio ComidaRepository
     */
    public RegistroComidaService(RegistroComidaRepository repo, UsuarioRepository usuarioRepo, ComidaRepository comidaRepo) {
        this.repo = repo;
        this.usuarioRepo = usuarioRepo;
        this.comidaRepo = comidaRepo;
    }


    /**
     *Registra una comida para un usuario se calcula los valores de estos
     *segun el tipo, piezas o gramos y gramos se basa en base 100g
     * @param r objeto RegistroComida con los datos
     * @return RegistroComida guardado con los datos nutricionales y fecha
     */
    public RegistroComida registrar(RegistroComida r) {
        Usuario u = usuarioRepo.findById(r.getUsuario().getId()).orElseThrow();
        Comida c = comidaRepo.findById(r.getComida().getId()).orElseThrow();

        double factor = r.getTipo().equals("gramos") ? r.getCantidad() / 100.0 : r.getCantidad();

        r.setCalorias(c.getCalorias() * factor);
        r.setProteinas(c.getProteinas() * factor);
        r.setCarbohidratos(c.getCarbohidratos() * factor);
        r.setGrasas(c.getGrasas() * factor);
        r.setUsuario(u);
        r.setComida(c);
        r.setFecha(LocalDate.now());

        return repo.save(r);
    }

    /**
     *Obtiene todos los registros de comida de un usuario para una fecha
     * @param usuarioId identificador del usuario
     * @param fecha     fecha a consultar
     * @return lista de registros de comida del dia especifico
     */
    public List<RegistroComida> obtenerPorUsuarioYFecha(Long usuarioId, LocalDate fecha) {
        return repo.findByUsuario_IdAndFecha(usuarioId, fecha);
    }

    /**
     * Elimina un registro de comida por su identificador
     * @param id identificador del registro a eliminar
     */
    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}

