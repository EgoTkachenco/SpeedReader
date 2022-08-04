export default function ReaderConfigurator({ config, onChange }) {
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
          min="25"
          max="300"
          onMouseUp={(e) => onChange('speed', e.target.value)}
          defaultValue={config.speed}
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
          onBlur={(e) => onChange('highlightColor', e.target.value)}
          defaultValue={config.highlightColor}
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
          onBlur={(e) => onChange('textColor', e.target.value)}
          defaultValue={config.textColor}
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
          onBlur={(e) => onChange('pageColor', e.target.value)}
          defaultValue={config.pageColor}
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
          value={config.rotate}
          className={`btn btn-icon ${config.rotate ? 'active' : ''}`}
        >
          <img width="35" height="35" src="/degree.png" alt="rotate" />
        </button>
      </div>

      <div className="form-row">
        <label htmlFor="zoom" className="form-label">
          Zoom
        </label>
        <button
          id="zoom"
          name="zoom"
          onClick={(e) => onChange('zoom', e.target.value)}
          value={config.zoom}
          className={`btn btn-icon ${config.zoom ? 'active' : ''}`}
        >
          <img width="32" height="33" src="/zoom.png" alt="zoom" />
        </button>
      </div>

      {/* <label className="form-label">Highlight Type</label>

      <div className="form-row ms-5">
        <label htmlFor="highlightTypeS" className="form-label fw-bold">
          S
        </label>
        <select
          name="highlightTypeS"
          id="highlightTypeS"
          value={config.highlightTypeS}
          onChange={(e) => onChange('highlightTypeS', e.target.value)}
        >
          <option value="4">1</option>
          <option value="5">2</option>
          <option value="6">4</option>
          <option value="8">6</option>
        </select>
      </div>

      <div className="form-row ms-5">
        <label htmlFor="highlightTypeV" className="form-label fw-bold">
          V
        </label>
        <select
          name="highlightTypeV"
          id="highlightTypeV"
          value={config.highlightTypeV}
          onChange={(e) => onChange('highlightTypeV', e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">4</option>
          <option value="7">6</option>
        </select>
			</div> */}

      <div className="form-row">
        <label htmlFor="highlightTypeV" className="form-label">
          Choose Book
        </label>
        <select
          name="book"
          id="book"
          value={config.book}
          onChange={(e) => onChange('book', e.target.value)}
        >
          <option value="1">Crime and Punishment</option>
          <option value="2">Frankestein </option>
          <option value="3">Around the world in eighty days</option>
          <option value="4">Don Quixote</option>
        </select>
      </div>
    </>
  )
}
