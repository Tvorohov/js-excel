import { $ } from '../dom'

describe('Dom', () => {
  function createDomElement(tagName, classes = '') {
    const el = document.createElement(tagName);
    if (classes) {
      el.classList.add(classes);
    }
    return $(el);
  }

  let testElement;

  beforeEach(() => {
    testElement = createDomElement('div', 'test-class');
  });

  afterEach(() => {
    testElement = null;
  });

  test('html method sets innerHTML', () => {
    const htmlContent = '<p>Hello, World!</p>';
    testElement.html(htmlContent);
    expect(testElement.$el.innerHTML).toBe(htmlContent);
  });

  test('html method returns outerHTML when no argument is provided', () => {
    const htmlContent = '<p>Hello, World!</p>';
    testElement.html(htmlContent);
    expect(testElement.html()).toBe('<div class="test-class"><p>Hello, World!</p></div>');
  });

  test('clear method clears innerHTML', () => {
    testElement.html('<p>Hello, World!</p>');
    testElement.clear();
    expect(testElement.$el.innerHTML).toBe('');
  });

  test('on and off methods add and remove event listeners', () => {
    const callback = jest.fn();
    testElement.on('click', callback);
    testElement.$el.click();
    expect(callback).toHaveBeenCalledTimes(1);

    testElement.off('click', callback);
    testElement.$el.click();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('find method finds and returns a child element', () => {
    const childElement = createDomElement('span', 'child-class');
    testElement.append(childElement);
    const foundElement = testElement.find('.child-class');
    expect(foundElement).toEqual(childElement);
  });

  test('append method appends a DOM node', () => {
    const childElement = createDomElement('span', 'child-class');
    testElement.append(childElement);
    expect(testElement.$el.contains(childElement.$el)).toBe(true);
  });

  test('data getter returns the dataset of the element', () => {
    testElement.$el.setAttribute('data-id', '123');
    expect(testElement.data.id).toBe('123');
  });
});