declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  
  // 命名空间
  declare namespace QC {
    const Login: {
      check: () => boolean
      getMe: (callback: (openId: string) => void) => void
    }
  }