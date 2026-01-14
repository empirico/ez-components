import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import externalStyles from "./index.css?inline";

@customElement("ez-image-slider")
export class MyElement extends LitElement {
  static styles = css`
    ${unsafeCSS(externalStyles)}
  `;
  @property({ type: String }) unit_type = "rem"; //The main unit to use in the component, we dont recomment you change it.
  @property({ type: Number }) angle = 0; //From 0 to 360, Controls the angle at which the images are clipped, 0 is vertical, 90 horizontal, 180  vertical inverse, etc
  @property({ type: Number }) initial_position = 50; //From 0 to 100%, Controls the initial state of divider progress, 50% shows half of image 1 and half of image 2
  @property({ type: Boolean }) click_to_jump = true; // When the user clicks on a place the divider goes ther
  @property({ type: Boolean }) follow_hover = false; // When the user hovers mouse the divider follows
  @property({ type: Number }) divider_size = 0.5; // The size of the divider, measured in rems
  @property({ type: String }) container_style = ""; //Custom style string to apply border, glow, margin to the main container
  @property({ type: Number }) border_width = 0; //Sets the border width around the main container, in rem
  @property({ type: String }) border_type = "solid"; //Sets the border type around the main container, solid, dashed, etc (fill)
  @property({ type: Number }) border_radius = 1; //The border radius of the main container, in rem
  @property({ type: Number }) handle_size = 3; //The widht and height of the handle at the middle of the divider, in rem
  @property({ type: Number }) arrow_size = 2; //The width and height of each arror in the handle, if the handle_size is smaller it will be ignored, in rem
  @property({ type: Number }) handle_gap = 0; //The gap between the arrows, if the handle_size is smaller it will get ignored
  @property({ type: String }) shadow_color = "rgba(0, 0, 0, 0.3)"; //The shadow that is subtly applied to the divider and handle arrows. we dont suggest any changes
  @property({ type: String }) base_color = "rgb(255, 255, 255)"; //The color of the border, divider and arrows. This can be set to a darker color for dark themes
  @property({ type: String }) handle_type: "custom" | "blur" | "minimal" =
    "custom"; //If set to custom the style provided in handle_style will be applied, blur will give a rounded glass like handle, minimal will hide the arrows.
  @property({ type: String }) handle_style = ""; //The style that will be applied to the handle
  @property({ type: String }) divider_type: "hidden" | "single" | "double" =
    "single"; //The divider can either be hidden (just arrows showing), single, or double (a smaller divider is inside the main divider, like android handle)
  @property({ type: String }) double_divider_style = ""; //If divider is double here you can override the style of the smaller divider

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    // 1. Check if any of our visual properties changed
    const styleProps = [
      "unit_type",
      "angle",
      "initial_position",
      "click_to_jump",
      "follow_hover",
      "divider_size",
      "container_style",
      "border_width",
      "border_type",
      "border_radius",
      "handle_size",
      "arrow_size",
      "handle_gap",
      "shadow_color",
      "base_color",
      "handle_type",
      "handle_style",
      "divider_type",
      "double_divider_style",
    ];

    const shouldUpdateStyles = styleProps.some((prop) =>
      changedProperties.has(prop)
    );

