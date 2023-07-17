import React from 'react';
import PlayerDetail from '../player-info';
import playersList from '../../players.json';

export default function TeamSelection() {
	const [players] = React.useState([...playersList]);
	const [selectedPlayers, setSelectedPlayers] = React.useState([]);
	const [showPlayerDetail, setShowPlayerDetail] = React.useState(false);
	const [idx, setIdx] = React.useState(null);
	const [welcome, setWelcome] = React.useState(true);
	/*
	const [noBat, setNoBat] = React.useState(0);
	const [noBowl, setNoBowl] = React.useState(0);
	const [noAR, setNoAR] = React.useState(0);
	const [noWk, setNoWK] = React.useState(0);
	*/

	const addPlayer = (index) => {
		if (selectedPlayers.length > 4) {
			return;
		} else {
			setSelectedPlayers([...selectedPlayers, players[index]]);
			return;
		}
	};

	const removePlayer = (name) => {
		setSelectedPlayers(
			selectedPlayers.filter((player) => player.name !== name)
		);
		return;
	};

	const showplayerDetailsCard = (i) => {
		setIdx(i);
		setShowPlayerDetail(true);
		return;
	};

	const closeCard = () => {
		setShowPlayerDetail(false);
		return;
	};

	return (
		<div className="mt-50 layout-column justify-content-center align-items-center">
			<div style={{ display: 'flex', width: '80%' }}>
				<PlayerDetail
					selectedPlayers={selectedPlayers}
					i={idx}
					close={() => closeCard()}
					index={1}
					addPlayer={(i) => addPlayer(i)}
					isOpened={showPlayerDetail}
				/>

				<div
					className="card outlined mt-0"
					style={{
						width: '50%',
						marginRight: '10px',
						overflow: 'scroll',
						height: '80vh',
					}}
				>
					<div className="card-text">
						<h4 style={{ textAlign: 'center' }}>
							Available Players
						</h4>
						<table>
							<thead>
								<tr>
									<th data-testid="available-players-name">
										Name
									</th>
									<th>Role</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody data-testid="available-players-table-body">
								<tr>
									<td
										data-testid="selection-rules"
										colSpan="3"
										className="card pb-20"
										style={{
											display:
												welcome === false ? 'none' : '',
										}}
									>
										<p
											data-testid="close-welcome"
											style={{ textAlign: 'right' }}
											onClick={() => setWelcome(false)}
										>
											X
										</p>
										<h3 style={{ textAlign: 'center' }}>
											<strong>
												Welcome to Team Selection
											</strong>
										</h3>
										11 players are required in a team <br />
										3-6 batsmen and bowlers are allowed in a
										team
										<br />
										Only 1 Wicket Keeper required in a team
										<br />
										1-4 All Rounders are allowed in a team
									</td>
								</tr>

								{players?.map((player, k) => (
									<tr
										data-testid={`available-${player.name.replace(
											' ',
											'-'
										)}-row`}
										key={k}
									>
										<td
											data-testid={`available-${player.name.replace(
												' ',
												'-'
											)}-name`}
											onClick={() =>
												showplayerDetailsCard(k)
											}
										>
											{player.name}
										</td>
										<td
											onClick={() =>
												showplayerDetailsCard(k)
											}
										>
											{player.type}
										</td>
										<td>
											<button
												data-testid={`available-${player.name.replace(
													' ',
													'-'
												)}-select`}
												onClick={() => addPlayer(k)}
												disabled={
													selectedPlayers.findIndex(
														(item) => {
															return (
																item.name ===
																player.name
															);
														}
													) === -1
														? false
														: true
												}
												className="btn btn-primary text"
											>
												Select
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div
					className="card outlined mt-0"
					style={{
						width: '50%',
						marginRight: '10px',
						overflow: 'scroll',
						height: '80vh',
					}}
				>
					<div className="card-text">
						<h4 style={{ textAlign: 'center' }}>
							Selected Players
						</h4>
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Role</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody data-testid="selected-players-table-body">
								{selectedPlayers.map((player, index) => {
									return (
										<tr
											data-testid={`selected-${player.name
												.split(' ')
												.join('-')}-row`}
											key={index}
										>
											<td>{player.name}</td>
											<td>{player.type}</td>
											<td>
												<button
													data-testid={`selected-${player.name
														.split(' ')
														.join('-')}-remove`}
													onClick={() =>
														removePlayer(
															player.name
														)
													}
													className="btn danger text"
												>
													Remove
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
