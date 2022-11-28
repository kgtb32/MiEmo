import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { Checkbox } from 'primereact/checkbox'

import KeyboardedInput from '../../layout/KeyboardedInput'
import { Button } from 'primereact/button'

const Todo = () => {
	const [task, setTask] = useState(JSON.parse(localStorage.getItem('taskwidgetdata')) ?? [])
	const [editingRows, setEditingRows] = useState({})
	const toast = useRef(null)
	const [newtaskname, setNewTaskName] = useState('')
	const [error, setError] = useState(false)

	useEffect(() => {
		localStorage.setItem('taskwidgetdata', JSON.stringify(task))
	}, [task])

	const onRowEditComplete = e => {
		setTask(task.map(item => (item.id !== e.newData.id ? item : e.newData)))
	}

	const onRowEditDelete = e => {
		setTask(task.filter(item => item.id !== task[e.index].id))
	}

	const onRowEditChange = e => {
		setEditingRows(e.data)
	}

	const textEditor = options => {
		return (
			<KeyboardedInput props={{ type: 'text' }} value={options.value} setValue={e => options.editorCallback(e)} />
		)
	}

	const checkEditor = options => {
		return (
			<Checkbox
				inputId="binary"
				checked={options.rowData.check}
				value={options.rowData.check}
				onChange={e => {
					options.editorCallback(e.checked)
				}}
			/>
		)
	}

	const checkBodyTemplate = rowData => {
		switch (rowData.check) {
			case true:
				return 'Terminé'

			case false:
				return 'Pas Terminé'
		}
	}

	const addTask = () => {
		const taskwidgetdata = JSON.parse(localStorage.getItem('taskwidgetdata'))
		let _id = taskwidgetdata && taskwidgetdata.length > 0 ? Math.max(...task.map(value => value.id)) + 1 : 1
		if (newtaskname) {
			setTask([
				...task,
				{
					id: _id,
					taskname: newtaskname,
					check: false,
				},
			])
			setError(false)
		} else {
			setError(true)
			toast.current.show({ severity: 'warn', summary: 'Error', detail: 'Remplisser les champs', life: 3000 })
		}
	}

	return (
		<DivContainer className="datatable-editing-demo overflow-auto h-100">
			<Toast ref={toast} />

			<div className="card font-bold">
				<div className="d-flex">
					<div className="w-100">
						<KeyboardedInput
							value={newtaskname}
							setValue={e => setNewTaskName(e)}
							props={{
								placeholder: 'Entrez une tâche',
								className: error ? 'border border-danger w-100' : 'w-100',
							}}
						/>
					</div>
					<ButtonCustom
						icon="pi pi-plus"
						aria-label="Bookmark"
						onClick={() => addTask()}
						disabled={newtaskname.length < 3}
					/>
				</div>
				<div className="p-fluid">
					<DataTable
						value={task}
						editMode="row"
						dataKey="id"
						editingRows={editingRows}
						onRowEditChange={onRowEditChange}
						onRowEditComplete={onRowEditComplete}
						onRowEditCancel={onRowEditDelete}
						responsiveLayout="scroll"
					>
						<Column
							field="taskname"
							header="Tâche"
							editor={options => textEditor(options)}
							style={{ width: '20%' }}
						></Column>
						<Column
							field="check"
							header="Check"
							editor={options => checkEditor(options)}
							body={checkBodyTemplate}
							style={{ width: '20%' }}
						></Column>
						<Column
							rowEditor
							headerStyle={{ width: '10%', minWidth: '8rem' }}
							bodyStyle={{ textAlign: 'center' }}
						></Column>
					</DataTable>
				</div>
			</div>
		</DivContainer>
	)
}

const ButtonCustom = styled(Button)`
	background-color: #5eead4;
	color: white;
	border: none;
	&:enabled:hover {
		background-color: white;
		color: #5eead4;
	}
	&:enabled:active,
	&:enabled:focus {
		background-color: #5eead4;
		color: white;
	}
`

const DivContainer = styled.div`
	::-webkit-scrollbar {
		height: 4px;
		background: #969696;
		-webkit-border-radius: 1ex;
	}

	::-webkit-scrollbar-thumb {
		height: 9px;
		width: 350px;
		background: #5eead4;
		border-radius: 10px;
		-webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
	}

	::-webkit-scrollbar-corner {
		background: #1a1a1a;
	}
`
export default Todo
