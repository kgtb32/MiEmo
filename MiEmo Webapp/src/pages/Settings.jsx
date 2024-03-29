import React from 'react'
import { Link } from 'react-router-dom'

import { ListGroup } from 'react-bootstrap'

import SettingsHeader from '../components/Settings/SettingsHeader'

import { AiFillCalendar, AiFillInfoCircle, AiFillSound, AiFillLayout } from 'react-icons/ai'
import { FaBroom, FaBluetooth } from 'react-icons/fa'
import { IoMdColorPalette } from 'react-icons/io'
import { MdOutlineWifi, MdSettingsEthernet, MdKeyboard } from 'react-icons/md'
import { RiSoundModuleFill } from 'react-icons/ri'
import { Tb3DCubeSphere } from 'react-icons/tb'

const size = '2em'

export default function Settings() {
	return (
		<div className="px-4 py-4">
			<SettingsHeader headerTitle="Paramètres" backUrl="/" />
			<div className="px-4">
				<div className="mt-5">
					<div className="my-2">
						<h2 className="user-select-none">Connectivité</h2>
						<ListGroup>
							<Link to="/settings/wifi" className="text-decoration-none">
								<ListGroup.Item action>
									<span>
										<MdOutlineWifi className="mx-2" color="#2980b9" size={size} />
										Wi-Fi
									</span>
								</ListGroup.Item>
							</Link>
							<Link to="/settings/bluetooth" className="text-decoration-none">
								<ListGroup.Item action>
									<FaBluetooth className="mx-2" color="#2980b9" size={size} />
									Bluetooth
								</ListGroup.Item>
							</Link>
							<Link to="/settings/networkCheck" className="text-decoration-none">
								<ListGroup.Item action>
									<span>
										<MdSettingsEthernet className="mx-2" color="#f1c40f" size={size} />
										Tester la connectivité
									</span>
								</ListGroup.Item>
							</Link>
						</ListGroup>
					</div>
					<div className="my-2">
						<h2 className="user-select-none">Son</h2>
						<ListGroup>
							<Link to="/settings/audioTest" className="text-decoration-none">
								<ListGroup.Item action>
									<span>
										<AiFillSound className="mx-2" color="#bdc3c7" size={size} />
										Tester l&apos;audio
									</span>
								</ListGroup.Item>
							</Link>
							<Link to="/settings/audioMixer" className="text-decoration-none">
								<ListGroup.Item action>
									<span>
										<RiSoundModuleFill className="mx-2" color="#1abc9c" size={size} />
										Mélangeur audio
									</span>
								</ListGroup.Item>
							</Link>
						</ListGroup>
					</div>
					<div className="my-2">
						<h2 className="user-select-none">Interface</h2>
						<ListGroup>
							<Link to="/settings/colors" className="text-decoration-none">
								<ListGroup.Item action>
									<IoMdColorPalette className="mx-2" color="#d35400" size={size} />
									<span>{"Couleur d'accentuation"}</span>
								</ListGroup.Item>
							</Link>
							<Link to="/settings/keyboard" className="text-decoration-none">
								<ListGroup.Item action>
									<MdKeyboard className="mx-2" color="" size={size} />
									<span>Clavier virtuel</span>
								</ListGroup.Item>
							</Link>
							<Link to="/settings/hologram" className="text-decoration-none">
								<ListGroup.Item action>
									<Tb3DCubeSphere className="mx-2" color="#3498db" size={size} />
									Hologramme
								</ListGroup.Item>
							</Link>
							<Link to="/settings/calendar" className="text-decoration-none">
								<ListGroup.Item action>
									<span>
										<AiFillCalendar className="mx-2" color="#9b59b6" size={size} />
										Calendrier
									</span>
								</ListGroup.Item>
							</Link>
							<ListGroup.Item action>
								<span>
									<AiFillLayout className="mx-2" color="#1abc9c" size={size} />
									Agencement
								</span>
							</ListGroup.Item>
							<Link to="/settings/cleanup" className="text-decoration-none">
								<ListGroup.Item action>
									<span>
										<FaBroom className="mx-2" color="#e67e22" size={size} />
										Mode Nettoyage
									</span>
								</ListGroup.Item>
							</Link>
						</ListGroup>
					</div>
					<div className="my-2">
						<h2 className="user-select-none">Système</h2>
						<ListGroup>
							<Link to="/about" className="text-decoration-none">
								<ListGroup.Item action>
									<span>
										<AiFillInfoCircle className="mx-2" color="#2980b9" size={size} />
										<span>À propos de</span>
									</span>
								</ListGroup.Item>
							</Link>
						</ListGroup>
					</div>
				</div>
			</div>
		</div>
	)
}
