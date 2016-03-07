import React, {
    Component,
    PropTypes,
} from 'react';
import ReactDOM from 'react-dom';

let _MediumEditor;

if (typeof document !== 'undefined') {
    _MediumEditor = require('medium-editor');
}

export default class MediumEditor extends Component {
    static propTypes = {
        tag: PropTypes.string,
        text: PropTypes.string,
        options: PropTypes.any,
        onChange: PropTypes.func,
        flushEditorDOM: PropTypes.bool,
    };

    static defaultProps = {
        tag: 'div',
        text: '',
        onChange: () => {},
    };

    componentDidMount = () => {
        const dom = ReactDOM.findDOMNode(this);

        this.medium = new _MediumEditor(dom, this.props.options);
        this.medium.subscribe('editableInput', () => {
            this.props.onChange(dom.innerHTML);
        });
        this.medium.setContent(this.props.text);
    };

    componentDidUpdate = () => {
        this.medium.restoreSelection();
    };

    componentWillUnmount = () => {
        this.medium.destroy();
    };

    render() {
        const tag = this.props.tag;
        const childProps = {
            ...this.props,
        };

        if (this.medium) {
            this.medium.saveSelection();

            if (this.props.flushEditorDOM) {
                this.medium.setContent(this.props.text);
            }
        }

        return React.createElement(tag, childProps);
    }
}
