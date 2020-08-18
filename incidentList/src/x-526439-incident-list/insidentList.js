import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from "./view";
import cardActions from './actions';


createCustomElement('incident-list', {
	renderer: {type: snabbdom},
	view,
	initialState: {
		cards: [],
		card: {},
		loading: true,
		modal:{
			isOpend: false,
			errorMessage: "",
			message: "",
			actionDelete: true,
			size: "lg"
		},
		opendModal: false,
		error: {}
	},
	styles,
	...cardActions
});
