import { mount, createLocalVue } from '@vue/test-utils'
import VueThinModal from '../src'

describe('Modal', () => {
  it('allows to manually mount modal portal when autoMountPortal: false', async () => {
    const localVue = createLocalVue()
    localVue.use(VueThinModal, {
      autoMountPortal: false
    })

    const App = {
      template: `<div>
        <modal name="test">
          <p>{{ message }}</p>
        </modal>
        <modal-portal />
      </div>`,

      data () {
        return {
          message: 'Hello!'
        }
      }
    }

    const wrapper = mount(App, { localVue })
    wrapper.vm.$modal.push('test')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
