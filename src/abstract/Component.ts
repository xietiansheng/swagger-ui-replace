import Application from '@/App.vue'

export class DialogComponent extends Application {
  protected visible: boolean = false

  open (options?: object) {
    this.visible = true
  }

  close () {
    this.visible = false
  }
}
