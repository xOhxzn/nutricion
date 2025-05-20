package com.appnutricion.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

/**
 *Entidad que representa los RegistrosDiarios de consumo de un usuario
 *informacion de datos nutrimentales
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroDiario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;

    private double calorias;
    private double proteinas;
    private double carbohidratos;
    private double grasas;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public double getCalorias() {
        return calorias;
    }
    public void setCalorias(double calorias) {
        this.calorias = calorias;
    }

    public double getProteinas() {
        return proteinas;
    }
    public void setProteinas(double proteinas) {
        this.proteinas = proteinas;
    }

    public double getCarbohidratos() {
        return carbohidratos;
    }
    public void setCarbohidratos(double carbohidratos) {
        this.carbohidratos = carbohidratos;
    }

    public double getGrasas() {
        return grasas;

    }
    public void setGrasas(double grasas) {
        this.grasas = grasas;
    }

}
