package com.appnutricion;

import com.appnutricion.model.Comida;
import com.appnutricion.model.RegistroComida;
import com.appnutricion.model.Usuario;
import com.appnutricion.repository.ComidaRepository;
import com.appnutricion.repository.RegistroComidaRepository;
import com.appnutricion.repository.UsuarioRepository;
import com.appnutricion.service.RegistroComidaService;
import com.appnutricion.service.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 *Junits Tests para el servicio RegistroComidaService
 *se usa Mockito para simular el repositorio
 */
public class RegistroComidaServiceTest {

    private RegistroComidaRepository registroRepo;
    private UsuarioRepository usuarioRepo;
    private ComidaRepository comidaRepo;
    private RegistroComidaService service;
    private UsuarioService usuarioService;


    /**
     *Configura el entorno antes de cada prueba
     *se iniailizan los repositorios y los servicio con mock
     */
    @BeforeEach
    void setUp() {
        registroRepo = mock(RegistroComidaRepository.class);
        usuarioRepo = mock(UsuarioRepository.class);
        comidaRepo = mock(ComidaRepository.class);
        usuarioService = mock(UsuarioService.class);
        service = new RegistroComidaService(registroRepo, usuarioRepo, comidaRepo, usuarioService);
    }

    /**
     *Testea el registro de una comida tipo "ingrediente" usando gramos
     *pasa si los datos nutricionales se calculan vase 100g y que sean correctos
     */
    @Test
    void testRegistrarComidaConGramos() {
        Usuario usuario = new Usuario(1L, "Johan", "Rodriguez", 19, 62.0, 182, Usuario.Meta.GANAR_MUSCULO, Usuario.Sexo.MASCULINO);
        Comida comida = new Comida(1L, "Atun", "ingrediente", 120, 30, 0, 6.6, "Atun Lata", null, "desayuno");
        RegistroComida registro = new RegistroComida();
        registro.setUsuario(usuario);
        registro.setComida(comida);
        registro.setCantidad(150);
        registro.setTipo("gramos");
        when(usuarioRepo.findById(1L)).thenReturn(Optional.of(usuario));
        when(comidaRepo.findById(1L)).thenReturn(Optional.of(comida));
        when(registroRepo.save(any(RegistroComida.class))).thenAnswer(i -> i.getArguments()[0]);

        RegistroComida resultado = service.registrar(registro);

        assertEquals(180, resultado.getCalorias(), 0.001);
        assertEquals(45, resultado.getProteinas(), 0.001);
        assertEquals(0, resultado.getCarbohidratos(), 0.001);
        assertEquals(9.9, resultado.getGrasas(), 0.001);
    }

    /**
     *Testea el registro de una comida tipo "platillo" usando piezas
     *pasa si los datos nutricionales se calculan en base al numero de piezas y que sean correctos
     */
    @Test
    void testRegistrarComidaConPiezas() {
        Usuario usuario = new Usuario(1L, "Johan", "Rodriguez", 19, 62.0, 182, Usuario.Meta.GANAR_MUSCULO, Usuario.Sexo.MASCULINO);
        Comida comida = new Comida(2L, "cereal con leche", "platillo", 250, 8, 42.4, 11.88, "Bowl de cereal con leche", null, "desayuno");
        RegistroComida registro = new RegistroComida();
        registro.setUsuario(usuario);
        registro.setComida(comida);
        registro.setCantidad(2);
        registro.setTipo("piezas");
        when(usuarioRepo.findById(1L)).thenReturn(Optional.of(usuario));
        when(comidaRepo.findById(2L)).thenReturn(Optional.of(comida));
        when(registroRepo.save(any(RegistroComida.class))).thenAnswer(i -> i.getArguments()[0]);

        RegistroComida resultado = service.registrar(registro);

        assertEquals(500, resultado.getCalorias(), 0.001);
        assertEquals(16, resultado.getProteinas(), 0.001);
        assertEquals(84.8, resultado.getCarbohidratos(), 0.001);
        assertEquals(23.76, resultado.getGrasas(), 0.001);
    }

    /**
     *Testea obtenerPorUsuarioYFecha cuando el registgro existe, auque siempre pasara
     *pasa si la lista retornada tenie almenos un elemnto verificando que si sirve
     */
    @Test
    void testObtenerPorUsuarioYFecha() {
        LocalDate hoy = LocalDate.now();
        when(registroRepo.findByUsuario_IdAndFecha(1L, hoy)).thenReturn(List.of(new RegistroComida()));
        List<RegistroComida> registros = service.obtenerPorUsuarioYFecha(1L, hoy);
        assertEquals(1, registros.size());
    }
}