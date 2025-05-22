package com.appnutricion.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

/**
 *Entidad que representa a los RegistrosComida
 *informacion nutricional y de enlace con el usuario y comida
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroComida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;

    private double calorias;
    private double proteinas;
    private double carbohidratos;
    private double grasas;

    private double cantidad;

    private String tipo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "comida_id", nullable = false)
    private Comida comida;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
}
