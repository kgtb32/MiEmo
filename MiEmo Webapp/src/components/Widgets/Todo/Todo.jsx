import React, { useState, useRef, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Checkbox } from 'primereact/checkbox'
import styled from 'styled-components'
import { Button } from 'primereact/button/'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Todo = () => {
	const [task, setTask] = useState(JSON.parse(localStorage.getItem('taskwidgetdata')) ?? [])
	const [editingRows, setEditingRows] = useState({})
	const toast = useRef(null)
	const [checked, setChecked] = useState(false)
	const [newtaskname, setNewTaskName] = useState()
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
		return <InputText type="text" value={options.value} onChange={e => options.editorCallback(e.target.value)} />
	}

	const checkEditor = options => {
		return (
			<Checkbox
				inputId="binary"
				checked={checked}
				onChange={e => {
					setChecked(e.checked)
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
		<div className="datatable-editing-demo overflow-auto h-100">
			<Toast ref={toast} />

			<div className="card">
				<h5>Tâche</h5>
				<InputTaskContainer>
					<Button
						icon="pi pi-plus"
						className="p-button-rounded p-button-secondary"
						aria-label="Bookmark"
						onClick={() => addTask()}
					/>
					<InputTask>
						<h5>Nom de la Tâche</h5>
						<Container>
							<Row>
								<InputText
									value={newtaskname}
									onChange={e => setNewTaskName(e.target.value)}
									className={error ? 'p-invalid block' : ''}
								/>
							</Row>
						</Container>
						{error ? <small className="p-error block">Entrez une tâche</small> : ''}
					</InputTask>
				</InputTaskContainer>
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
		</div>
	)
}

const InputTaskContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-evenly;
	padding: 20px;
`

const InputTask = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
export default Todo
