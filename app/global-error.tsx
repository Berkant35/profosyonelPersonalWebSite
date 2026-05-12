'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="tr">
      <body
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f3e3d0',
          color: '#213448',
          margin: 0,
          padding: '2rem',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#547792',
              fontWeight: 600,
            }}
          >
            500
          </div>
          <h1 style={{ marginTop: 16, fontSize: '2.25rem', fontWeight: 700 }}>
            Bir sorun oluştu
          </h1>
          <p style={{ marginTop: 16, color: 'rgba(33,52,72,0.75)' }}>
            Lütfen sayfayı yenileyin veya birkaç dakika sonra tekrar deneyin.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 32,
              padding: '0.875rem 1.75rem',
              borderRadius: 9999,
              background: '#213448',
              color: '#f3e3d0',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Tekrar dene
          </button>
        </div>
      </body>
    </html>
  )
}
