import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import view from "./view";
import styles from './cardList.scss';
import {CARDS} from "../dataCarda";



createCustomElement('card-list', {
	renderer: {type: snabbdom},
	view,
	initialState: {
		cards: CARDS
	},
	styles
});
