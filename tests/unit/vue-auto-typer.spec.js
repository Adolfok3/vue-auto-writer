import { shallowMount } from '@vue/test-utils';
import VueAutoWriter from '../../src/components/VueAutoWriter.vue';

describe('VueAutoWriter', () => {

  it('create VueAutoWriter should have baseText value and default props values', () => {
    const wrapper = shallowMount(VueAutoWriter, {
      propsData: {
        baseText: 'Hello World'
      }
    });
    expect(wrapper.vm.$props.baseText).toEqual('Hello World');
    expect(wrapper.vm.$props.texts).toEqual([]);
    expect(wrapper.vm.$props.delayOnWriter).toEqual(100);
    expect(wrapper.vm.$props.delayOnStart).toEqual(1500);
    expect(wrapper.vm.$props.delayBetweenTexts).toEqual(1500);
    expect(wrapper.vm.$props.cursorSize).toEqual(30);
    expect(wrapper.vm.$props.cursorBlinkSpeed).toEqual(2);
    expect(wrapper.vm.$props.cursorColor).toEqual('#000000');
    expect(wrapper.vm.$props.disableCursorBlink).toEqual(false);
    expect(wrapper.vm.$props.infinite).toEqual(false);
  })

  it('create VueAutoWriter with custom props should pass props values', () => {
    const wrapper = shallowMount(VueAutoWriter, {
      propsData: {
        baseText: 'Hello Other World',
        texts: [
          {
            value: 'Other text',
            style: 'color: blue;'
          }
        ],
        delayOnWriter: 50,
        delayOnStart: 50,
        delayBetweenTexts: 50,
        cursorSize: 50,
        cursorBlinkSpeed: 1,
        cursorColor: 'red',
        disableCursorBlink: true,
        infinite: true,
      }
    });
    expect(wrapper.vm.$props.baseText).toEqual('Hello Other World');
    expect(wrapper.vm.$props.texts[0].value).toEqual('Other text');
    expect(wrapper.vm.$props.texts[0].style).toEqual('color: blue;');
    expect(wrapper.vm.$props.delayOnWriter).toEqual(50);
    expect(wrapper.vm.$props.delayOnStart).toEqual(50);
    expect(wrapper.vm.$props.delayBetweenTexts).toEqual(50);
    expect(wrapper.vm.$props.cursorSize).toEqual(50);
    expect(wrapper.vm.$props.cursorBlinkSpeed).toEqual(1);
    expect(wrapper.vm.$props.cursorColor).toEqual('red');
    expect(wrapper.vm.$props.disableCursorBlink).toEqual(true);
    expect(wrapper.vm.$props.infinite).toEqual(true);
  })

  it('create VueAutoWriter with infinite should write on data property actualBaseText and clear it', () => {
    jest.useFakeTimers()

    const wrapper = shallowMount(VueAutoWriter, {
      propsData: {
        baseText: 'Hello World',
        delayOnWriter: 100,
        delayOnStart: 1000,
        delayBetweenTexts: 0,
        infinite: true
      }
    });
    
    jest.advanceTimersByTime(5000)
    expect(wrapper.vm.$data.actualBaseText).toEqual('Hello World')
    jest.advanceTimersByTime(600)
    expect(wrapper.vm.$data.actualBaseText).toEqual('')
  })

  it('create VueAutoWriter with baseText should write on data property actualBaseText', () => {
    jest.useFakeTimers()

    const wrapper = shallowMount(VueAutoWriter, {
      propsData: {
        baseText: 'Hello World',
        delayOnWriter: 0,
        delayOnStart: 0,
        delayBetweenTexts: 0,
      }
    });
    
    jest.advanceTimersByTime(1000)
    expect(wrapper.vm.$data.actualBaseText).toEqual('Hello World')
  })

  it('create VueAutoWriter with baseText and texts should write every one on data property actualText', () => {
    jest.useFakeTimers()

    const wrapper = shallowMount(VueAutoWriter, {
      propsData: {
        baseText: 'Hello World',
        delayOnWriter: 0,
        delayOnStart: 0,
        delayBetweenTexts: 2000,
        texts: [
          {
            value: 'First Text'
          },
          {
            value: 'Last Text'
          }
        ]
      }
    });
    
    jest.advanceTimersByTime(2000)
    expect(wrapper.vm.$data.actualText).toEqual('First Text')
    jest.advanceTimersByTime(2000)
    expect(wrapper.vm.$data.actualText).toEqual('Last Text')
    jest.advanceTimersByTime(2000)
    expect(wrapper.vm.$data.actualText).toEqual('First Text')
  })
});