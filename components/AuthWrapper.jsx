import Image from 'next/image'

export default function AuthWrapper({ title, children }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-logo">
        <Image src="/logo.webp" alt="logo" width={320} height={200} />
      </div>
      {children}
    </div>
  )
}
