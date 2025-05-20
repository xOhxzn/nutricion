package com.appnutricion.model;

import jakarta.persistence.*;
import lombok.*;

/**
 *Entidad que representa al Usuario
 *informacion de datos fisicos y metta
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
