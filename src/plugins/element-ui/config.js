import {
  Button,
  Tabs,
  TabPane,
  Steps,
  Step
} from 'element-ui'

export default {
  install (V) {
    V.use(Button)
    V.use(Tabs)
    V.use(TabPane)
    V.use(Steps)
    V.use(Step)
  }
}