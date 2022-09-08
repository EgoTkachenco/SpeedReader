export default function AuthWrapper({ title, children }) {
  return (
    <div className="auth-wrapper">
      <img className="auth-logo" src="/logo.svg" alt="logo" />
      {children}
    </div>
  )
}
