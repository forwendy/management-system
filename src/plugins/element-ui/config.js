import { 
  Icon,
  Badge,
  Link,
  Scrollbar,
  Tooltip,

  Image,
  Carousel,
  CarouselItem,
  Tree,
  Table,
  TableColumn,
  Pagination,
  Dialog,

  Form, 
  FormItem,
  Input,
  Select,
  Option,
  OptionGroup,
  Cascader,
  Button,

  Tabs,
  TabPane,

  Dropdown,
  DropdownMenu,
  DropdownItem,

  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,

  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

export default {
  install(V) {

    V.use(Icon)
    V.use(Badge)
    V.use(Link)
    V.use(Scrollbar)
    V.use(Tooltip)

    V.use(Image)
    V.use(Carousel)
    V.use(CarouselItem)
    V.use(Tree)
    V.use(Table)
    V.use(TableColumn)
    V.use(Pagination)
    V.use(Dialog)

    V.use(Form)
    V.use(FormItem)
    V.use(Input)
    V.use(Select)
    V.use(Option)
    V.use(OptionGroup)
    V.use(Cascader)
    V.use(Button)

    V.use(Tabs)
    V.use(TabPane)

    V.use(Dropdown)
    V.use(DropdownMenu)
    V.use(DropdownItem)

    V.use(Menu)
    V.use(Submenu)
    V.use(MenuItem)
    V.use(MenuItemGroup)

    V.use(Loading.directive)
    V.prototype.$loading = Loading.service
    V.prototype.$msgbox = MessageBox
    V.prototype.$alert = MessageBox.alert
    V.prototype.$confirm = MessageBox.confirm
    V.prototype.$prompt = MessageBox.prompt
    V.prototype.$message = Message
    V.prototype.$notify = Notification
  }
}
