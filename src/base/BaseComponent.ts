import { Vue } from 'vue-property-decorator'

export class DialogComponent extends Vue {
  visible: boolean = false

  open (options?: object) {
    this.visible = true
  }

  close () {
    this.visible = false
  }
}
