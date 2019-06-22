import * as React from 'react';

interface Item {
  name: string
}

export default class Combo extends React.Component {
  state: {
  }

  props: {
    selId: string,
    items: Item[];
  }

  render() {
    const listItems = this.props.items.map((item) => {
      console.log(JSON.stringify(item));
      return <option key='{item.name}' value='{item.name}'>{item.name}</option>
    });
    const id = this.props.selId;
  return (
      <select id={id}>
        {listItems}
      </select>
    );
  }
}