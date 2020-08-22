import  {Fragment}  from '@servicenow/ui-renderer-snabbdom';
import { actionTypes } from '@servicenow/ui-core';
const { COMPONENT_BOOTSTRAPPED } = actionTypes;
import '@servicenow/now-template-card';
import '@servicenow/now-loader';
import '@servicenow/now-modal';
import '@servicenow/now-alert';
import '@servicenow/now-dropdown';
import '@servicenow/now-button';
import "../cardForm"


import {DELETE_CARD_FROM, OPEN_CARD_PANEL, DELETE_CARD_PANEL, RUN_FILTER} from "../constants";



export default (state, {dispatch, updateState}) => {
	const {cards, loading, error, modal, card, alert, filter} = state;
	const alertStatus = error.isError ? "critical" : "info";
	const mes = error.isError ? null : (<p>No record found</p>)
	const content = (<card-form card={card}></card-form>);

	return (
		<Fragment>
			{alert.isOpend ? <now-alert status={alertStatus} icon="info-circle-outline"
										 content={alert.content}
										 action={{"type":"dismiss"}}
			></now-alert> : null}

			<div className="header">
				{filter.field.length > 0 ?
					<input
					value={filter.inputVal}
					type="text"
					placeholder="Search..."
					hook-insert={vnode => vnode.elm.focus()}
					on-keydown={({code, target}) =>{
						if(code === "Enter"){
							updateState({filter:{...filter, inputVal: target.value}})
							dispatch(RUN_FILTER)
						}
					}}
					on-blur={({target}) => {
						if(target.value !==filter.inputVal){
							updateState({filter:{...filter, inputVal: target.value}})
							dispatch(RUN_FILTER)
						}
					}}
					className='mr-2'
					/> : null}

				<now-dropdown className='mr-1'
					componentName="field"
					items={[
						{"id": "short_description","label":"Short Description"},
						{"id": "assignment_group","label":"Assignment Group"},
						{"id": "assigned_to","label":"Assigned To"}]}
						selectedItems={filter.selectedItems} placeholder="Choose field for searching"
						size="md" variant="secondary" select="single">
				</now-dropdown>

				<now-dropdown className='mr-1'
							  componentName="updated"
							  items={[
								  {"id":"all","label":"Dropping"},
								  {"id":"asc","label":"Ascending"},
								  {"id":"des","label":"Descending"},
							  ]}
							  placeholder="Ordered by Updated Date" size="md"
							  variant="secondary" select="single" selectedItems={filter.selectedItems}>
				</now-dropdown>
				<now-dropdown className='mr-1'
					componentName="state"
					items={[
						{"id":"all","label":"All States"},
						{"id":"closed","label":"Closed"},
						{"id":"in progress","label":"In Progress"},
						{"id":"on hold","label":"On Hold"},
						{"id":"new","label":"New"},
						]}
						placeholder="Choose State" size="md"
						variant="secondary" select="single" selectedItems={filter.selectedItems}>
				</now-dropdown>
				<now-button

					className='mr-1'
					label="All Cards"
					variant="primary"
					size="md"
					clickActionType={"CLEAR"}
					on-click={(e) => {
						console.log(e)
						updateState({filter: {inputVal: "", selectedItems: [], state: "", updated: "", field: "" }});
						dispatch(RUN_FILTER)
					}}
				></now-button>

			</div>
			<h2>Insidents</h2>


			{loading ? (<now-loader label="Loading..."  size="md"></now-loader>) : (
				<div className="container">
					{ cards.length > 0 ? (cards.map(card => (
							<div className='card' key={card["sys_id"]}>
								<now-template-card-assist
									className="now-card-assist"
									tagline={{"icon":"tree-view-long-outline","label":"Incident"}}
									actions={[
										{"id": card["sys_id"], "label":"Open Record", "clickActionType": OPEN_CARD_PANEL},
										{"id": card["sys_id"], "label":"Delete", "clickActionType": DELETE_CARD_PANEL}]}
									heading={{"label": card["short_description"]}}
									content={[
										{label: 'Number', value: {type: 'string', value: card.number}},
										{label: 'State', value: {type: 'string', value: card.state}},
										{label: 'Assignment Group',
											value: {type: 'string',
												value: !!card["assignment_group"]["display_value"] ?
													card["assignment_group"]["display_value"] : "-" }},
										{label: 'Assigned To',
											value: {type: 'string', value: !!card["assigned_to"]["display_value"] ?
													card["assigned_to"]["display_value"] : "-"
										}}
									]}
									footerContent={{"label":"Updated","value": card["sys_updated_on"]}}
									configAria={{}} contentItemMinWidth="300">
								</now-template-card-assist>
							</div>
						))): mes
					}

					<now-modal
						content={content}
						footerActions={ [{
							"label": "Delete",
							"variant": "primary-negative",
							"clickActionType": DELETE_CARD_FROM
						}]}
						size = "lg"
						opened={modal.isOpend}
					>
					</now-modal>

				</div>
			)}
		</Fragment>
	);
};
