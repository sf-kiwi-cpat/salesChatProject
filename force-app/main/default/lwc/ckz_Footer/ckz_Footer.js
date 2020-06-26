import { LightningElement, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

import fontawesome_pro_581_web from '@salesforce/resourceUrl/fontawesome_pro_581_web';

export default class Ckz_Footer_lwc extends LightningElement {

    @api showImage =false;
    @api imgUrl ='';
    @api imgHeight = '';
    @api backgroundColor;
    @api borderColor;
    @api textColor;
    @api socialFacebook;
    @api socialTwitter;
    @api socialLinkedin;


    get footerStyles() {
        return `background-color:${this.backgroundColor};border-color:${this.borderColor};color:${this.textColor};`;
    }

    get imageStyles(){
        return `height:${this.imgHeight};`;
    }

    connectedCallback() {
        loadStyle(this, fontawesome_pro_581_web + '/css/all.css')
      }

}