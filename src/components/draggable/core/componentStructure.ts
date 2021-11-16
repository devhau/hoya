const getHtmlElementFromNode = ({ el }: any): any => el;
const addContext = (domElement: any, context: any) => (domElement.__draggable_context = context);
const getContext = (domElement: any) => domElement.__draggable_context;

class ComponentStructure {
  defaultNodes: any;
  children: any[];
  externalComponent: any;
  rootTransition: any;
  tag: any;
  realList: any;
  header: any;
  footer: any;
  constructor({
    nodes: { header, default: defaultNodes, footer },
    root,
    realList
  }: any) {
    this.defaultNodes = defaultNodes;
    this.header = header;
    this.footer = footer;
    this.children = [...header, ...defaultNodes, ...footer];
    this.externalComponent = root.externalComponent;
    this.rootTransition = root.transition;
    this.tag = root.tag;
    this.realList = realList;
  }

  get _isRootComponent() {
    return this.externalComponent || this.rootTransition;
  }

  render(h: any, attributes: any) {
    const { tag, children, _isRootComponent }: any = this;
    const option = !_isRootComponent ? children : { default: () => children };
    return h(tag, attributes, option);
  }

  updated() {
    const { defaultNodes, realList }: any = this;
    defaultNodes.forEach((node: any, index: number) => {
      addContext(getHtmlElementFromNode(node), {
        element: realList[index],
        index
      });
    });
  }

  getUnderlyingVm(domElement: any) {
    return getContext(domElement);
  }

  getVmIndexFromDomIndex(domIndex: any, element: any) {
    const { defaultNodes }: any = this;
    const { length } = defaultNodes;
    const domChildren = element.children;
    const domElement = domChildren.item(domIndex);

    if (domElement === null) {
      return length;
    }
    const context = getContext(domElement);
    if (context) {
      return context.index;
    }

    if (length === 0) {
      return 0;
    }
    const firstDomListElement = getHtmlElementFromNode(defaultNodes[0]);
    const indexFirstDomListElement = [...domChildren].findIndex(
      element => element === firstDomListElement
    );
    return domIndex < indexFirstDomListElement ? 0 : length;
  }
}

export { ComponentStructure };