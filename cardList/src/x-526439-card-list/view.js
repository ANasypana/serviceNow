import  {Fragment}  from '@servicenow/ui-renderer-snabbdom';
import moment from 'moment';
import '@servicenow/now-template-card';


export default ({cards}) => {
	return (
		<Fragment>
			<h2>Card list</h2>
			<div className="container">
				{cards.map(card => (
					<now-template-card-assist
						className="now-card-assist"
						tagline={{"icon":"tree-view-long-outline","label":"Process"}}
						actions={[{"id":"share","label":"Copy URL"}, {"id":"close","label":"Mark Complete"}]}
						heading={{"label": card.heading}}
						content={[
							{label: 'Number', value: {type: 'string', value: card.content.number}},
							{label: 'State', value: {type: 'string', value: card.content.state}},
							{label: 'Assignment Group', value: {type: 'string', value: card.content.assignmentGroup}},
							{label: 'Assigned To', value: {type: 'string', value: card.content.assignedTo}}
						]}
						footerContent={{"label":"Updated","value": moment(card.date).format("DD MM YYYY hh:mm:ss")}}
						configAria={{}} contentItemMinWidth="300">
					</now-template-card-assist>
				))}
			</div>
		</Fragment>
	);
};
