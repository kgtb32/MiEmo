import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Todo from '../components/Widgets/Todo/Todo'
import { act } from 'react-dom/test-utils'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

let container = null
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div')
	document.body.appendChild(container)
	act(() => {
		render(<Todo />, container)
	})
	configure({ adapter: new Adapter() })
})

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container)
	container.remove()
	container = null
})

describe('rendering test', () => {
	// verify that the Todo HTML has not changed between git merges
	it('It should match the snapshot HTML for Todo', () => {
		const container = shallow(<Todo />)
		expect(container.html()).toMatchSnapshot()
	})

	it('It should contain all static text when firts render', () => {
		expect(container.textContent).toContain('Nom de la Tâche')
		expect(container.textContent).toContain('Tâche')
		expect(container.textContent).toContain('Check')
		expect(container.textContent).toContain('No available options')
	})

	it('Input should be empty', () => {
		const inputValue = document.getElementsByTagName('input')[0].value
		expect(inputValue).toEqual('')
		const button = document.querySelector('button')
		expect(button.disabled).toEqual(false)
	})

	it('Button should be enable', () => {
		const button = document.querySelector('button')
		expect(button.disabled).toEqual(false)
	})
})

describe('fonctional test', () => {
	it('Local storage should not contains task when first render', () => {
		expect(JSON.parse(localStorage.getItem('taskwidgetdata'))).toEqual([])
	})

	it('Task should not be added update when input is not completed', () => {
		const button = document.getElementsByClassName('p-button-rounded p-button-secondary')[0]
		button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
		expect(container.textContent).toContain('Error')
		expect(container.textContent).toContain('Remplisser les champs')
		expect(container.textContent).toContain('Nom de la Tâche')
		expect(container.textContent).toContain('Tâche')
		expect(container.textContent).toContain('Check')
		expect(container.textContent).toContain('No available options')
	})

	it('It should contain Task when adding task', () => {
		//set value on input
		const input = document.getElementsByClassName('p-inputtext p-component')[0]
		const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
		nativeInputValueSetter.call(input, 'My task')
		const ev2 = new Event('input', { bubbles: true })
		input.dispatchEvent(ev2)

		const button = document.getElementsByClassName('p-button-rounded p-button-secondary')[0]
		button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
		expect(container.textContent).toContain('My task')
		localStorage.clear()
	})

	it('It should not contain No available options when adding task', () => {
		//set value on input
		const input = document.getElementsByClassName('p-inputtext p-component')[0]
		const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
		nativeInputValueSetter.call(input, 'My task')
		const ev2 = new Event('input', { bubbles: true })
		input.dispatchEvent(ev2)

		const button = document.getElementsByClassName('p-button-rounded p-button-secondary')[0]
		button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
		expect(container.textContent).not.toContain('No available options')
		localStorage.clear()
	})

	it('Local storage should contain Task when adding task', () => {
		//set value on input
		const input = document.getElementsByClassName('p-inputtext p-component')[0]
		const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
		nativeInputValueSetter.call(input, 'My task')
		const ev2 = new Event('input', { bubbles: true })
		input.dispatchEvent(ev2)

		const button = document.getElementsByClassName('p-button-rounded p-button-secondary')[0]
		button.dispatchEvent(new MouseEvent('click', { bubbles: true }))

		expect(JSON.parse(localStorage.getItem('taskwidgetdata'))[0].taskname).toBe('My task')
		localStorage.clear()
	})
})
