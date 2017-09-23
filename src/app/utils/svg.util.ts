import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgSesources = (ir: MdIconRegistry, ds: DomSanitizer) => {
  const imgDir = 'assets/img';
  const sidebarDir = `${imgDir}/sidebar`;
  const dayDir = `${imgDir}/days`;
  const avatarDir = `${imgDir}/avatar`;
  const iconrDir = `${imgDir}/icons`;
  ir.addSvgIcon('day', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`));     
  ir.addSvgIcon('month', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`));     
  ir.addSvgIcon('project', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`));     
  ir.addSvgIcon('projects', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`));     
  ir.addSvgIcon('week', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`));    
  ir.addSvgIcon('move', ds.bypassSecurityTrustResourceUrl(`${iconrDir}/move.svg`));    
  ir.addSvgIcon('add', ds.bypassSecurityTrustResourceUrl(`${iconrDir}/add.svg`));    
  ir.addSvgIcon('delete', ds.bypassSecurityTrustResourceUrl(`${iconrDir}/delete.svg`));    
  for(var i = 1; i <= 31; i++) {
    ir.addSvgIcon(`day${i}`, ds.bypassSecurityTrustResourceUrl(`${dayDir}/day${i}.svg`)); 
  } 
  ir.addSvgIconSetInNamespace('avatars', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));    
  ir.addSvgIconSetInNamespace('unassigned', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/unassigned.svg`));    
  
}