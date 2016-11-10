import React from "react";

class MultiSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            filtered: [],
            selectedCodes: [],
            selectedNames: [],
            activeItem: undefined
        }

        this.filterItems = this.filterItems.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    componentWillMount() {
        this.setState({
            items: this.props.items || this.state.items
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            items: this.props.items || this.state.items
        })
    }

    selectItem(e) {
        let self = this;
        let input = document.getElementById("multi-select-" + this.props.count);
        let event = new Event('input', {bubbles: true});

        let names = this.state.selectedNames;
        let codes = this.state.selectedCodes;
        names.push(e.target.getAttribute("data-name"));
        codes.push(e.target.getAttribute("data-value"));

        this.setState({
            selectedNames: names,
            selectedCodes: codes
        }, function () {
            input.value = "";
            input.dispatchEvent(event);
            if(self.props.onSelect){
                self.props.onSelect(self.state)
            }
        })
    }

    renderItems(e) {
        if (this.state.filtered.length > 0) {
            return this.state.filtered.map((item, i)=> {
                return <div className="item" key={i} data-value={item.code} data-name={item.name}
                            onClick={this.selectItem}>{item.name}</div>
            })
        }
    }

    renderSelectedItems() {
        if (this.state.selectedNames.length > 0) {
            return this.state.selectedNames.map((item, i)=> {
                return <div className="item" data-index={i} key={i}>{item.toLowerCase()}</div>
            })
        }
    }

    filterItems(e) {
        let selectedCodes = this.state.selectedCodes;
        let value = e.target.value.toLowerCase();
        let tmp = this.state.items.filter((item, i) => {
            return item.name.toLowerCase().indexOf(value) > -1 && selectedCodes.indexOf(item.code) < 0
        })

        this.setState({
            filtered: tmp
        })
    }

    render() {
        return <div className="multi-select">
            <div className="input-wrapper">
                <div className="selected-items">{this.renderSelectedItems()}</div>
                <input type="text" className="multi-input" placeholder={this.props.placeHolder || "Start typing.."}
                       id={"multi-select-" + this.props.count}
                       onChange={this.filterItems}></input>
            </div>
            <div className="items">
                {this.renderItems()}
            </div>
        </div>
    }
}

export default MultiSelect;