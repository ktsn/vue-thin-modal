import { mount, createLocalVue } from '@vue/test-utils'
import { render } from '@vue/server-test-utils'
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

      data() {
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

  it('closes modal on clicking backdrop', async () => {
    const localVue = createLocalVue()
    localVue.use(VueThinModal, {
      autoMountPortal: false
    })

    const App = {
      template: `<div>
        <modal name="test">
          <p>content</p>
        </modal>
        <modal-portal />
      </div>`
    }

    const wrapper = mount(App, { localVue })
    wrapper.vm.$modal.push('test')

    await wrapper.vm.$nextTick()

    wrapper.find('.modal-content-wrapper').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$modal.currentName).toBe(undefined)
  })

  it('disables to close modal on clicking backdrop', async () => {
    const localVue = createLocalVue()
    localVue.use(VueThinModal, {
      autoMountPortal: false
    })

    const App = {
      template: `<div>
        <modal name="test" disable-backdrop>
          <p>content</p>
        </modal>
        <modal-portal />
      </div>`
    }

    const wrapper = mount(App, { localVue })
    wrapper.vm.$modal.push('test')

    await wrapper.vm.$nextTick()

    wrapper.find('.modal-content-wrapper').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$modal.currentName).toBe('test')
  })

  describe('SSR', () => {
    const localVue = createLocalVue()
    localVue.use(VueThinModal, {
      autoMountPortal: false
    })

    it('not throws when render modal-portal in multiple times', () => {
      const App = {
        template: `<div>
          <modal name="test">
            <p>Hi</p>
          </modal>
          <modal-portal />
        </div>`
      }

      expect(() => {
        render(App, { localVue })
      }).not.toThrow()

      expect(() => {
        render(App, { localVue })
      }).not.toThrow()
    })
  })
})
