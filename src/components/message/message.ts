import { h, render } from 'vue'
import XtxMessage from '@/components/message/index.vue'
type Props = {
  type: 'success' | 'error' | 'warning'
  text: string
  duration?:number
}

export default function Message({ type, text ,duration}: Props) {
    const div = document.createElement('div')
    div.setAttribute('class', 'xtx-message-container')
    document.body.appendChild(div)
    const vNode = h(XtxMessage, { type, text })
    render(vNode, div)
    setTimeout(() => {
    // 删除虚拟DOM
    render(null, div)
  }, duration)
}
Message.success = function(text: string, duration: number = 2000) {
    Message({
      type: 'success',
      text,
      duration
    })
  }
  
  Message.error = function(text: string, duration: number = 2000) {
    Message({
      type: 'error',
      text,
      duration
    })
  }
  
  Message.warning = function(text: string, duration: number = 2000) {
    Message({
      type: 'warning',
      text,
      duration
    })
  }