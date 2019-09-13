import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];
  constructor() {

    this.cargarStorage();

    // console.log('Servicio inicializado');
    // const lista1 = new Lista('Recolectar piedras del infinito');
    // const lista2 = new Lista('Heroes a desaparecer');

    // this.listas.push(lista1, lista2);
    // console.log(this.listas);

  }

// Aqui deberia recibir el litulo de la lista, q seria el producto de la alerta q mostramos al usuario
// llamaremos a este metodo cuando tengamos la data
  crearLista( titulo: string ) {
    const nuevaLista = new Lista(titulo); // aqui recibe el titulo por el argumento
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  // Como ahora necesitamos obtener toda la lista dependeindo del id de la lista hacemos esta funcion
  obtenerLista( id: string | number ) {
    id = Number(id);
    return this.listas.find( listaData => {
    return listaData.id === id;
    });

  }

 // Este tambien necesita saber si hay inf en el local Storage y si la hay mostrarla.
 // cuando hagamos una modificación que deberia ser guardada fisicamente en el dispositivo, entonces utilizaremos est metodo.
 // Con el key y value que enviamos es para guardar en el local store
 // Con este metodo guardamos de forma persistente la informacion del objeto o variable
 guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  //  Este metos se utilizara cuando la app  se recarga por 1era vez,
  // Necesitamos saber si hay inf en el Storage y mostrarla
  // Aqui indicamos q listas ahora sera lo q esta guardaddo en el local store y se debe mostrar
  // Creamos una condicion en caso q el local este vacio generara un error con el JSON y devolvera un null, por lo q cambiamos
  // E indicamos q si esta vacio envie el arreglo listas en un arreglo vavio.
  cargarStorage() {

    if ( localStorage.getItem('data') ) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    } else {
      this.listas = [];
    }
  }

}
