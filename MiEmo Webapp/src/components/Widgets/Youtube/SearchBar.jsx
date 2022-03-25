import { React, useState } from 'react'

//import { ComponentName } from 'primereact/{componentname}';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import api from '../../../api'
import { name } from 'dayjs/locale/fr'

function searchBar() {
	const [term, setTerm] = useState('')
	const [results, setResult] = useState('')
	const { containerStyle, searchTextStyle, buttonStyle } = styles

	const executeYoutubeSearch = () => {
		const fecthAPI = async () => {
			return console.log(api.youtube.search(term))
		}

		fecthAPI()
			.then(res => {
				setResult(res.results ?? [])
			})
			.catch(() => setResult([]))
	}

	return (
		<div className="h-100 text-center">
			<div>Simple Youtube Search</div>
			<div style={containerStyle}>
				<InputText
					style={searchTextStyle}
					options={results}
					//First version
					// onChange={ e => console.log(setTerm(e.target.value))}
					onChangeText={term => console.log(this.setTerm({ term }))}
					//onChange={ e => this.setTerm({e})}
					// value={this.useState.term}
				/>
				<Button
					buttonStyle={buttonStyle}
					title="Search"
					onClick={() => console.log(this.useState.term)}
					// First version
					// onClick={() =>console.log(executeYoutubeSearch(term)) }
				/>
			</div>
		</div>
	)
}
const styles = {
	containerStyle: {
		flexDirection: 'row',
		marginLeft: 10,
		marginRight: 10,
	},
	searchTextStyle: {
		flex: 1,
	},
	buttonStyle: {
		height: 30,
		marginButton: 8,
	},
}
export default searchBar
