import * as React from 'react';

interface Item {
  name: string
}

export default class BoardCanvas extends React.Component {
  state: {
    id: string,
    list: Item[];
  }

  setId = (id: string) => {
    this.setState({
      id: id
    });
  };

  setList = (list: Item[]) => {
    this.setState({
      list: list
    });
  };

  render() {
    const listItems = this.state.list.map((item) =>
      <option>{item.name}</option>
    );
    return (
      <select id='{this.id}'>
        {listItems}
      </select>
    );
  }
}