package com.appnutricion.service;

import com.appnutricion.model.Comida;
import com.appnutricion.model.RegistroComida;
import com.appnutricion.model.Usuario;
import com.appnutricion.repository.ComidaRepository;
import com.appnutricion.repository.RegistroComidaRepository;
import com.appnutricion.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 *Servicio encargado de gestionar el registro de comidas de los usuarios
 *calcula los datos nutrimentales con los datos dados
 */
@Service
public class RegistroComidaService {

    private final RegistroComidaRepository repo;
    private final UsuarioRepository usuarioRepo;
    private final ComidaRepository comidaRepo;
    private final UsuarioService usuarioService;


    /**
     *Constructor que inyecta el repositorio de RegistroComida, Uusario y Comidas
     * @param repo instancia del repositorio RegistroComidaRepository
     * @param usuarioRepo instancia del repositorio UsuarioRepository
     * @param comidaRepo instancia del repositorio ComidaRepository
     */
    public RegistroComidaService(RegistroComidaRepository repo, UsuarioRepository usuarioRepo, ComidaRepository comidaRepo, UsuarioService usuarioService) {
        this.repo = repo;
        this.usuarioRepo = usuarioRepo;
        this.comidaRepo = comidaRepo;
        this.usuarioService = usuarioService;
    }


    /**
     *Registra una comida para un usuario se calcula los valores de estos
     *segun el tipo, piezas o gramos y gramos se basa en base 100g
     * @param r objeto RegistroComida con los datos
     * @return RegistroComida guardado con los datos nutricionales y fecha
     */
    public RegistroComida registrar(RegistroComida r) {
        Usuario u = usuarioRepo.findById(r.getUsuario().getId()).orElseThrow();
        Comida c = comidaRepo.findById(r.getComida().getId()).orElseThrow();

        double factor = r.getTipo().equals("gramos") ? r.getCantidad() / 100.0 : r.getCantidad();

        r.setCalorias(c.getCalorias() * factor);
        r.setProteinas(c.getProteinas() * factor);
        r.setCarbohidratos(c.getCarbohidratos() * factor);
        r.setGrasas(c.getGrasas() * factor);
        r.setUsuario(u);
        r.setComida(c);
        r.setFecha(LocalDate.now());

        return repo.save(r);
    }

    /**
     *Obtiene todos los registros de comida de un usuario para una fecha
     * @param usuarioId identificador del usuario
     * @param fecha     fecha a consultar
     * @return lista de registros de comida del dia especifico
     */
    public List<RegistroComida> obtenerPorUsuarioYFecha(Long usuarioId, LocalDate fecha) {
        return repo.findByUsuario_IdAndFecha(usuarioId, fecha);
    }

    /**
     * Elimina un registro de comida por su identificador
     * @param id identificador del registro a eliminar
     */
    public void eliminar(Long id) {
        repo.deleteById(id);
    }



