import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from "./view";


createCustomElement('card-form', {
	renderer: {type: snabbdom},
	view,
	properties: {
		card: {
			default: false
		}
	},
	styles,
});
