import { Component, OnInit } from '@angular/core';
import { collection,addDoc, updateDoc, doc, Firestore, getDoc,  } 
from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-alumno-edit',
  templateUrl: './alumno-edit.page.html',
  styleUrls: ['./alumno-edit.page.scss'],
})
export class AlumnoEditPage implements OnInit {
 alumno: any=[];
 id: any;
  constructor(private readonly firestore: Firestore,
    private rt: Router,
    private route:ActivatedRoute
  ) { }
 
  ngOnInit() {
   // this.incluirAlumno();
    //this.editarAlumno("2BpFVjd1yuhQwrWbRrk2");
    this.route.params.subscribe((params: any) => {
      //console.log('params', params);
      this.id = params.id;
      //console.log('id', this.id);
      if (this.id) {
        this.obtenerAlumno(this.id);
      }

    });
  }
  incluirAlumno = () =>{
    console.log("aqui incluir en firebase");
    let alumnosRef= collection(this.firestore,"alumno");

    addDoc(alumnosRef,{
      codigo: this.alumno.codigo,
      nombre: this.alumno.nombre,
      apellido: this.alumno.apellido

    }).then(doc =>{
        console.log("Registro incluido");
    })
  }
  editarAlumno = (id: string) =>{
    console.log("aqui editar en firebase");
    const document= doc(this.firestore,"alumno", id);

    updateDoc(document,{
      codigo: this.alumno.codigo,

      nombre: this.alumno.nombre,
      apellido: this.alumno.apellido

    }).then(doc =>{
        console.log("Registro modificado");
    })
  }
  accion = (id: string) => {
    if (this.id) {
      //console.log("modificar");
      this.editarAlumno(this.id);
    
    } else {
      //console.log("guardar");
      this.incluirAlumno();

    }
    this.volver();

  }
  volver= () => {
    this.rt.navigate(['/alumno-list'])

  }
  obtenerAlumno = (id: string) => {

    const document = doc(this.firestore, 'alumno', id);

    getDoc(document).then(doc => {
      console.log('registro a editar', doc.data());
      this.alumno = doc.data();
    }
    );
  }
}
