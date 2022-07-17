import { App } from "vue";
import XtxSkeleton from './skeleton/index.vue'
import XtxCarousel from './carousel/index.vue'
import XtxMore from './more/index.vue'
import XtxBread from './Bread/index.vue'
import XtxBreadItem from './Bread/Item.vue'
import XtxCity from './city/index.vue'
import XtxNumbox from './numbox/index.vue'
import XtxButton from './button/index.vue'
import XtxCheckbox from './checkbox/index.vue'
import XtxMessage from './message/index.vue'
export default {
    install(app:App){
    app.component(XtxSkeleton.name,XtxSkeleton)
    app.component(XtxCarousel.name,XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    app.component(XtxBread.name, XtxBread)
    app.component(XtxBreadItem.name, XtxBreadItem)
    app.component(XtxCity.name, XtxCity)
    app.component(XtxNumbox.name, XtxNumbox)
    app.component(XtxButton.name, XtxButton)
    app.component(XtxCheckbox.name, XtxCheckbox)
    app.component(XtxMessage.name, XtxMessage)
    }
}