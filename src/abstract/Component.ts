import App from '@/App.vue'

export class DialogComponent<T, U> extends App {
  protected visible: boolean = false

  open (options?: object) {
    this.visible = true
  }

  close () {
    this.visible = false
  }
}
