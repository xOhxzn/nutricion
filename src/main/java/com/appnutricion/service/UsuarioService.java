package com.appnutricion.service;

import com.appnutricion.model.Usuario;
import com.appnutricion.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import com.appnutricion.model.Usuario.Sexo;


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

    /**
     *Una de los metodos logicos de toda la aplicacion
     *este caalcula el requerimiento calorico diario estimado para un usuario
     *utilizando una fórmula revisada de Harris-Benedict por Mifflin y St Jeor (1990) es la que se suele utilizar actualmente para mantenerse
     *Ecuaciones:
     * -Hombres	TMB (kcal) = (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
     * -Mujeres	TMB (kcal) = (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
     *y segun la meta indicada esta se ajusta asi
     * -GANAR_MUSCULO: +500 kcal
     * -BAJAR_PESO: −500 kcal
     * -MANTENERSE/GANAR_PESO: sin ajuste
     *
     * https://es.wikipedia.org/wiki/Ecuaci%C3%B3n_de_Harris-Benedict
     * @param u objeto Usuario con edad, peso, altura, sexo y meta
     * @return cantidad estimada de calorIas diariaas recomendadas
     */
    public double calcularCaloriasRequeridas(Usuario u) {
        double caloriasReq = 10 * u.getPeso() + 6.25 * u.getAltura() - 5 * u.getEdad(); //Las ecuaciones de Harris-Benedict revisadas por Mifflin y St Jeor en 1990

        if (u.getSexo() == Sexo.MASCULINO) {
            caloriasReq += 5;
        } else {
            caloriasReq -= 161;
        }

        return switch (u.getMeta()) {
            case GANAR_MUSCULO -> caloriasReq + 500;
            case BAJAR_PESO -> caloriasReq - 500;
            case GANAR_PESO -> caloriasReq + 200;
            default -> caloriasReq; //MANTENERSE
        };
    }

    /**
     *Otro de los metodos logicos de toda la aplicacion
     *este caalcula el requerimiento de proteina diario estimado para un usuario
     *no fue sacado de una fuente como tal pero haciendo las busquedas de cada meta
     * - GANAR_MUSCULO: 2.0 g por kg, si queremos aumentar el mussulo mas de eso esta bien pero no afecta
     * - BAJAR_PESO: 1.8 g por kg, tomando en cuenta que queremos tener la misma masa muscular y no tener perdidas
     * - GANAR_PESO: 1.6 g por kg, tomando en c uenta que solo queremos ganar peso no tanto musculo
     * - MANTENERSE: 1.5 g por  kg, es el standar para cada persona que no hace actividad fisica
     *
     * @param u objeto Usuario con edad, peso, altura, sexo y meta
     * @return cantidad estimada de cpropteina diaria recomendada
     */
    public double calcularProteinasRequeridas(Usuario u) {
        double ProteinaReq;

        String meta = String.valueOf(u.getMeta());

        if ("GANAR_MUSCULO".equalsIgnoreCase(meta)) return u.getPeso() * 2.0;
        else
            if ("BAJAR_PESO".equalsIgnoreCase(meta)) return u.getPeso() * 1.8;
        else
            if ("GANAR_PESO".equalsIgnoreCase(meta)) return u.getPeso() * 1.6;
        else return u.getPeso() * 1.5; //MANTENERSE

    }


}
