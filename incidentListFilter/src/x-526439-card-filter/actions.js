import { actionTypes } from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';
const { COMPONENT_BOOTSTRAPPED } = actionTypes;
import {GET_CARDS, GET_CARDS_SUCCESS, FETCH_FAILED, DELETE_CARD,
	DELETE_CARD_SUCCESS, DELETE_CARD_FAILED,
	DELETE_CARD_FROM, DELETE_CARD_PANEL, OPEN_CARD_PANEL, RUN_FILTER} from "../constants";
import {updateFilter, filterArray} from "./constructFilter";


export default {
	actionHandlers: {
		[COMPONENT_BOOTSTRAPPED]: (coeffects) => {
			const {dispatch} = coeffects;
			dispatch( GET_CARDS ,{
				"sysparm_display_value": true
			});
		} ,
		GET_CARDS: createHttpEffect("/api/now/table/incident", {
			method: "GET",
			queryParams: ["sysparm_display_value"],
			successActionType: GET_CARDS_SUCCESS,
			errorActionType: FETCH_FAILED
		}),
		GET_CARDS_SUCCESS: (coeffects) => {
			const {action, updateState} = coeffects;
			const {result} = action.payload;
			updateState({
				cards: result,
				copyCards: [...result],
				loading: false,
				card: {},
				error: {isError: false}
			})
		},
		FETCH_FAILED:  (coeffects) => {
			const {action, updateState, state} = coeffects;
			const {data} = action.payload;
			updateState({
				error: {...data, isError: true},
				loading: false,
				alert: {isOpend: true, content: data.error.message},
				cards: [],
				card: {}
			});
			setTimeout(() =>{
				if(!state.alert.isOpend){
					updateState({
						alert: {isOpend: false, content: ""},
						error: {isError: false}
					});
				}
			}, 3000)

		},
		DELETE_CARD: createHttpEffect("/api/now/table/incident", {
			method: "DELETE",
			pathParams: ["sys_id"],
			successActionType: DELETE_CARD_SUCCESS,
			errorActionType: DELETE_CARD_FAILED
		}),
		DELETE_CARD_SUCCESS: (coeffects) => {
			const {state, updateState} = coeffects;
			updateState({
				cards: state.cards.filter( c => c["sys_id"] !== state.card["sys_id"] ),
				loading: false,
				error: {isError: false},
				card: {},
				alert:{isOpend: true, content: `Card Number ${state.card.number} was removed`},
			});
			setTimeout(() =>{
				if(!state.alert.isOpend){
					updateState({
						alert: {isOpend: false, content: ""}
					});
				}
			}, 3000)
		},
		DELETE_CARD_FAILED: (coeffects) => {
			const { action, updateState, state } = coeffects;
			const {data} = action.payload;
			updateState({
				loading: false,
				error: {isError: true},
				alert:{isOpend: true, content: data.error.message},
			});
			setTimeout(() =>{
				if(!state.alert.isOpend){
					updateState({
						alert: {isOpend: false, content: ""},
						error: {isError: false}
					});
				}
			}, 3000)
		},
		OPEN_CARD_PANEL: (coeffects) =>{
			const { action, updateState, state } = coeffects;
			const sys_id = action.payload.action.id;
			updateState({card: state.cards.find(c => c["sys_id"] === sys_id)});
			updateState({modal: {
					isOpend: true,
				}})
		},
		DELETE_CARD_PANEL: (coeffects) =>{
			const { action, updateState, dispatch, state } = coeffects;
			const sys_id = action.payload.action.id;
			updateState({
				card: state.cards.find(c => c["sys_id"] === sys_id),
				loading: true
			});
			dispatch(DELETE_CARD, {sys_id});
		},
		"NOW_DROPDOWN_PANEL#ITEM_CLICKED": (coeffects) =>{

		},
		DELETE_CARD_FROM: (coeffects) =>{
			const { state, dispatch, updateState } = coeffects;
			updateState({modal: {isOpend: false }, loading: true});
			dispatch(DELETE_CARD, {sys_id: state.card["sys_id"]});
		},
		'NOW_MODAL#OPENED_SET': (coeffects) => {
			const {updateState} = coeffects;
			updateState({modal: {isOpend: false }, card: {}});
		},
		"NOW_ALERT#ACTION_CLICKED": (coeffects) => {
			const {updateState} = coeffects;
			updateState({
				alert:{isOpend: false, content: ""},
				error: {isError: false}
			});
		},
		RUN_FILTER: (coeffects) =>{
			const { updateState, state} = coeffects;
			updateState({
				cards: filterArray(state.copyCards, state.filter)
			})
		},

		"NOW_DROPDOWN#ITEM_CLICKED":  (coeffects) =>{
			const {action, updateState, state, dispatch} = coeffects;

		    updateState({
				filter: updateFilter(action.meta.componentName, action.payload.item.id, state.filter),
				});
			dispatch(RUN_FILTER)


		}

	}
};
