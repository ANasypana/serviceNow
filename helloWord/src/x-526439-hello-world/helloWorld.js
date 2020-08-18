import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const view = (state, {updateState}) => {
	return (
		<h2>Hello World!</h2>
	);
};

createCustomElement('hello-world', {
	renderer: {type: snabbdom},
	view,
	styles
});
