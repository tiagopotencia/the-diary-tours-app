import {Page, NavController} from 'ionic-angular';
import {HomePage} from '../home/home';

@Page({
  templateUrl: 'build/pages/intro/intro.html'
})
export class IntroPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav){
    this.nav = nav;
    this.showSkipButton = true;
  }

  onSlideChanged(event){
    if(event.isEnd){
      this.showSkipButton = false;
    } else {
      this.showSkipButton = true;
    }
  }

  goToHome(){
    this.nav.setRoot(HomePage);
  }
}
