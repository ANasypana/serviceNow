

export default ({properties: {card}}) => {
	const assignment_group = !!card["assignment_group"]["display_value"] ? card["assignment_group"]["display_value"] : "-";
	const assigned_to = !!card["assigned_to"]["display_value"] ? card["assigned_to"]["display_value"] : "-";

	return(
		<form>
			<h2>Incident cart Number {card.number}</h2>
			<div className="form--group">
				<label htmlFor="description" className="form--label">Short description</label>
				<input type="text" className="form--input" id="description"  readonly value={card["short_description"]}/>
			</div>
			<div className="form--group">
				<label htmlFor="state" className="form--label">State</label>
				<input type="text" className="form--input" id="state" readonly value={card.state}/>
			</div>
			<div className="form--group">
				<label htmlFor="assignment_group" className="form--label">Assignment Group</label>
				<input type="text" className="form--input" id="assignment_group" readonly value={assignment_group}/>
			</div>
			<div className="form--group">
				<label htmlFor="assigned_to" className="form--label">Assigned To</label>
				<input type="text" className="form--input" id="assigned_to" readonly value={assigned_to}/>
			</div>
			<div className="form--group">
				<label htmlFor="updated_on" className="form--label">Updated</label>
				<input type="text" className="form--input" id="updated_on" readonly value={card["sys_updated_on"]}/>
			</div>
		</form>
	)
}
