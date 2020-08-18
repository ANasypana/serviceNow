import { actionTypes } from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';
const { COMPONENT_BOOTSTRAPPED } = actionTypes;
import {GET_CARDS, GET_CARDS_SUCCESS, FETCH_FAILED, DELETE_CARD,
	DELETE_CARD_SUCCESS, DELETE_CARD_FAILED,
	DELETE_CARD_FROM} from "../constants";


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
				loading: false,
			})
		},
		FETCH_FAILED:  (coeffects) => {
			const {action, updateState} = coeffects;
			const {data} = action.payload;
			updateState({
				error: {...data, isError: true},
				loading: false,
			})
		},
		DELETE_CARD: createHttpEffect("/api/now/table/incident", {
			method: "DELETE",
			pathParams: ["sys_id"],
			successActionType: DELETE_CARD_SUCCESS,
			errorActionType: DELETE_CARD_FAILED
		}),
		DELETE_CARD_SUCCESS: (coeffects) => {
			const {state, updateState, dispatch, action} = coeffects;
			updateState({
				cards: state.cards.filter( c => c["sys_id"] !== state.card["sys_id"] ),
				loading: false,
				card: {},
				modal: {
					isOpend: true,
					message: `Card Number ${state.card.number} was removed`,
					errorMessage: "",
					actionDelete: true,
					size: "md"
				}
			})
		},
		DELETE_CARD_FAILED: (coeffects) => {
			const { action, updateState } = coeffects;
			const {data} = action.payload;
			updateState({
				loading: false,
				modal: {
					isOpend: true,
					errorMessage: data.error.message,
					message: "",
					actionDelete: true,
					size: "md"
				}
			})
		},

		"NOW_DROPDOWN_PANEL#ITEM_CLICKED": (coeffects) =>{
			const { action, updateState, dispatch, state } = coeffects;
			const sys_id = action.payload.item.id.split("_")[0];
			const actDelete = action.payload.item.id.split("_")[1] === "delete";
			updateState({card: state.cards.find(c => c["sys_id"] === sys_id)});
			if(actDelete){
				updateState({loading: true})
				dispatch(DELETE_CARD, {sys_id});
			}else {

				updateState({modal: {
					isOpend: true,
					message: "",
					errorMessage: "",
					actionDelete: false,
					size: "lg"
				}})
			}
		},
		DELETE_CARD_FROM: (coeffects) =>{
			const { state, dispatch, updateState } = coeffects;
			updateState({modal: {isOpend: false }, loading: true});
			dispatch(DELETE_CARD, {sys_id: state.card["sys_id"]});
		},
		'NOW_MODAL#OPENED_SET': (coeffects) => {
			const {updateState} = coeffects;
			updateState({modal: {isOpend: false, message: "", errorMessage: "" }, card: {}});
		}
	}
};
