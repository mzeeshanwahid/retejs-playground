import React from "react";

class MyReactControl extends React.Component {
  componentDidMount() {
    this.props.mounted();
  }

  render() {
    return (
      <input
        type="number"
        value={this.props.value}
        readOnly={this.props.readonly}
        onChange={e => this.props.onChange(+e.target.value)}
      />
    );
  }
}

export default MyReactControl;
