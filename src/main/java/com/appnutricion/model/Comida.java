package com.appnutricion.model;

import jakarta.persistence.*;
import lombok.*;

/**
 *Entidad que representa a la comida
 *informacion nutricional y de presentacion
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comida {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String tipo;
    private double calorias;
    private double proteinas;
    private double carbohidratos;
    private double grasas;
    private String descripcion;
    @Column(name = "imagen_url")
    private String imagenUrl;

}
