import React from 'react';
import players1 from '../../players.json';
export default function PlayerDetail({
	close,
	addPlayer,
	selectedPlayers,
	i,
	isOpened,
}) {
	const [players] = React.useState([...players1]);
	let playerName = players[i]?.name.replace(' ', '-');

	return (
		//Style fixed to center

		<div
			className="card outlined mt-0"
			style={{
				position: 'fixed',
				left: '50%',
				transform: 'translateX(-50%)',
				padding: '20px',
				width: '500px',
				top: '30%',
				display: isOpened === true ? '' : 'none',
			}}
			data-testid={`player-${playerName}-details`}
		>
			<h1 className="card-title" style={{ textAlign: 'center' }}>
				Player Detail
			</h1>
			<p>
				<strong>Name:</strong>{' '}
				<span data-testid={`player-detail-${playerName}-name`}>
					{players[i]?.name}
				</span>
			</p>
			<p>
				<strong>Type:</strong>{' '}
				<span data-testid={`player-detail-${playerName}-type`}>
					{players[i]?.type}
				</span>
			</p>
			<p>
				<strong>Batting:</strong>{' '}
				<span data-testid={`player-detail-${playerName}-batting`}>
					{players[i]?.battingSkill}
				</span>
			</p>
			<p>
				<strong>Bowling:</strong>{' '}
				<span data-testid={`player-detail-${playerName}-bowling`}>
					{players[i]?.bowlingSkill}
				</span>
			</p>
			<button
				disabled={
					selectedPlayers.findIndex((item) => {
						return item.name === players[i]?.name;
					}) === -1
						? false
						: true
				}
				onClick={() => addPlayer(i)}
				data-testid={`player-detail-${playerName}-add`}
			>
				Select
			</button>
			<button
				onClick={close}
				className="danger"
				data-testid={`player-detail-${playerName}-close`}
			>
				Close
			</button>
		</div>
	);
}
