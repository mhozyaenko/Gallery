class SearchBar {
  constructor(className, id, placeholder, parentNode, searchAction) {
    this.className = className;
    this.id = id;
    this.placeholder = placeholder;
    this.parentNode = parentNode;
    this.searchAction = searchAction;
  }

  handleChange = (e) => {
    const query = e.target.value.toLowerCase();

    this.searchAction(query);
  }

  render = () => {
    const node = document.createElement('div');

    node.className = this.className;
    node.innerHTML = `<input type="search" placeholder="${this.placeholder}" id="${this.id}" />`;
    node.onsearch = this.handleChange;
    node.onkeyup = this.handleChange;

    this.parentNode.appendChild(node);
  }
}

export default SearchBar;