import { Component, OnInit } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.page.html',
  styleUrls: ['./alumno-list.page.scss'],
})
export class AlumnoListPage implements OnInit {
  listaAlumnos: any[] = [];
  listaAlumnosFiltrados: any[] = [];
  constructor(private readonly firestore: Firestore, 
   private rt: Router

  ) { }

  ngOnInit() {
    this.listarAlumnos();
  }
  listarAlumnos= () => {
     console.log("listar alumnos");
     const alumnosRef = collection(this.firestore,'alumno');
     collectionData(alumnosRef,{idField: 'id'}). subscribe(respuesta=>{
      console.log("estos son los alumnos", respuesta);
      this.listaAlumnos= respuesta;
      this.listaAlumnosFiltrados= this.listaAlumnos;
     })

  }
  nuevo= () => {
    this.rt.navigate(['/alumno-edit'])

  }
  eliminarAlumno = (id: string) => {
    console.log('aqui eliminar en firebase');
    const document = doc(this.firestore, 'alumno', id);

    deleteDoc(document).then(() => {
      console.log('registro eliminado');
      //this.volver();
    }).catch((error) => {
      console.error("Error al eliminar el documento: ", error);
    });

  }
  filterItems(event: any) {
    const searchTerm = event.detail.value;

    if (searchTerm && searchTerm.trim() != '') {
      this.listaAlumnosFiltrados = this.listaAlumnos.filter((item) => {
        // Asegurarse de que el ítem, nombre y apellido existen, proporcionando valores predeterminados para evitar errores
        const codigo = item.codigo ? item.codigo.toLowerCase() : '';
        const nombre = item.nombre ? item.nombre.toLowerCase() : '';
        const apellido = item.apellido ? item.apellido.toLowerCase() : '';
        const searchTermLower = searchTerm.toLowerCase();

        // Comprobar si el término de búsqueda está incluido en el nombre o el apellido
        return codigo.includes(searchTermLower) || nombre.includes(searchTermLower) || apellido.includes(searchTermLower);
      });
    } else {
      this.listaAlumnosFiltrados = this.listaAlumnos;
    }
  }




}
