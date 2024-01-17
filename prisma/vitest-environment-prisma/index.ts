import { type Environment } from 'vitest'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup () {
    console.log('setup')

    return {
      teardown () {
        console.log('teardown')
      }
    }
  }
}
