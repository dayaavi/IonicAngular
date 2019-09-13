import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
// Aqui agregamos el AlertControler porq aqui esta el botón
  constructor( public deseosServices: DeseosService,
               private router: Router,
               private alertCtrl: AlertController ) {
  // Para probarlo llamamos aqui al metodo y colocamos un . esto nos
  // arroja todos los metodos usados en las promesas  q son catch, finally y then
                // this.agregarLista().    // esto es basicamente lo q hace el async, transforma todo el metodo o función en una promesa.
}

  // Aqui usamos el async q esparceido a una promesa, aqui le indicamos q espere a q todo el codigo seguido del await se ejecute
  // y luego se guarde en la variable alert, para poder usar el await se debe colocar antes del nombre del metodo

  async agregarLista() {
    // esta ruta la ubico en tabs > tabs.router.module.ts
    // this.router.navigateByUrl('/tabs/tab1/agregar');
    // Aqui llamamos al método, comentamos el router por q no queremos q nos lleve a otra pagina, sino q nos muestre esa alerta
    // Ahora para transformar esta alerta en un promp lo unico q
    // tenemos q hacer es agregar los inputs e indicar q hara al presionar algunos botones.

    const alert = await this.alertCtrl.create({
      header: 'Nueva Lista',
      inputs: [{
            name: 'titulo', // Aqui se debe hacer una validación
            type: 'text',
            placeholder: 'Nombre de la lista'
      }],
      buttons: [
        {
        text: 'Cancelar',
        role: 'cancel',
        // el handler es una funcion q se va ejecutara cuando este boton se toque o cuando la alerta se cierre
        handler: () => {
          console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          // Aqui recibiremos la data
          handler: ( data ) => {
            console.log( data );
            // Aqui ejecutamos solo si la data.titulos.length es igual a 0
            // sino viene vacio, es decir sino retorna un 0 debemos crear la lista
            //  el metodo para crear la lista debe estar centralizado en servicios.

            if ( data.titulo.length === 0 ) {
              return;
            }
            // Esta funcion me trae el listaId
            const listaId =  this.deseosServices.crearLista( data.titulo );
            // Tengo que crear la lista
            // Esta listaId la debemos enviar como parte de este argumento
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
            // console.log(listaId);
          }
        }
      ]
    });
    alert.present();
  }

  listaSeleccionada( lista1: Lista ) {

    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista1.id}`);

    // console.log(lista1);

  }

}
