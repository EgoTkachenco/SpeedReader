export default function SettingsForm({ settings, onChange }) {
  let colorChangeEvent = {
    onInput: (e) => onChange(e.target.name, e.target.value),
  }
  const isFirefox = navigator.userAgent.search('Firefox') !== -1
  if (!isFirefox) {
    colorChangeEvent.onBlur = colorChangeEvent.onInput
    delete colorChangeEvent.onInput
  }

  return (
    <>
      <div className="form-column">
        <label htmlFor="speed" className="form-label">
          Speed
        </label>
        <input
          id="speed"
          name="speed"
          type="range"
          min="10"
          max="500"
          onMouseUp={(e) => onChange('speed', e.target.value)}
          defaultValue={settings.speed}
        />
      </div>

      <div className="form-row">
        <label htmlFor="highlightColor" className="form-label">
          Highlight Color
        </label>
        <input
          id="highlightColor"
          name="highlightColor"
          type="color"
          {...colorChangeEvent}
          defaultValue={settings.highlightColor}
        />
      </div>
      <div className="form-row">
        <label htmlFor="textColor" className="form-label">
          Text Color
        </label>
        <input
          id="textColor"
          name="textColor"
          type="color"
          {...colorChangeEvent}
          defaultValue={settings.textColor}
        />
      </div>
      <div className="form-row">
        <label htmlFor="pageColor" className="form-label">
          Page Color
        </label>
        <input
          id="pageColor"
          name="pageColor"
          type="color"
          {...colorChangeEvent}
          defaultValue={settings.pageColor}
        />
      </div>

      <div className="form-row">
        <label htmlFor="rotate" className="form-label">
          Rotate(180deg)
        </label>
        <button
          id="rotate"
          name="rotate"
          onClick={(e) => onChange('rotate', e.target.value)}
          value={settings.rotate}
          className={`btn btn-icon ${settings.rotate ? 'active' : ''}`}
        >
          <img width="35" height="35" src="/degree.png" alt="rotate" />
        </button>
      </div>

      {/* <div className="form-row">
        <label htmlFor="zoom" className="form-label">
          Zoom
        </label>
        <button
          id="zoom"
          name="zoom"
          onClick={(e) => onChange('zoom', e.target.value)}
          value={settings.zoom}
          className={`btn btn-icon ${settings.zoom ? 'active' : ''}`}
        >
          <img width="32" height="33" src="/zoom.png" alt="zoom" />
        </button>
      </div> */}
      <div>Highlight Type</div>
      <div className="form-row">
        <label htmlFor="highlightTypeS" className="form-label">
          S
        </label>
        <select
          name="highlightTypeS"
          id="highlightTypeS"
          value={settings.highlightTypeS}
          onChange={(e) => onChange('highlightTypeS', e.target.value)}
        >
          <option value="">default</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="highlightTypeV" className="form-label">
          V
        </label>
        <select
          name="highlightTypeV"
          id="highlightTypeV"
          value={settings.highlightTypeV}
          onChange={(e) => onChange('highlightTypeV', e.target.value)}
        >
          <option value="">default</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="smooth">smooth</option>
        </select>
      </div>

      <div className="form-column">
        <label htmlFor="book" className="form-label">
          Choose Book:
        </label>
        <select
          name="book"
          id="book"
          value={settings.book ? settings.book.id : ''}
          onChange={(e) => onChange('book', e.target.value)}
        >
          <option value="">Choose Book</option>
          {settings.books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-column">
        <label htmlFor="count" className="form-label">
          No. of books:
        </label>
        <select
          name="count"
          id="count"
          value={settings.count}
          onChange={(e) => onChange('count', e.target.value)}
        >
          <option value="1">1</option>
          <option value="1">2</option>
          <option value="1">4</option>
        </select>
      </div>
      <div className="form-column">
        <label htmlFor="type" className="form-label">
          Choose reader type:
        </label>
        <select
          name="type"
          id="type"
          value={settings.type}
          onChange={(e) => onChange('type', e.target.value)}
        >
          <option value="book">Book</option>
          <option value="scroll">Scroll</option>
          <option value="rolling">Rolling</option>
          <option value="zoom">Zoom</option>
        </select>
      </div>
    </>
  )
}
