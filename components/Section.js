export default class Section {
  constructor({ items, renderer, containerSelector }) {
    //TASK - Need to Figure out what goes in the constructor.
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
      //TASK - What does it mean to 'call this function once the page loads'??
    });
  }

  addItem(element) {
    this._container.append(element);
    //TASK - check if this is right/wrong if something ends up not working.
  }
}
