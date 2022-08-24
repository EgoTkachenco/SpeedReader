export default function AuthWrapper({ title, children }) {
  return (
    <div className="auth-wrapper">
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card">
          <h3 className="card-title p-4 bg-light">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  )
}
