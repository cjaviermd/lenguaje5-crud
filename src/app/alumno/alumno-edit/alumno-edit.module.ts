import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlumnoEditPageRoutingModule } from './alumno-edit-routing.module';

import { AlumnoEditPage } from './alumno-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlumnoEditPageRoutingModule
  ],
  declarations: [AlumnoEditPage]
})
export class AlumnoEditPageModule {}