    if (shouldUpdateStyles) {
      // FIX: If initial_position changed, we MUST sync the internal progress trackers
      // otherwise the math loop calculates based on the old 50% value.
      if (changedProperties.has("initial_position")) {
        const initial = this.initial_position / 100;
        this._targetProgress = initial;
        this._currentProgress = initial;
      }

      this.set_style_properties();

      // Force an immediate math update for the editor canvas
      this._update_progress_dependents(this._currentProgress - 0.5);
    }
  }

  // Keep this call in firstUpdated only for the initial math setup
  firstUpdated() {
    if ((window as any).KSIIW === false) return;
    this.forceUpdate();
  }

  private forceUpdate() {
    const initial = this.initial_position / 100;
    this._targetProgress = initial;
    this._currentProgress = initial;
    this.set_style_properties(); // Initial styles
    this._update_progress_dependents(initial - 0.5);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                  Styling Logic                                 ||
  // ! ||--------------------------------------------------------------------------------||
  private arrowSvg = html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#F7f7f7"
    >
      <path
        d="M472-480 332-620q-18-18-18-44t18-44q18-18 44-18t44 18l183 183q9 9 14 21t5 24q0 12-5 24t-14 21L420-252q-18 18-44 18t-44-18q-18-18-18-44t18-44l140-140Z"
      />
    </svg>
  `;
  public set_style_properties() {
    this.style.setProperty(
      "--divider-size",
      `${this.divider_size + this.unit_type}`
    );
    this.style.setProperty(
      "--handle-size",
      `${this.handle_size + this.unit_type}`
    );
    this.style.setProperty(
      "--arrow-size",
      `${this.arrow_size + this.unit_type}`
    );
    this.style.setProperty(
      "--handle-gap",
      `${this.handle_gap + this.unit_type}`
    );
    this.style.setProperty("--shadow-color", this.shadow_color);
    this.style.setProperty("--base-color", this.base_color);
    this.style.setProperty("--angle", `${this.angle}deg`);

    switch (this.handle_type) {
      case "custom":
        break;
      case "blur":
        this.handle_style = `
        border-radius: ${this.handle_size + this.unit_type};
        backdrop-filter: blur(.2rem); 
        -webkit-backdrop-filter: blur(.2rem); 
        border-color: ${this.base_color};
        border-width: .2rem;
        border-style:solid;
        `;
        break;
      case "minimal":
        this.handle_style = ``;
        break;
    }
    if (this.container_style != "") {
      if (this.border_type == "none") {
        this.container_style = "";
      } else {
        this.container_style = `
      border: ${this.border_width + this.unit_type} ${this.border_type} ${
          this.base_color
        };
      border-radius:${this.border_radius + this.unit_type};
      `;
      }
    }

    this.requestUpdate();
  }

  private getDividerStyle() {
    switch (this.divider_type) {
      case "hidden":
        return `background: none; box-shadow:none;`;
      case "single":
        return `opacity:100;`;
      case "double":
        break;
    }
  }

  private getDividerChild() {
    if (this.divider_type == "double") {
      return html`<div
        class="dividerchild"
        style=${this.double_divider_style}
      ></div>`;
    }
  }

  private getArrows() {
    if (this.handle_type == "minimal") {
      return ``;
    }
    return html`<div class="arrow one">${this.arrowSvg}</div>
      <div class="arrow two">${this.arrowSvg}</div>`;
  }
  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                   Drag Logic                                   ||
  // ! ||--------------------------------------------------------------------------------||

  @state() private _isDragging = false;
  @state() private _split = 0; //updated at start

  private _update_progress_dependents(progress: number) {
    if ((window as any).KSIIW === false) return;
    const rect = this.getBoundingClientRect();
    const aspect = rect.width / rect.height;
    const angleRad = (this.angle - 90) * (Math.PI / 180);
    const scale =
      Math.abs(Math.cos(angleRad)) + Math.abs(Math.sin(angleRad) / aspect);
    const splitX = (progress * Math.cos(angleRad) * scale + 0.5) * 100;
    const splitY = (progress * Math.sin(angleRad) * scale * aspect + 0.5) * 100;
    this._split = (progress + 0.5) * 100;
    this.style.setProperty("--splitX", `${splitX}%`);
    this.style.setProperty("--split", `${this._split}%`);
    this.style.setProperty("--splitY", `${splitY}%`);
  }

  private _handlePointerMove(e: PointerEvent) {
    if (!this._isDragging && this.follow_hover !== true) return;
    this._updateTargetFromPointer(e);
    if (this._rafId === null) {
      this._rafId = requestAnimationFrame(this._updateLoop);
    }
  }

  private _updateTargetFromPointer(e: PointerEvent) {
    const rect = this.getBoundingClientRect();
    const aspect = rect.width / rect.height;
    const angleRad = (this.angle - 90) * (Math.PI / 180);
    const scale =
      Math.abs(Math.cos(angleRad)) + Math.abs(Math.sin(angleRad) / aspect);

    const xRel = (e.clientX - rect.left) / rect.width - 0.5;
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;

    this._targetProgress =
      (xRel * Math.cos(angleRad) + (yRel / aspect) * Math.sin(angleRad)) /
        scale +
      0.5;
    this._targetProgress = Math.min(1, Math.max(0, this._targetProgress));
    console.log(this._targetProgress);
  }
  // ! ||--------------------------------------------------------------------------------||
  // ! ||                               Smoothing movement                               ||
  // ! ||--------------------------------------------------------------------------------||

  @state() private _targetProgress = 0.5;
  @state() private _currentProgress = 0.5;
  private _rafId: number | null = null;
  private _smoothingFactor = 0.15;

  private _updateLoop = () => {
    const diff = this._targetProgress - this._currentProgress;
    if (Math.abs(diff) < 0.0001) {
      this._currentProgress = this._targetProgress;
      this._update_progress_dependents(this._currentProgress - 0.5);
      this._rafId = null;
      return;
    }
    this._currentProgress += diff * this._smoothingFactor;
    this._update_progress_dependents(this._currentProgress - 0.5);
    this._rafId = requestAnimationFrame(this._updateLoop);
  };

  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                  Focused Logic                                 ||
  // ! ||--------------------------------------------------------------------------------||

  private _handlePointerDown(e: PointerEvent) {
    if (this.click_to_jump) {
      this._updateTargetFromPointer(e);
      if (this._rafId === null) {
        this._rafId = requestAnimationFrame(this._updateLoop);
      }
    }
    this._isDragging = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  private _handlePointerUp(e: PointerEvent) {
    this._isDragging = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  }

  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                  Resize Logic                                  ||
  // ! ||--------------------------------------------------------------------------------||

  private _resizeObserver: ResizeObserver | null = null;
  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver(() => this._handleResize());
    this._resizeObserver.observe(this);
  }

  private _handleResize() {
    this._update_progress_dependents(this._targetProgress - 0.5);
  }

  render() {
    return html`
      <div
        class="divroot"
        style=${this.container_style}
        @pointerdown=${this._handlePointerDown}
        @pointerup=${this._handlePointerUp}
        @pointermove=${this._handlePointerMove}
      >
        <div class="wrapper">
          <slot name="image_2"></slot>
          <slot name="image_1"></slot>
        </div>
        <div class="overlay">
          <div class="divider" style=${this.getDividerStyle()}>
            ${this.getDividerChild()}
            <div class="handlebg" style=${this.handle_style}></div>
            <div class="handle">${this.getArrows()}</div>
          </div>
        </div>
      </div>
    `;
  }
}
