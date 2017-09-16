import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgSesources = (ir: MdIconRegistry, ds: DomSanitizer) => {
  ir.addSvgIcon('frees', ds.bypassSecurityTrustResourceUrl('assets/优惠券.svg'));     
}