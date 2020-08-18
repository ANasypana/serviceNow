import  {Fragment}  from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-template-card';
import '@servicenow/now-loader';
import '@servicenow/now-modal';
import '@servicenow/now-label-value';

import {DELETE_CARD_FROM} from "../constants";


export default ({cards, loading, error, modal, card}) => {
	const mes = error.isError ? (<p className="error-message">{error.error.message}</p>) : (<p>No record found</p>);
	const content = !!modal.message || !!modal.errorMessage ?
		( <div>{modal.message} {modal.errorMessage}</div>) :
		(<now-label-value-stacked
			items={[
				{"label":"Sort Description","value":{"type":"string","value": card["short_description"]}},
				{"label":"Number","value":{"type":"string",  "value": card.number}},
				{"label":"State","value":{"type":"string","value": card.state}},
				/*{"label":"Assignment group","value":{"type":"string","value":  card["assignment_group"]["display_value"]}},
				{"label":"Assigned to", "value":{"type":"string","value": card["assigned_to"]["display_value"]}},*/
				{"label":"Updated","value":{"type":"string","value": card["sys_updated_on"]}},
				]}
			itemMinWidth="50px" delimiter="," size="md" align="horizontal-equal" >
		</now-label-value-stacked>);

	return (
		<Fragment>
			<h2>Insidents</h2>
			{loading ? (<now-loader label="Loading..."  size="md"></now-loader>) : (
				<div className="container">
					{ cards.length > 0 ? (cards.map(card => (
							<div className='card' key={card["sys_id"]}>
								<now-template-card-assist
									className="now-card-assist"
									tagline={{"icon":"tree-view-long-outline","label":"Incident"}}
									actions={[{"id":`${card["sys_id"]}_open`,"label":"Open Record"}, {"id":`${card["sys_id"]}_delete`,"label":"Delete"}]}
									heading={{"label": card["short_description"]}}
									content={[
										{label: 'Number', value: {type: 'string', value: card.number}},
										{label: 'State', value: {type: 'string', value: card.state}},
										{label: 'Assignment Group', value: {type: 'string', value: card["assignment_group"]["display_value"]}},
										{label: 'Assigned To', value: {type: 'string', value: card["assigned_to"]["display_value"]}}
									]}
									footerContent={{"label":"Updated","value": card["sys_updated_on"]}}
									configAria={{}} contentItemMinWidth="300">
								</now-template-card-assist>
							</div>
						))): (mes)

					}
					<now-modal
						content={content}
						footerActions={ [{
							"label": "Delete",
							"variant": "primary-negative",
							"disabled": modal.actionDelete,
							"clickActionType": DELETE_CARD_FROM
						}]}
						size = {modal.size}
						opened={modal.isOpend}
					>
					</now-modal>
				</div>
			)}
		</Fragment>
	);
};
