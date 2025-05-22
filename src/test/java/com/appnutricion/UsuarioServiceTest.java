package com.appnutricion;

import com.appnutricion.model.Usuario;
import com.appnutricion.repository.UsuarioRepository;
import com.appnutricion.service.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 *Junits Tests para el servicio UsuarioService
 *se usa Mockito para simular el repositorio
 */
public class UsuarioServiceTest {

    private UsuarioRepository usuarioRepository;
    private UsuarioService usuarioService;

    /**
     *Configura el entorno antes de cada prueba
     *se iniailizan el repositorio y servicio con mock
     */
    @BeforeEach
    public void setUp() {
        usuarioRepository = mock(UsuarioRepository.class);
        usuarioService = new UsuarioService(usuarioRepository);
    }

    /**
     *Testea guardar un usuario, auque siempre pasara
     *pasa solo si se guarda correctamente
     */
    @Test
    public void testGuardarUsuario() {
        Usuario usuario = new Usuario(1L, "Johan", "Rodriguez", 19, 62.0, 182, Usuario.Meta.GANAR_MUSCULO, Usuario.Sexo.MASCULINO);
        when(usuarioRepository.save(usuario)).thenReturn(usuario);

        Usuario guardado = usuarioService.guardar(usuario);

        assertEquals("Johan", guardado.getNombre());
        assertEquals(Usuario.Meta.GANAR_MUSCULO, guardado.getMeta());
    }

    /**
     *Testea obtenerPorId cuando el usuario existe, auque siempre pasara
     *pasa si devuelve un Optional con el usuario correcto
     */
    @Test
    public void testObtenerPorId() {
        Usuario usuario = new Usuario(1L, "Johan", "Rodriguez", 19, 62.0, 182, Usuario.Meta.GANAR_MUSCULO, Usuario.Sexo.MASCULINO);
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));

        Optional<Usuario> resultado = usuarioService.obtenerPorId(1L);

        assertTrue(resultado.isPresent());
        assertEquals("Johan", resultado.get().getNombre());
    }

    /**
     *Testea el calculo de calorias para un hombre con meta GANAR_MUSCULO
     *pasa solo si aplica correctamente el +500 kcal y la formula
     */
    @Test
    public void testCaloriasHombre() {
        usuarioService = new UsuarioService(null);
        Usuario usuario = new Usuario(1L, "Johan", "Rodriguez", 19, 62.0, 182, Usuario.Meta.GANAR_MUSCULO, Usuario.Sexo.MASCULINO);
        double res = usuarioService.calcularCaloriasRequeridas(usuario);
        double esp = (10 * 62) + (6.25 * 182) - (5 * 19) + 5 + 500;
        assertEquals(esp, res, 0.001);
    }

    /**
     *Testea el calculo de calorias para una mujer con meta BAJAR_PESO
     *pasa solo si aplica correctamente el -500 kcal y la formula
     */
    @Test
    public void testCaloriasMujer() {
        usuarioService = new UsuarioService(null);
        Usuario usuario = new Usuario(1L, "Johana", "Rodriguez", 19, 48.0, 161, Usuario.Meta.BAJAR_PESO, Usuario.Sexo.FEMENINO);
        double res = usuarioService.calcularCaloriasRequeridas(usuario);
        double esp = (10 * 48) + (6.25 * 161) - (5 * 19) - 161 - 500;
        assertEquals(esp, res, 0.001);
    }

    /**
     *Testea el calculo de proteinas para una hombre con meta GANAR_MUSCULO
     *pasa solo si se multtiplica 2.0 por cada kg
     */
    @Test
    public void testProteina() {
        usuarioService = new UsuarioService(null);
        Usuario usuario = new Usuario(1L, "Johan", "Rodriguez", 19, 62.0, 182, Usuario.Meta.GANAR_MUSCULO, Usuario.Sexo.MASCULINO);
        double res = usuarioService.calcularProteinasRequeridas(usuario);
        double esp = 62 * 2.0;
        assertEquals(esp, res, 0.001);
    }
}
