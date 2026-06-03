export const errorHandler = (err, req, res, _next) => {
  console.error('Error:', err.message)

  if (err.name === 'ZodError') {
    return res.status(400).json({
      status: 'error',
      error: 'VALIDATION_ERROR',
      message: 'Validasi input gagal',
      details: err.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message
      }))
    })
  }

  res.status(500).json({
    status: 'error',
    error: 'INTERNAL_SERVER_ERROR',
    message: err.message
  })
}
