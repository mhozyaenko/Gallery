class Slider {
  constructor(sliderClassName, sliderId, sliderLabel, defaultValue, controlStep, sliderActions, parentNode, min, max) {
    this.sliderClassName = sliderClassName;
    this.sliderLabel = sliderLabel;
    this.controlStep = controlStep;
    this.sliderActions = sliderActions;
    this.parentNode = parentNode;
    this.sliderId = sliderId;
    this.defaultValue = defaultValue;
    this.nowValue = this.defaultValue;
    this.isMouseDown = false;  
    this.min = min;
    this.max = max;     
  }
  addEvents = node => {    
    const next = node.querySelector('.next');
    const prev = node.querySelector('.prev');
    const input = document.getElementById(`${this.sliderId}`);

    next.onclick = this.handleNext;
    prev.onclick = this.handlePrev;
    input.onchange = this.handleChange;
    input.onmousedown = () => this.isMouseDown = true;
    input.onmousemove = this.handleMouseMove;
    input.onmouseup = () => this.isMouseDown = false;
    input.onmouseenter = () => document.querySelector('body').style.overflow = 'hidden';
    input.onmouseout = () => document.querySelector('body').style.overflow = 'unset';
    input.onwheel = this.handleWheel;
  }
  handleNext = () => {
    const sliderValue = Number(this.nowValue) + this.controlStep;
    document.getElementById(this.sliderId).value = sliderValue;
    document.querySelector(`.${this.sliderLabel}`).innerHTML = sliderValue;
    this.sliderActions(sliderValue);
    this.nowValue = sliderValue;
    
  }
  handlePrev = () => {
    const sliderValue = Number(this.nowValue) - this.controlStep;
    document.getElementById(this.sliderId).value = sliderValue;
    document.querySelector(`.${this.sliderLabel}`).innerHTML = sliderValue;
    this.sliderActions(sliderValue);
    this.nowValue = sliderValue;
  }
  handleChange = (e) => {
    const sliderValue = e.target.value;

    if (this.nowValue !== sliderValue) {
            document.querySelector(`.${this.sliderLabel}`).innerHTML = sliderValue;
            this.sliderActions(sliderValue);
            this.nowValue = sliderValue;
        }
  }
  handleMouseMove = (e) => {
    if (!this.isMouseDown) return;

    const sliderValue = e.target.value;

    if (sliderValue !== this.nowValue) {
      document.querySelector(`.${this.sliderLabel}`).innerHTML = sliderValue;
        this.sliderActions(sliderValue);
        this.nowValue = sliderValue;
    }
  }
  handleWheel = (e) => {
    const sliderValue = (e.wheelDelta > 0)
            ? String(Number(this.nowValue) + this.controlStep)
            : String(Number(this.nowValue) - this.controlStep);
    if (sliderValue>this.max || sliderValue<this.min) return;        

    document.getElementById(this.sliderId).value = sliderValue;
    document.querySelector(`.${this.sliderLabel}`).innerHTML = sliderValue;
    this.sliderActions(sliderValue);
    this.nowValue = sliderValue;
  }
}

export class RowSlider extends Slider {
  constructor(sliderClassName, sliderId, sliderLabel, defaultValue, controlStep, sliderActions, parentNode, min, max) {
    super(sliderClassName, sliderId, sliderLabel, defaultValue, controlStep, sliderActions, parentNode, min, max);    
  }

  render = () => {
    const node = document.createElement('div');
    node.className = this.sliderClassName;
    node.innerHTML = `<h4>Change Rows Count</h4>
    <div class="rowsSlider-slider">
        <button type="button" class="sliderControls next" ><i class="fas fa-chevron-right"></i>
        </button>
        <label for="${this.sliderId}" class="${this.sliderLabel}">${this.defaultValue}</label>
        <input type="range" min="${this.min}" max="${this.max}" value="${this.defaultValue}" id="${this.sliderId}"/>
        <button type="button" class="sliderControls prev"><i class="fas fa-chevron-left"></i>
        </button>
    </div>`;

    this.parentNode.appendChild(node);
    this.addEvents(node);
  }
}

export class SizeSlider extends Slider {
  constructor(sliderClassName, sliderId, sliderLabel, defaultValue, controlStep, sliderActions, parentNode, labelPhraze, min, max) {
    super(sliderClassName, sliderId, sliderLabel, defaultValue, controlStep, sliderActions, parentNode, min, max);
    this.labelPhraze = labelPhraze;     
  }

  render = () => {
    const nodeInDom = document.getElementById(this.sliderId);
    const node = (nodeInDom!==null) ? nodeInDom.closest('div') : document.createElement('div');
    node.className = this.sliderClassName;
    node.innerHTML = `<span>${this.labelPhraze} <label for="${this.sliderId}" class="${this.sliderLabel}">${this.defaultValue}</label>px</span>
    <button type="button" class="sliderControls prev"><i class="fas fa-chevron-left"></i>
    </button>
    <input type="range" min="${this.min}" max="${this.max}" value="${this.defaultValue}" id="${this.sliderId}"/>
    <button type="button" class="sliderControls next"><i class="fas fa-chevron-right"></i>
    </button>`

    if (nodeInDom===null) {
      this.parentNode.appendChild(node);
      }
      this.addEvents(node);
  }
  setValue = (min, max, value) => {
    this.defaultValue = value;
    this.nowValue = value;
    this.min = min;
    this.max = max;
    this.render();

  }
}