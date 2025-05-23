package com.appnutricion;

import com.appnutricion.model.Comida;
import com.appnutricion.repository.ComidaRepository;
import com.appnutricion.service.ComidaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 *Junits Tests para el servicio UsuarioService
 *se usa Mockito para simular el repositorio
 */
public class ComidaServiceTest {

    private ComidaRepository repo;
    private ComidaService service;

    /**
     *Configura el entorno antes de cada prueba
     *se iniailizan el repositorio y servicio con mock
     */
    @BeforeEach
    void setUp() {
        repo = mock(ComidaRepository.class);
        service = new ComidaService(repo);
    }

    /**
     *Testea guardar una comidao, auque siempre pasara
     *pasa solo si se guarda correctamente
     */
    @Test
    void testGuardarComida() {
        Comida comida = new Comida(1L, "Atun", "ingrediente", 120, 30, 0, 6.6, "Atun Lata", null, null);
        when(repo.save(comida)).thenReturn(comida);
        assertEquals("Atun", service.guardar(comida).getNombre());
    }

    /**
     *Testea obtenerPorId cuando la comida existe, auque siempre pasara
     *pasa si devuelve un Optional con la comida correcta
     */
    @Test
    void testObtenerPorId() {
        Comida comida = new Comida(1L, "Atun", "ingrediente", 120, 30, 0, 6.6, "Atun Lata", null, null);
        when(repo.findById(1L)).thenReturn(Optional.of(comida));
        assertTrue(service.obtenerPorId(1L).isPresent());
    }
    /**
     *Testea obtenerPorId cuando la comida no existe, auque siempre pasara
     *pasa si devuelve un Optional vacio
     */
    @Test
    public void testObtenerPorIdNoExiste() {
        when(repo.findById(99L)).thenReturn(Optional.empty());
        Optional<Comida> resultado = service.obtenerPorId(99L);

        assertFalse(resultado.isPresent());
    }

    /**
     *Testea elimar, auque siempre pasara
     *pasa si se hace la operacion
     */
    @Test
    void testEliminar() {
        service.eliminar(1L);
        verify(repo).deleteById(1L);
    }
}
