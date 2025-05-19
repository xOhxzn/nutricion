package com.appnutricion.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Representa ak usuario con sus datos físicos y objetivo nutricional
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellido;
    private int edad;
    private double peso;
    private double altura;

    @Enumerated(EnumType.STRING)
    private Meta meta;

    public enum Meta {
        GANAR_MUSCULO, BAJAR_PESO, GANAR_PESO, MANTENERSE
    }
}
