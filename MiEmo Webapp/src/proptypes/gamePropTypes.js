import PropTypes from 'prop-types'

import { PlatformProps } from './PlatformPropTypes'

export const corePropTypes = {
	core_uuid: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	core_path: PropTypes.string.isRequired,
	config_file: PropTypes.string,
}

export const genresPropTypes = {
	genre_uuid: PropTypes.string.isRequired,
	genre_name: PropTypes.string.isRequired,
}

export const gamePropTypes = {
	game_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	year_created: PropTypes.number.isRequired,
	nb_played: PropTypes.number.isRequired,
	favorite: PropTypes.bool,
	cover: PropTypes.string,
	platform: PropTypes.shape(PlatformProps),
	core: PropTypes.shape(corePropTypes),
	config: PropTypes.string,
	genres: PropTypes.arrayOf(PropTypes.shape(genresPropTypes)),
	nb_player: PropTypes.number.isRequired,
	trailer_url: PropTypes.string,
}
