import React from 'react'
import Game from '/img/game.svg'

export default function NoGameFound() {
	return (
		<div className="h-100 d-flex flex-column w-100">
			<h2 className="text-center">Aucun jeu est associé à cette lettre</h2>
			<img src={Game} className="h-100" />
		</div>
	)
}
