package com.appnutricion.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;


/**
 *Configuración global de CORS para dar acceso enttre el front y el backend
 *Lanza querys desde el origen especificado a los endpoints bajo /api.
 *Agreegado solo por si acaso pero podria no estar mas adelante
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
