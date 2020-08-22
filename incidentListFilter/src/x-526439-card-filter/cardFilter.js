import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from "./view";
import cardActions from './actions';


createCustomElement('x-526439-card-filter', {
	renderer: {type: snabbdom},
	view,
	initialState: {
		cards: [],
		copyCards: [],
		card: {},
		loading: true,
		modal:{
			isOpend: false,
		},
		alert: {
			content: "",
			isOpend: false
		},
		filter:{
			inputVal: "",
			selectedItems: [],
			state: "",
			updated: "",
			field: ""
		},
		error: {
			isError: false
		}
	},
	styles,
	...cardActions
});
