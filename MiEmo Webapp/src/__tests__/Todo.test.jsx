import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Todo from '../components/Widgets/Todo/Todo'
import { KeyboardProvider } from '../context/KeyboardContext'

let _asFragment
beforeEach(() => {
	const { asFragment } = render(
		<KeyboardProvider>
			<Todo />
		</KeyboardProvider>,
	)
	_asFragment = asFragment()

	// mock localstorage
	const localStorageMock = (function () {
		let store = {}

		return {
			getItem: function (key) {
				return store[key] || null
			},
			setItem: function (key, value) {
				store[key] = value.toString()
			},
			removeItem: function (key) {
				delete store[key]
			},
			clear: function () {
				store = {}
			},
		}
	})()

	Object.defineProperty(window, 'localStorage', {
		value: localStorageMock,
	})
})

afterEach(() => {
	localStorage.clear()
})

describe('view testing', () => {
	it('It should match the snapshot HTML for Todo', () => {
		expect(_asFragment).toMatchSnapshot()
	})

	it('Todo component should exist', () => {
		const todo = screen.getByTestId('test-todo')
		expect(todo).toBeDefined()
	})

	it('It should contain all static text when firts render', () => {
		const todo = screen.getByTestId('test-todo')
		const placeholderText = screen.getAllByPlaceholderText('Entrez une tâche')[0]
		expect(todo).toHaveTextContent('Tâche')
		expect(todo).toHaveTextContent('Check')
		expect(todo).toHaveTextContent('No results found')
		expect(todo).toContainElement(placeholderText)
	})

	it('Input should be empty', () => {
		expect(screen.getAllByPlaceholderText('Entrez une tâche')[1]).toHaveValue('')
	})

	it('Button should be disable', () => {
		expect(screen.getByTestId('test-buttonadd')).toBeDisabled()
	})
})

describe('fonctional testing', () => {
	it('Local storage should not contains task when first render', () => {
		const todo = screen.getByTestId('test-todo')
		expect(todo).toHaveTextContent('No results found')
	})

	it('Task should not be added when input value.lenght < 3 and contain No results found', () => {
		const button = screen.getByTestId('test-buttonadd')
		const todo = screen.getByTestId('test-todo')
		expect(todo).toHaveTextContent('No results found')
		const input = screen.getAllByPlaceholderText('Entrez une tâche')[1]
		fireEvent.change(input, { target: { value: 'ab' } })
		expect(input.value).toBe('ab')
		expect(button).toBeDisabled()
		expect(todo).toHaveTextContent('No results found')
	})

	it('Task should be added when input value.lenght > 3 and not contain No results found', () => {
		const button = screen.getByTestId('test-buttonadd')
		const todo = screen.getByTestId('test-todo')
		expect(todo).toHaveTextContent('No results found')
		const input = screen.getAllByPlaceholderText('Entrez une tâche')[1]
		fireEvent.change(input, { target: { value: 'abcd' } })
		expect(input.value).toBe('abcd')
		expect(button).toBeEnabled()
		expect(todo).toHaveTextContent('No results found')
		fireEvent.click(button)
		fireEvent.change(input, { target: { value: '' } })
		expect(todo).toHaveTextContent('abcd')
		expect(todo).not.toHaveTextContent('No results found')
	})

	it('after adding task, input is not clear and button stay enable', () => {
		const button = screen.getByTestId('test-buttonadd')
		const input = screen.getAllByPlaceholderText('Entrez une tâche')[1]
		fireEvent.change(input, { target: { value: 'abcd' } })
		fireEvent.click(button)
		expect(input.value).toBe('abcd')
		expect(button).toBeEnabled()
	})

	it('Local storage should contain Task when adding task', () => {
		const button = screen.getByTestId('test-buttonadd')
		const todo = screen.getByTestId('test-todo')
		expect(todo).toHaveTextContent('No results found')
		const input = screen.getAllByPlaceholderText('Entrez une tâche')[1]
		fireEvent.change(input, { target: { value: 'abcd' } })
		expect(input.value).toBe('abcd')
		expect(button).toBeEnabled()
		expect(todo).toHaveTextContent('No results found')
		fireEvent.click(button)
		fireEvent.change(input, { target: { value: '' } })
		expect(todo).toHaveTextContent('abcd')
		expect(JSON.parse(localStorage.getItem('taskwidgetdata'))[0].taskname).toEqual('abcd')
	})
})