    /**
     *La logica mas granded de la aplicacion
     *Generaa automatizamente una combunancion de desayuno, almuerzo y cena optimizados
     *para aceercarse lo mas posible a los requerimmientos del  usuario (Prroteina y caloria)
     * @param usuarioId identificador del usuario al quie se le genrara la dieta
     * @return lista de RegistroComidas correspondientes a la mejor combinacion encontrada o si no hay, una lista vacia si no hay suficiente comidas
     */
    public List<RegistroComida> generarComidasOptimas(Long usuarioId) {
        Usuario usuario = usuarioRepo.findById(usuarioId).orElseThrow();

        double caloriasMeta = usuarioService.calcularCaloriasRequeridas(usuario);
        double proteinasMeta = usuarioService.calcularProteinasRequeridas(usuario);

        List<Comida> desayunos = comidaRepo.findByTipoPlatillo("desayuno");
        List<Comida> almuerzos = comidaRepo.findByTipoPlatillo("almuerzo");
        List<Comida> cenas = comidaRepo.findByTipoPlatillo("cena");
        List<Comida> snacks = comidaRepo.findByTipoPlatillo("snack");

        //primero se verifica si hay al menos una comida de cada tipo, si no retorna una lista vacia y el mensaje
        if (desayunos.isEmpty() || almuerzos.isEmpty() || cenas.isEmpty()) {
            System.out.println("No hay suficientes comidas para generar una dieta completa.");
            return List.of();
        }

        //Lista para guardar todas las  posibles combinaciones de desayuno, almuerzo y cena
        List<Comida[]> combinaciones = new ArrayList<>();
        for (Comida des : desayunos) {
            for (Comida alm : almuerzos) {
                for (Comida cen : cenas) {
                    combinaciones.add(new Comida[]{des, alm, cen});
                }
            }
        }

        Comida[] mejorCombo = null;
        double menorDif = Double.MAX_VALUE;

        //dentro de todas las combninaciones posibles
        for (Comida[] comida : combinaciones) {
            //se summman clorias y proteinas de las 3 commidas
            double totalCalorias = comida[0].getCalorias() + comida[1].getCalorias() + comida[2].getCalorias();
            double totalProteinas = comida[0].getProteinas() + comida[1].getProteinas() + comida[2].getProteinas();
            // Calcula la diferencia total con al objetivo del usuario
            double dif = Math.abs(caloriasMeta - totalCalorias) + Math.abs(proteinasMeta - totalProteinas);

            // Si la combinacion iterada es de menor diferencia esta se guarda
            if (dif < menorDif) {
                menorDif = dif;
                mejorCombo = comida;
            }
        }

        //Si no se encuedntra una combinacion valida, se rettorna vacvio y el mmensaje
        if (mejorCombo == null) {
            System.out.println("No se encontro una dieta especifica acorde a tus requerimientos.");
            return List.of();
        }

        //Crea y guardar registros de comida para las 3 comidas seleccionadas
        List<RegistroComida> registros = new ArrayList<>();
        double acumCal = 0;
        double acumPro = 0;

        for (Comida comida : mejorCombo) {
            RegistroComida registro = new RegistroComida();
            registro.setUsuario(usuario);
            registro.setComida(comida);
            registro.setCantidad(1);
            registro.setTipo("piezas");
            registro.setFecha(LocalDate.now());
            registro.setCalorias(comida.getCalorias());
            registro.setProteinas(comida.getProteinas());
            registro.setCarbohidratos(comida.getCarbohidratos());
            registro.setGrasas(comida.getGrasas());

            acumCal += comida.getCalorias();
            acumPro += comida.getProteinas();

            registros.add(repo.save(registro));
        }
        //primero se verifica si hay al menos un snack agregado si no pasa
        if (!snacks.isEmpty()) {
            int snacksAgregados = 0;

            //Intentar agregar hasta 2 snacks si aun faltan calorias o proteinas
            while (snacksAgregados < 2) {
                Comida mejorSnack = null;
                double mejorAporte = 0;

                for (Comida snack : snacks) {
                    double nuevaCal = acumCal + snack.getCalorias();
                    double nuevaProt = acumPro + snack.getProteinas();

                    //Calcula mejora si se agregara este snack
                    double difActual = Math.abs(caloriasMeta - acumCal) + Math.abs(proteinasMeta - acumPro);
                    double difNueva = Math.abs(caloriasMeta - nuevaCal) + Math.abs(proteinasMeta - nuevaProt);

                    double mejora = difActual - difNueva;

                    if (mejora > mejorAporte) {
                        mejorAporte = mejora;
                        mejorSnack = snack;
                    }
                }

                //Si ningun snack mejora la dieta, salimos
                if (mejorSnack == null || mejorAporte <= 0) break;

                //Crea y guardar registros de los snacks
                RegistroComida snackRegistro = new RegistroComida();
                snackRegistro.setUsuario(usuario);
                snackRegistro.setComida(mejorSnack);
                snackRegistro.setCantidad(1);
                snackRegistro.setTipo("piezas");
                snackRegistro.setFecha(LocalDate.now());
                snackRegistro.setCalorias(mejorSnack.getCalorias());
                snackRegistro.setProteinas(mejorSnack.getProteinas());
                snackRegistro.setCarbohidratos(mejorSnack.getCarbohidratos());
                snackRegistro.setGrasas(mejorSnack.getGrasas());

                acumCal += mejorSnack.getCalorias();
                acumPro += mejorSnack.getProteinas();

                registros.add(repo.save(snackRegistro));
                snacksAgregados++;
            }
            //Si hay regsitrtos los retorna
        }
        return registros;
    }


}

