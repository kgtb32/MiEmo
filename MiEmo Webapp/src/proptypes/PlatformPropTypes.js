import PropTypes from 'prop-types'

export const popularGamesPropsTypes = {
	game_name: PropTypes.string.isRequired,
	cover: PropTypes.string,
}

export const PlatformProps = {
	platform_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	console_logo: PropTypes.string,
	console_preview: PropTypes.string,
	controller_picture: PropTypes.string,
	game_box: PropTypes.string,
	controls: PropTypes.string,
	year_created: PropTypes.number.isRequired,
	end_year: PropTypes.number,
	description: PropTypes.string.isRequired,
	popular_games: PropTypes.arrayOf(PropTypes.shape(popularGamesPropsTypes)),
}
