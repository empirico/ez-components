const R = globalThis, L = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, B = /* @__PURE__ */ Symbol(), J = /* @__PURE__ */ new WeakMap();
let rt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== B) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (L && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = J.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && J.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ot = (r) => new rt(typeof r == "string" ? r : r + "", void 0, B), dt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new rt(e, r, B);
}, pt = (r, t) => {
  if (L) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = R.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, G = L ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ot(e);
})(r) : r;
const { is: ct, defineProperty: ut, getOwnPropertyDescriptor: _t, getOwnPropertyNames: gt, getOwnPropertySymbols: $t, getPrototypeOf: yt } = Object, k = globalThis, K = k.trustedTypes, ft = K ? K.emptyScript : "", vt = k.reactiveElementPolyfillSupport, E = (r, t) => r, N = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? ft : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, q = (r, t) => !ct(r, t), X = { attribute: !0, type: String, converter: N, reflect: !1, useDefault: !1, hasChanged: q };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), k.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = X) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && ut(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: o } = _t(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const h = i?.call(this);
      o?.call(this, n), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? X;
  }
  static _$Ei() {
    if (this.hasOwnProperty(E("elementProperties"))) return;
    const t = yt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(E("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(E("properties"))) {
      const e = this.properties, s = [...gt(e), ...$t(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(G(i));
    } else t !== void 0 && e.push(G(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return pt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : N).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : N;
      this._$Em = i;
      const h = n.fromAttribute(e, o.type);
      this[i] = h ?? this._$Ej?.get(i) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (o = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? q)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: o }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, o] of s) {
        const { wrapped: n } = o, h = this[i];
        n !== !0 || this._$AL.has(i) || h === void 0 || this.C(i, void 0, o, h);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[E("elementProperties")] = /* @__PURE__ */ new Map(), A[E("finalized")] = /* @__PURE__ */ new Map(), vt?.({ ReactiveElement: A }), (k.reactiveElementVersions ??= []).push("2.1.2");
const F = globalThis, Y = (r) => r, H = F.trustedTypes, Z = H ? H.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, nt = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, at = "?" + f, mt = `<${at}>`, b = document, T = () => b.createComment(""), x = (r) => r === null || typeof r != "object" && typeof r != "function", W = Array.isArray, bt = (r) => W(r) || typeof r?.[Symbol.iterator] == "function", j = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Q = /-->/g, tt = />/g, v = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), et = /'/g, st = /"/g, ht = /^(?:script|style|textarea|title)$/i, At = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), O = At(1), w = /* @__PURE__ */ Symbol.for("lit-noChange"), _ = /* @__PURE__ */ Symbol.for("lit-nothing"), it = /* @__PURE__ */ new WeakMap(), m = b.createTreeWalker(b, 129);
function lt(r, t) {
  if (!W(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Z !== void 0 ? Z.createHTML(t) : t;
}
const wt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = P;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let u, g, d = -1, $ = 0;
    for (; $ < a.length && (n.lastIndex = $, g = n.exec(a), g !== null); ) $ = n.lastIndex, n === P ? g[1] === "!--" ? n = Q : g[1] !== void 0 ? n = tt : g[2] !== void 0 ? (ht.test(g[2]) && (i = RegExp("</" + g[2], "g")), n = v) : g[3] !== void 0 && (n = v) : n === v ? g[0] === ">" ? (n = i ?? P, d = -1) : g[1] === void 0 ? d = -2 : (d = n.lastIndex - g[2].length, u = g[1], n = g[3] === void 0 ? v : g[3] === '"' ? st : et) : n === st || n === et ? n = v : n === Q || n === tt ? n = P : (n = v, i = void 0);
    const y = n === v && r[h + 1].startsWith("/>") ? " " : "";
    o += n === P ? a + mt : d >= 0 ? (s.push(u), a.slice(0, d) + nt + a.slice(d) + f + y) : a + f + (d === -2 ? h : y);
  }
  return [lt(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class M {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [u, g] = wt(t, e);
    if (this.el = M.createElement(u, s), m.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = m.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(nt)) {
          const $ = g[n++], y = i.getAttribute(d).split(f), z = /([.?@])?(.*)/.exec($);
          a.push({ type: 1, index: o, name: z[2], strings: y, ctor: z[1] === "." ? Pt : z[1] === "?" ? Et : z[1] === "@" ? Ct : D }), i.removeAttribute(d);
        } else d.startsWith(f) && (a.push({ type: 6, index: o }), i.removeAttribute(d));
        if (ht.test(i.tagName)) {
          const d = i.textContent.split(f), $ = d.length - 1;
          if ($ > 0) {
            i.textContent = H ? H.emptyScript : "";
            for (let y = 0; y < $; y++) i.append(d[y], T()), m.nextNode(), a.push({ type: 2, index: ++o });
            i.append(d[$], T());
          }
        }
      } else if (i.nodeType === 8) if (i.data === at) a.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(f, d + 1)) !== -1; ) a.push({ type: 7, index: o }), d += f.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = b.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(r, t, e = r, s) {
  if (t === w) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = x(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = S(r, i._$AS(r, t.values), i, s)), t;
}
class St {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? b).importNode(e, !0);
    m.currentNode = i;
    let o = m.nextNode(), n = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let u;
        a.type === 2 ? u = new U(o, o.nextSibling, this, t) : a.type === 1 ? u = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (u = new Tt(o, this, t)), this._$AV.push(u), a = s[++h];
      }
      n !== a?.index && (o = m.nextNode(), n++);
    }
    return m.currentNode = b, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class U {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = S(this, t, e), x(t) ? t === _ || t == null || t === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : bt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== _ && x(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = M.createElement(lt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const o = new St(i, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = it.get(t.strings);
    return e === void 0 && it.set(t.strings, e = new M(t)), e;
  }
  k(t) {
    W(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new U(this.O(T()), this.O(T()), this, this.options)) : s = e[i], s._$AI(o), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Y(t).nextSibling;
      Y(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class D {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = _;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = S(this, t, e, 0), n = !x(t) || t !== this._$AH && t !== w, n && (this._$AH = t);
    else {
      const h = t;
      let a, u;
      for (t = o[0], a = 0; a < o.length - 1; a++) u = S(this, h[s + a], e, a), u === w && (u = this._$AH[a]), n ||= !x(u) || u !== this._$AH[a], u === _ ? t = _ : t !== _ && (t += (u ?? "") + o[a + 1]), this._$AH[a] = u;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Pt extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === _ ? void 0 : t;
  }
}
class Et extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== _);
  }
}
class Ct extends D {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? _) === w) return;
    const s = this._$AH, i = t === _ && s !== _ || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== _ && (s === _ || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Tt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const xt = F.litHtmlPolyfillSupport;
xt?.(M, U), (F.litHtmlVersions ??= []).push("3.3.2");
const Mt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = i = new U(t.insertBefore(T(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
const V = globalThis;
class C extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Mt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return w;
  }
}
C._$litElement$ = !0, C.finalized = !0, V.litElementHydrateSupport?.({ LitElement: C });
const Ut = V.litElementPolyfillSupport;
Ut?.({ LitElement: C });
(V.litElementVersions ??= []).push("4.2.2");
const zt = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
const Ot = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: q }, Rt = (r = Ot, t, e) => {
  const { kind: s, metadata: i } = e;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(e.name, r), s === "accessor") {
    const { name: n } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(n, a, r, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(n, void 0, r, h), h;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(h) {
      const a = this[n];
      t.call(this, h), this.requestUpdate(n, a, r, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function c(r) {
  return (t, e) => typeof e == "object" ? Rt(r, t, e) : ((s, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(r, t, e);
}
function I(r) {
  return c({ ...r, state: !0, attribute: !1 });
}
const Nt = ":host{display:block;position:relative;overflow:hidden;width:100%;height:100%}.divroot{position:relative;width:100%;height:100%;user-select:none;-webkit-user-select:none;touch-action:none;box-sizing:border-box;overflow:hidden;cursor:move}.wrapper ::slotted(img){position:absolute;width:100%;height:100%;object-fit:cover;display:block}.wrapper ::slotted(img:nth-of-type(2)){filter:invert(1);z-index:20;-webkit-mask-image:linear-gradient(var(--angle),black var(--split),transparent var(--split));mask-image:linear-gradient(var(--angle),black var(--split),transparent var(--split))}.overlay{width:100%;z-index:20;height:100%;position:relative}.divider{position:absolute;left:var(--splitX);top:var(--splitY);width:400%;height:var(--divider-size);background:var(--base-color);z-index:100;transform:translate(-50%,-50%) rotate(calc(var(--angle)));box-shadow:0 0 8px var(--shadow-color);pointer-events:none}.dividerchild{position:absolute;top:50%;left:50%;width:4%;transform:translate(-50%,-50%);height:50%;border-radius:10rem;background-color:var(--base-color);display:flex;align-items:center;justify-content:center;filter:invert(100%) saturate(10%) brightness(200%) opacity(90%)}.handle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(90deg);width:var(--handle-size);height:var(--handle-size);display:flex;align-items:center;justify-content:center;gap:var(--handle-gap)}.handlebg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:var(--handle-size);height:var(--handle-size)}.arrow{width:var(--arrow-size);height:var(--arrow-size);display:flex;align-items:center;justify-content:center;color:var(--base-color)}.arrow.one{transform:rotate(180deg)}.arrow svg{width:100%;height:100%;filter:drop-shadow(0 0 .3rem var(--shadow-color));fill:var(--base-color)}";
var Ht = Object.defineProperty, kt = Object.getOwnPropertyDescriptor, p = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? kt(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(t, e, i) : n(i)) || i);
  return s && i && Ht(t, e, i), i;
};
let l = class extends C {
  constructor() {
    super(...arguments), this.unitType = "rem", this.angle = 0, this.initialPosition = 50, this.enableClickToJump = !0, this.enableHoverFollow = !1, this.dividerSize = 0.5, this.containerStyle = "", this.borderWidth = 0, this.borderType = "solid", this.borderRadius = 1, this.handleSize = 3, this.arrowSize = 2, this.handleGap = 0, this.shadowColor = "rgba(0, 0, 0, 0.3)", this.baseColor = "rgb(255, 255, 255)", this.handleType = "custom", this.handleStyle = "", this.dividerType = "single", this.doubleDividerStyle = "", this.arrowSvg = O`
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
  `, this._isDragging = !1, this._split = 0, this._targetProgress = 0.5, this._currentProgress = 0.5, this._rafId = null, this._smoothingFactor = 0.15, this._updateLoop = () => {
      const r = this._targetProgress - this._currentProgress;
      if (Math.abs(r) < 1e-4) {
        this._currentProgress = this._targetProgress, this._update_progress_dependents(this._currentProgress - 0.5), this._rafId = null;
        return;
      }
      this._currentProgress += r * this._smoothingFactor, this._update_progress_dependents(this._currentProgress - 0.5), this._rafId = requestAnimationFrame(this._updateLoop);
    }, this._resizeObserver = null;
  }
  //If divider is double here you can override the style of the smaller divider
  updated(r) {
    [
      "unitType",
      "angle",
      "initialPosition",
      "enableClickToJump",
      "enableHoverFollow",
      "dividerSize",
      "containerStyle",
      "borderWidth",
      "borderType",
      "borderRadius",
      "handleSize",
      "arrowSize",
      "handleGap",
      "shadowColor",
      "baseColor",
      "handleType",
      "handleStyle",
      "dividerType",
      "doubleDividerStyle"
    ].some(
      (s) => r.has(s)
    ) && (this.set_style_properties(), this._update_progress_dependents(this._currentProgress - 0.5));
  }
  // Keep this call in firstUpdated only for the initial math setup
  firstUpdated() {
    window.KSIIW !== !1 && this.forceUpdate();
  }
  forceUpdate() {
    const r = this.initialPosition / 100;
    this._targetProgress = r, this._currentProgress = r, this.set_style_properties(), this._update_progress_dependents(r - 0.5);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resizeObserver?.disconnect(), this._rafId !== null && (cancelAnimationFrame(this._rafId), this._rafId = null);
  }
  set_style_properties() {
    switch (this.style.setProperty(
      "--divider-size",
      `${this.dividerSize + this.unitType}`
    ), this.style.setProperty(
      "--handle-size",
      `${this.handleSize + this.unitType}`
    ), this.style.setProperty("--arrow-size", `${this.arrowSize + this.unitType}`), this.style.setProperty("--handle-gap", `${this.handleGap + this.unitType}`), this.style.setProperty("--shadow-color", this.shadowColor), this.style.setProperty("--base-color", this.baseColor), this.style.setProperty("--angle", `${this.angle}deg`), this.handleType) {
      case "custom":
        break;
      case "blur":
        this.handleStyle = `
        border-radius: ${this.handleSize + this.unitType};
        backdrop-filter: blur(.2rem); 
        -webkit-backdrop-filter: blur(.2rem); 
        border-color: ${this.baseColor};
        border-width: .2rem;
        border-style:solid;
        `;
        break;
    }
    this.containerStyle == "" && (this.containerStyle = `
      border: ${this.borderWidth + this.unitType} ${this.borderType} ${this.baseColor};
      border-radius:${this.borderRadius + this.unitType};
      `);
  }
  getDividerStyle() {
    switch (this.dividerType) {
      case "hidden":
        return "background: none; box-shadow:none;";
      case "single":
        return "opacity:100;";
    }
  }
  getDividerChild() {
    if (this.dividerType == "double")
      return O`<div
        class="dividerchild"
        style=${this.doubleDividerStyle}
      ></div>`;
  }
  getArrows() {
    return this.handleType == "minimal" ? "" : O`<div class="arrow one">${this.arrowSvg}</div>
      <div class="arrow two">${this.arrowSvg}</div>`;
  }
  //updated at start
  _update_progress_dependents(r) {
    if (window.KSIIW === !1) return;
    const t = this.getBoundingClientRect(), e = t.width / t.height, s = (this.angle - 90) * (Math.PI / 180), i = Math.abs(Math.cos(s)) + Math.abs(Math.sin(s) / e), o = (r * Math.cos(s) * i + 0.5) * 100, n = (r * Math.sin(s) * i * e + 0.5) * 100;
    this._split = (r + 0.5) * 100, this.style.setProperty("--splitX", `${o}%`), this.style.setProperty("--split", `${this._split}%`), this.style.setProperty("--splitY", `${n}%`);
  }
  _handlePointerMove(r) {
    !this._isDragging && !this.enableHoverFollow || (this._updateTargetFromPointer(r), this._rafId === null && (this._rafId = requestAnimationFrame(this._updateLoop)));
  }
  _updateTargetFromPointer(r) {
    const t = this.getBoundingClientRect(), e = t.width / t.height, s = (this.angle - 90) * (Math.PI / 180), i = Math.abs(Math.cos(s)) + Math.abs(Math.sin(s) / e), o = (r.clientX - t.left) / t.width - 0.5, n = (r.clientY - t.top) / t.height - 0.5;
    this._targetProgress = (o * Math.cos(s) + n / e * Math.sin(s)) / i + 0.5, this._targetProgress = Math.min(1, Math.max(0, this._targetProgress)), console.log(this._targetProgress);
  }
  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                  Focused Logic                                 ||
  // ! ||--------------------------------------------------------------------------------||
  _handlePointerDown(r) {
    this.enableClickToJump && (this._updateTargetFromPointer(r), this._rafId === null && (this._rafId = requestAnimationFrame(this._updateLoop))), this._isDragging = !0, r.currentTarget.setPointerCapture(r.pointerId);
  }
  _handlePointerUp(r) {
    this._isDragging = !1, r.currentTarget.releasePointerCapture(r.pointerId);
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObserver = new ResizeObserver(() => this._handleResize()), this._resizeObserver.observe(this);
  }
  _handleResize() {
    this._update_progress_dependents(this._targetProgress - 0.5);
  }
  render() {
    return O`
      <div
        class="divroot"
        style=${this.containerStyle}
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
            <div class="handlebg" style=${this.handleStyle}></div>
            <div class="handle">${this.getArrows()}</div>
          </div>
        </div>
      </div>
    `;
  }
};
l.styles = dt`
    ${ot(Nt)}
  `;
p([
  c({ type: String })
], l.prototype, "unitType", 2);
p([
  c({ type: Number })
], l.prototype, "angle", 2);
p([
  c({ type: Number })
], l.prototype, "initialPosition", 2);
p([
  c({ type: Boolean })
], l.prototype, "enableClickToJump", 2);
p([
  c({ type: Boolean })
], l.prototype, "enableHoverFollow", 2);
p([
  c({ type: Number })
], l.prototype, "dividerSize", 2);
p([
  c({ type: String })
], l.prototype, "containerStyle", 2);
p([
  c({ type: Number })
], l.prototype, "borderWidth", 2);
p([
  c({ type: String })
], l.prototype, "borderType", 2);
p([
  c({ type: Number })
], l.prototype, "borderRadius", 2);
p([
  c({ type: Number })
], l.prototype, "handleSize", 2);
p([
  c({ type: Number })
], l.prototype, "arrowSize", 2);
p([
  c({ type: Number })
], l.prototype, "handleGap", 2);
p([
  c({ type: String })
], l.prototype, "shadowColor", 2);
p([
  c({ type: String })
], l.prototype, "baseColor", 2);
p([
  c({ type: String })
], l.prototype, "handleType", 2);
p([
  c({ type: String })
], l.prototype, "handleStyle", 2);
p([
  c({ type: String })
], l.prototype, "dividerType", 2);
p([
  c({ type: String })
], l.prototype, "doubleDividerStyle", 2);
p([
  I()
], l.prototype, "_isDragging", 2);
p([
  I()
], l.prototype, "_split", 2);
p([
  I()
], l.prototype, "_targetProgress", 2);
p([
  I()
], l.prototype, "_currentProgress", 2);
l = p([
  zt("ez-image-slider")
], l);
export {
  l as MyElement
};
